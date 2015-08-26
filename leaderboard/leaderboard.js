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
            return PlayersList.find({createdBy: currentUserId}, {
                sort: {
                    score: -1,
                    name: 1
                }
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
            PlayersList.remove(selectedPlayer);
        },
        'click .player': function () {
            var playerId = this._id;
            //create temporary SESSION of selected state
            Session.set('selectedPlayer', playerId);
        },
        'click .increment': function () {
            var selectedPlayer = Session.get('selectedPlayer');
            //find document of selected player by _id, update score
            PlayersList.update(selectedPlayer, {
                $inc: {
                    score: 5
                }
            });
        },
        'click .decrement': function () {
            var selectedPlayer = Session.get('selectedPlayer');
            //find document of selected player by _id, update score
            PlayersList.update(selectedPlayer, {
                $inc: {
                    score: -5
                }
            });
        }
    });
    Template.addPlayerForm.events({
        'submit form': function () {
            event.preventDefault();
            //function userId() returns unique id of currently logged user
            var currentUserId = Meteor.userId();
            //get value of input field(playerName) in a variable
            var playerNameVar = event.target.playerName.value;
            console.log(playerNameVar);
            //insert the value from the form (playerNameVar) in the collection PlayersList
            PlayersList.insert({
                name: playerNameVar,
                score: 0,
                createdBy: currentUserId
            });
        }
    });

}
if (Meteor.isServer) {

}