Template.leaderboard.helpers({

    //show selected player from list
    'showSelectedPlayer': function () {
        var selectedPlayer = Session.get('selectedPlayer');
        return PlayersList.findOne(selectedPlayer);
    },
    'player': function () {
        var currentUserId = Meteor.userId();
        //get list of players from database
        return PlayersList.find({}, {
            sort: {score: -1, name: 1}
        });
    },
    'selectedClass': function () {
        var playerId = this._id;
        var selectedPlayer = Session.get('selectedPlayer');
        if (playerId === selectedPlayer) {
            //change class of li element to selected
            return 'selected';
        }
    }
});

Template.leaderboard.events({
    'click .remove': function () {
        //get _id from selected player
        var selectedPlayer = Session.get('selectedPlayer');
        Meteor.call('removePlayerData', selectedPlayer);
    },
    'click .player': function () {
        var playerId = this._id;
        //create temporary SESSION of selected state
        Session.set('selectedPlayer', playerId);
    },
    'click .increment': function () {
        var selectedPlayer = Session.get('selectedPlayer');
        //find document of selected player by _id, update score
        Meteor.call('modifyPlayerScore', selectedPlayer, 5);
    },

    'click .decrement': function () {
        var selectedPlayer = Session.get('selectedPlayer');
        Meteor.call('modifyPlayerScore', selectedPlayer, -5);
    }
});

Template.addPlayerForm.events({
    'submit form': function (event) {
        //stop browser default form behaviour
        event.preventDefault();
        //get value of form input(playerName) in a variable
        var playerNameVar = event.target.playerName.value;
        Meteor.call('insertPlayerData', playerNameVar);
    }
});
Meteor.subscribe('thePlayers');
