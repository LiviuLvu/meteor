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
            //get list of players from database
            return PlayersList.find({}, {
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

}
if (Meteor.isServer) {

}
