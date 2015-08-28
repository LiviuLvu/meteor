//instantiate a table(or collection) of players
PlayersList = new Mongo.Collection('players');

if (Meteor.isClient) {
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
}

if (Meteor.isServer) {
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
}