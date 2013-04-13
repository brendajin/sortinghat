Events = new Meteor.Collection("events");

if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Where all your sorting needs are met.";
  };

  Template.eventboard.events = function () {
    return Events.find({}, {sort: {score: -1, name: 1}});
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You selected Event 1");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    if (Events.find().count() === 0) {
      var events = ["hackathon",
                   "soccer",
                   "birthday"];
      for (var i = 0; i < events.length; i++)
        Events.insert({name: events[i], score: Math.floor(Random.fraction()*10)*5});
    }
  });
}
