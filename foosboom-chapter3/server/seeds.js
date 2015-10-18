//default fill after meteor reset
//we can add some seed data so our app is not empty when we reset it
Meteor.startup(function() {
var dummyUserEmail = 'test@test.com';

  if (Meteor.users.find({"emails.address": dummyUserEmail}).count() === 0){

    // Create a test user. `createUser` returns the id of the created user
    var ownerId = Accounts.createUser({
      email: dummyUserEmail,
      password: 'matthew'
    });

        //create some teams
        [{
            name: "Barcelona",
            //store array of game id on each team
            gameIds: [],
            ownerId: ownerId
        }, {
            name: "Real Madrid",
            gameIds: [],
            ownerId: ownerId
        }, {
            name: "Matt's team",
            gameIds: [],
            ownerId: ownerId
        }].forEach(function(team) {
            Teams.insert(team);
        });
        //create a game
        var team1 = Teams.find().fetch()[0];
        var team2 = Teams.find().fetch()[1];

        var game = {
            completed: false,
            createdAt: new Date(),
            ownerId: ownerId,
            teams: [{
                name: team1.name,
                _id: team1._id,
                score: 0
            }, {
                name: team2.name,
                _id: team2._id,
                score: 0
            }]
        };

        gameId = Games.insert(game);

        //add this game to both teams gameIds
        Teams.update({_id: team1._id}, {$addToSet: {gameIds: gameId}});
		//The $addToSet operator adds a value to an array only if the value is not already in the array
        Teams.update({_id: team2._id}, {$addToSet: {gameIds: gameId}});

    }
});
