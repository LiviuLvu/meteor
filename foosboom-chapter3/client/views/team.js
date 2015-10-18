Template.team.helpers({
    isEditingTeam: function() {
        return Session.get('editedTeamId') === this._id;
    }
});
Template.team.events({
    'click a.edit': function(e, tpl) {
        e.preventDefault();
        Session.set('editedTeamId', this._id);
    },
    'submit form.form-edit': function(e, tpl) {
        e.preventDefault();

        var teamName = tpl.$('input[name=name]').val();
        var self = this;
/*team ‘edit’ event handler to update the team name in all its games, but only after the team name has successfully been updated (doing it in the Teams.update() callback).*/

        if (teamName.length) {
            Teams.update(this._id, {
                $set: {
                    name: teamName
                }}, function (error) {
                    if(!error) {
                        //update games this team is part of
                        var games = Games.find({_id: {$in: self.gameIds}});
                        if(games.count()) {
                            _(games.fetch()).each(function (game) {
                                var team = _(game.teams).findWhere ({_id: self._id});
                                if(team !== null) {
                                    team.name = teamName;
                                    Games.update({_id: game._id}, {$set:{teams: game.teams}});
                                }
                            });
                        }
                    }
                });

            Session.set('editedTeamId', null);
        }
    },
    'click a.cancel': function(e, tpl) {
        e.preventDefault();
        Session.set('editedTeamId', null);
    },
    'click a.remove': function(e, tpl) {
        e.preventDefault();
        Teams.remove(this._id);
        alert(this.name + ' removed');
    }
});
