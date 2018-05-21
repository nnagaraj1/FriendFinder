// Dependencies
var path = require("path");
////var friends = require ("/Users/neeninagaraj/Desktop/FriendFinder/app/data/friends.js");
var friends=require("../app/data/friends.js");

// Displays a JSON of all possible friends
module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
       res.json(friends);
  })

// New Friend Entries - takes in JSON input
app.post("/api/friends", function(req, res) {
  console.log(req.body)
  var bestfriend={
    name: "",
    photo: "",
    friendDifference: Infinity
  }
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newFriend = req.body;
    var newFriendResponses = newFriend.scores;
    var totdiff;//


// // Goes through current friend list   
for (var i = 0; i < friends.length; i++) {
var currentfrnd=friends[i];
totdiff=0;
//   // Sorts new friends' scores and compares current and new lists
 for (var j = 0; j < currentfrnd.scores.length; j++) {
  var currentFriendScore = currentfrnd.scores[j];
  var currentUserScore = newFriendResponses[j];

  // We calculate the difference between the scores and sum them into the totalDifference
  totdiff += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
  }
//   // Results go to friendScores array
  // If the sum of differences is less then the differences of the current "best match"
  if (totdiff <= bestfriend.friendDifference) {
    // Reset the bestfriend  to be the new friend.
    bestfriend .name = currentfrnd.name;
    bestfriend .photo = currentUserScore.photo;
    bestfriend .friendDifference = totdiff;
  }
}

// Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
// the database will always return that the user is the user's best friend).
friends.push(newFriend);

// Return a JSON with the user's bestfriend . This will be used by the HTML in the next page
res.json(bestfriend );
  });
}