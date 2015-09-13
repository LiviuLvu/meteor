//(.publish) data ("teams" collection) from the server to access it on the client (.subscribe)
Meteor.publish('teams', function () {
	return Teams.find();
});