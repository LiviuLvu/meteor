Template.teams.helpers({
    //each key in the object is what we can call in the template
    isCreatingTeam: function() {
        //Session is a global object (accessible only on the client) that allows you to store key-value pairs using Session.set() and Session.get().
        return Session.get('isCreatingTeam');
    },
    teams: function() {
        //return every single team stored in Minimongo
        return Teams.find();
    }
});
Template.teams.events({
    //handler function receives two arguments: event, an object with information about the event, and template, a template instance for the template where the handler is defined
    'click a.create': function(e, tpl) {
        e.preventDefault();
        Session.set('isCreatingTeam', true);
    },
    'click a.cancel': function(e, tpl) {
        e.preventDefault();
        Session.set('isCreatingTeam', false);
    },
    'submit form.create-team': function(e, tpl) {
        e.preventDefault();
        var team = {
            name: tpl.$('input[name=name]').val(),
            ownerId: Meteor.userId()
        };
        //pass a callback to Teams.insert(), which can kind of rewind our app if there is an error
        Teams.insert(team, function(error, _id) {
            if (error) {
                alert(error);
                Session.set('isCreatingTeam', true);
                Tracker.afterFlush(function() {
                    tpl.$('input[name=name]').val(teamName);
                });
            }
        });

        Session.set('isCreatingTeam', false);
    }
});
