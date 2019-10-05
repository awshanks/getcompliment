"use strict";

let Alexa = require("alexa-sdk");
let SKILL_NAME = "Confidence Builder";
let APP_ID = "";

let COMPLIMENT_LIST = [
    "Your looking great this morning!",
    "Today is going to be a good day",
    "get up and have some chocolate",
    "treat yourself to some new shoes"
];

exports.handler = function(event, context, callback) {
    let alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

let handlers = {
    'LaunchRequest': function(){
        this.emit('GetCompliment');
    },
    'GetComplimentIntent': function() {
        this.emit('GetCompliment');
    },
    'GetCompliment': function () {
        let complimentIndex = Math.floor(Math.random() * COMPLIMENT_LIST.length);
        let randomComplimdent = COMPLIMENT_LIST[complimentIndex];

        //output
        let speechOutput = "Your compliment " + randomComplimdent;
        this.emit(":tellWithCard", speechOutput, SKILL_NAME, randomComplimdent);
    },
    'AMAZON.Helpintent': function() {
        let speechOutput = "You can say giver me a compliment, or, you casn say exit... What can I help you with?";
        let reprompt = "What can I help you with";
        this.emit(":ask", speechOutput, reprompt);
    },
    'AMAZON.Cancelintent': function() {
        this.emit(":tell", Goodbye);
    },
    'AMAZON.Stopintent': function() {
        this.emit(":tell", Goodbye);
    }
};