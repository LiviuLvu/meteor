//default fill after meteor reset
//we can add some seed data so our app is not empty when we reset it
Meteor.startup(function () {
  if (Teams.find().count() === 0) {
    [
      {name: "Barcelona"},
      {name: "Real Madrid"},
      {name: "Matt's team"}
    ].forEach(function(team){
      Teams.insert(team);
    });
  }
});