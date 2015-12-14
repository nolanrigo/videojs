Template.home.helpers({
  movies: function(){
    var title =  Session.get("querytitle");
    var crew = Session.get("querycrew");
    var cast = Session.get("querycast");

    query = {};
    if(title != undefined && title.length > 0){
      query['themoviedb.title'] = { $regex: title, $options: 'gi' };
    }
    if(crew != undefined && crew.length > 0){
      query['themoviedb.credits.crew.name'] = { $regex: crew, $options: 'gi' };
    }
    if(cast != undefined && cast.length > 0){
      query['themoviedb.credits.cast.name'] = { $regex: cast, $options: 'gi' };
    }

    movies = Movies.find(query,{sort: {themoviedb:{title:-1}}});
    return movies;
  },
  openSources: function() {
    var hasSources = Sources.find({}).count() <= 0;
    var toggleSources = Session.get('toggleSources');
  }
});