"use strict";

var Alexa = require("alexa-sdk");
var SKILL_NAME = "Confidence Builder";
var APP_ID = "";

var COMPLIMENT_LIST = [
    "Your looking great this morning!",
    "Today is going to be a good day",
    "get up and have some chocolate",
    "treat yourself to some new shoes"
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function(){
        this.emit('GetCompliment');
    },
    'GetComplimentIntent': function() {
        this.emit('GetCompliment');
    },
    'GetCompliment': function () {
        var complimentIndex = Math.floor(Math.random() * COMPLIMENT_LIST.length);
        var randomComplimdent = COMPLIMENT_LIST[complimentIndex];

        //output
        var speechOutput = "Your compliment " + randomComplimdent;
        this.emit(":tellWithCard", speechOutput, SKILL_NAME, randomComplimdent);
    },
    'AMAZON.Helpintent': function() {
        var speechOutput = "You can say giver me a compliment, or, you casn say exit... What can I help you with?";
        var reprompt = "What can I help you with";
        this.emit(":ask", speechOutput, reprompt);
    },
    'AMAZON.Cancelintent': function() {
        this.emit(":tell", Goodbye);
    },
    'AMAZON.Stopintent': function() {
        this.emit(":tell", Goodbye);
    }
};