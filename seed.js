var db = require("./models");

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
