var db = require("./models");

// var albumsList =[
//   // put data here!
// ];
// albumsList.push({
//               artistName: 'the Old Kanye',
//               name: 'The College Dropout',
//               releaseDate: '2004, February 10',
//               genres: [ 'rap', 'hip hop' ]
//             });
// albumsList.push({
//               artistName: 'the New Kanye',
//               name: 'The Life of Pablo',
//               releaseDate: '2016, Febraury 14',
//               genres: [ 'hip hop' ]
//             });
// albumsList.push({
//               artistName: 'the always rude Kanye',
//               name: 'My Beautiful Dark Twisted Fantasy',
//               releaseDate: '2010, November 22',
//               genres: [ 'rap', 'hip hop' ]
//             });
// albumsList.push({
//               artistName: 'the sweet Kanye',
//               name: '808s & Heartbreak',
//               releaseDate: '2008, November 24',
//               genres: [ 'r&b', 'electropop', 'synthpop' ]
//             });

// albumsList.forEach(function(album) {
//   album.songs = sampleSongs;
// });

db.User.findOne({_id: "58f67b84e3e026d2748db8e9" }, function(err, user){
user.squad.pop();
  //console.log(user.local.squad);
  user.squad.push(
    {
      "_id" : "58f6a888dd9ce7d829442263",
    }, {
     "_id" : "58f77fa6a62df6dbfa42dc4e"
    }
  );
   user.save(function (err) {
   if (err) return handleError(err);
   console.log("goodwork"); // [3]
 });
});

// db.Album.remove({}, function(err, albums){

//   db.Album.create(albumsList, function(err, albums){
//     if (err) { return console.log('ERROR', err); }
//     console.log("all albums:", albums);
//     console.log("created", albums.length, "albums");
//     process.exit();
//   });

// });