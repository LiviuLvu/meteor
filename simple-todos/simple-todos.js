Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
    Meteor.publish('tasks', function () {
        //make data available to client
        return Tasks.find({
            $or: [
                {private: {$ne: true}},
                {owner: this.userId}
            ]
        });
    });
}

if (Meteor.isClient) {
    Meteor.subscribe('tasks');

	Template.body.helpers({
		tasks: function () {
		if (Session.get("hideCompleted")) {
			//if hideCompleted input is checked, filter tasks
			return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
		} else {
			//otherwise return all tasks
			return Tasks.find({}, {sort: {createdAt: -1}});
		}
		},
		hideCompleted: function () {
			return Session.get('hideCompleted');
		},
        incompleteCount: function () {
            // return unchecked tasks
            return Tasks.find({checked: {$ne: true}}).count();
        }
	});
	Template.body.events({
			'submit .new-task': function () {
				//prevent default browser behaviour
				event.preventDefault();
				//get value from form element
				var text = event.target.text.value;
                //insert a task in collection
                Meteor.call('addTask',text);
				//clear form
				event.target.text.value = "";
			},
			'change .hide-completed input': function (event) {
				Session.set("hideCompleted", event.target.checked);
			}
		});

    Template.task.helpers({
        //define helper to check ownership
        isOwner: function () {
            //check if owner is the same as user id of the item/document in list
            return this.owner === Meteor.userId();
        }
    });

	Template.task.events({
		'click .toggle-checked': function () {
			// Set the checked input to the oposite of its current value
            Meteor.call('setChecked', this._id, ! this.checked);
		},
		'click .delete': function () {
			//remove selected document/item from collection
			Meteor.call('deleteTask', this._id);
		},
        'click .toggle-private': function () {
            //call setPrivate method
            Meteor.call('setPrivate', this._id, ! this.private);
        }
	});

    Accounts.ui.config({
        passwordSignupFields: 'USERNAME_ONLY'
    });
}

Meteor.methods({
    addTask: function (text) {
        //make sure the user is logged in before inserting a task
        if(! Meteor.userId()) {
            throw new Meteor.error("not-authorized");
        }

        //insert a task into the collection
        Tasks.insert({
            text: text,
            //current time
            createdAt: new Date(),
            //_id of logged in user
            owner: Meteor.userId(),
            //username of logged in user
            username: Meteor.user().username
            //allow user to make tasks private
        });
    },

    deleteTask: function (taskId) {
        var task = Tasks.findOne(taskId);
        //if task is private make sure only owner can delete it
        if (task.private && task.owner !== Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.remove(taskId);
    },

    setChecked: function (taskId, setChecked) {
        var task = Tasks.findOne(taskId);
        //if task is private make sure only owner can check it
        if (task.private && task.owner !== Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.update(taskId, {$set: {checked: setChecked}});
    },

    //define method to set tasks private
    setPrivate: function (taskId, setToPrivate) {
        var task = Tasks.findOne(taskId);
        //make sure only task owner can make task private
        if (task.owner !== Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        Tasks.update(taskId, {$set: {private: setToPrivate}});
    }

});
