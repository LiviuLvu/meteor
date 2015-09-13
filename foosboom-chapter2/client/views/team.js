Template.team.helpers({
	isEditingTeam: function () {
		return Session.get('editedTeamId') === this._id;
	}
});
Template.team.events({
	'click a.edit': function (event1, template1) {
		event1.preventDefault();
		Session.set('editedTeamId', this._id);
	},
	'submit form.form-edit': function (event1, template1) {
		event1.preventDefault();
		var teamName = template1.$('input[name=name]').val();
		if(teamName.length){
			Teams.update(this._id, {$set: {name:teamName}});
			Session.set('editedTeamId', null);
		}
	},
	'click a.cancel': function (event1, template1) {
		event1.preventDefault();
		Session.set('editedTeamId', null);
	},
	'click a.remove': function (event1, template1) {
		event1.preventDefault();
		Teams.remove(this._id);
		alert(this.name + ' removed');
	}
});