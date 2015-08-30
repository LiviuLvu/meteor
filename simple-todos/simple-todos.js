Tasks = new Mongo.Collection('tasks');
if (Meteor.isClient) {
  Template.body.helpers({
    tasks: function () {
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });
  Template.body.events({
      'submit .new-task': function () {
        //prevent default browser behaviour
        event.preventDefault();
        //get value from form element
        var text = event.target.text.value;
        //insert a task into the collection
        Tasks.insert({
          text: text,
          createdAt: new Date()
        });
        //clear form
        event.target.text.value = "";
      },
    });
  Template.task.events({
    'click .toggle-checked': function () {
      Tasks.update(this._id, {
        // Set the checked input to the oposite of its current value
        $set: {checked: ! this.checked}
      });

    },
    'click .delete': function () {
      //remove selected document/item from collection
      Tasks.remove(this._id);
    }
  });
}

if (Meteor.isServer) {

}
