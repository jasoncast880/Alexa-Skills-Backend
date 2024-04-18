const functions = require('firebase-functions');

const express = require('express');
const { SkillBuilders } = require('ask-sdk-core');
const {ExpressAdapter} = require('ask-sdk-express-adapter');

//ask handlers here
const app = express();

const skillBuilder = SkillBuilders.custom();

const GetNewFactIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetNewFactIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'hello joyce im watching you!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Define your intent handlers here
// ...

// Add intent handlers to the skill builder
skillBuilder.addRequestHandlers(
    // Your intent handlers here
    GetNewFactIntentHandler
);

const skill = skillBuilder.create();

const adapter = new ExpressAdapter(skill, true, true);

app.post('/', adapter.getRequestHandlers());

// Export the Express app for Firebase Cloud Functions
exports.alexaskill = functions.https.onRequest(app);

