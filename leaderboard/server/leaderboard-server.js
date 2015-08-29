//make data accesible to the client
Meteor.publish('thePlayers', function () {
    var currentUserId = this.userId;
    return PlayersList.find({ createdBy: currentUserId });
});
Meteor.methods({
    'insertPlayerData': function (playerNameVar) {
        //function userId() returns unique id of currently logged user
        var currentUserId = Meteor.userId();
        //insert the value from the form (playerNameVar) in the collection PlayersList
        PlayersList.insert({
            name: playerNameVar,
            score: 0,
            createdBy: currentUserId
        });
    },

    'removePlayerData': function (selectedPlayer) {
        //function userId() returns unique id of currently logged user
        var currentUserId = Meteor.userId();
        PlayersList.remove({ _id: selectedPlayer, createdBy: currentUserId });
    },

    'modifyPlayerScore': function (selectedPlayer, scoreValue) {
        //function userId() returns unique id of currently logged user
        var currentUserId = Meteor.userId();
        //make sure player belongs to currently logged-in user
        PlayersList.update( { _id: selectedPlayer, createdBy: currentUserId },
                            { $inc: { score: scoreValue } });
    }
});