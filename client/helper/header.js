Template.header.helpers({
    settingsFileName: function() {
        return {
            rules: [
                {
                    collection: Movies,
                    field: 'themoviedb.title',
                    matchAll: true,
                    template: Template.fileNameAutoComplete,
                    selector: function (match){
                        regex = new RegExp(match, 'i');
                        return {$or: [{'filename': regex}, {'themoviedb.title': regex}]};
                    }
                }
            ]
        };
    },
    uniqueGenre: function () {
        var list = Movies.find({}).fetch();
        var uniqueGenres = _.chain(list)
            .pluck('themoviedb')
                .flatten()
            .pluck('genres')
                .flatten()
            .pluck('name')
                .flatten()
            .unique()
                .value();
        return uniqueGenres;
    },
    isLoading: function () {
        var themoviedb = ServerSession.get('loading.themoviebd') || 0;
        return (themoviebd > 0);
    }
});

Template.header.events({
    'keyup #querytitle': function () {
        // save the current search query in a session variable as the user types
        return Session.set('querytitle', $('#querytitle').val());
    },
    'keyup #querycrew': function () {
        // save the current search query in a session variable as the user types
        return Session.set('querycrew', $('#querycrew').val());
    },
    'keyup #querycast': function () {
        return Session.set('querycast', $('#querycast').val())
    },
    'click #queryclear': function () {
        resetVarForm();
        $("#queryGenre").select2('val', 'All');
        document.getElementById("form").reset();
    }
});

var resetVarForm = function (){
    Session.set('querytitle', '');
    Session.set('querycrew', '');
    Session.set('querycast', '');
    Session.set('queryGenre','');
};


/**
 * TODO: refactor this crap !
 */
Template.header.rendered = function () {
    $("#queryGenre").select2({
        tags: true,
        tokenSeparators: [',', ' ']
    }).on('change', function(){
        Session.set('queryGenre',$("#queryGenre").val());
    });
};