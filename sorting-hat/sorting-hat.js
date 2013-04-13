Events = new Meteor.Collection("events");
Participants = new Meteor.Collection("participants");

if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Where all your sorting needs are met.";
  };

  Template.eventboard.events = function () {
    return Events.find({}, {sort: {score: -1, name: 1}});
  };

  Template.allParticipants.participants = function () {
    return Participants.find({}, {sort: {name:1}});
  }

  Template.newEventForm.events({
    'click #maketeams': function() {
      var eventName = $('#newEventName').val();
      Events.insert({name: eventName});
      $('#newEventName').val('');
    }
  });

  Template.newParticipantsForm.events({
    'click #signUp': function() {
      var firstName = $('#firstName').val();
      Participants.insert({name: firstName});
      $('#firstName').val('');
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    if (Events.find().count() === 0) {
      var events = ["CM hackathon",
                   "Hawks vs Raptors Soccer Game",
                   "Dana's Sweet 16"];
      for (var i = 0; i < events.length; i++)
        Events.insert({name: events[i], score: Math.floor(Random.fraction()*10)*5});
    }
  });
}