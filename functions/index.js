/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require('firebase-functions');
//const {onRequest} = require("firebase-functions/v2/https");
const Alexa = require('ask-sdk-core');

//const { ExpressAdapter } = require('ask-sdk-core');
//const express = require('express');
//const app = express();

//Handler Code here
const GetNewFactIntentHandler = {
  canHandler(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEvelope) === 'IntentRequest'
     && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetNewFactIntent';
  },
  handle(handlerInput) {
    const speakOutput = 'tita baby is coming to your house!';
    
    return handlerInput.responseBuilder
      .speak(speakOutput)
      //reprompt code here
      .getResponse();
  }
};
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    // Any clean-up logic goes here.
    return handlerInput.responseBuilder.getResponse();
  }
};
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I don\'t understand your command. Please say it again.')
      .reprompt('Sorry, I don\'t understand your command. Please say it again.')
      .getResponse();
  }
};

//firebase gcf handler
let skill;

exports.handler = async function(event, context) {
  console.log(`REQUEST++++${JSON.stringify(event)}`);
  if (!skill) {
    skill = Alexa.SkillBuilders.custom().addRequestHandlers(
    GetNewFactIntentHandler,
    SessionEndedRequestHandler,
    )
    .addErrorHandlers(ErrorHandler)
    .create;
  }
  
  const response = await skill.invoke(event,context);
  console.log(`RESPONSE++++$JSON.stringify(response)}`);

  return response;
};


/*
app.get('/', (req, res) => {
  res.send('Hello World Express');
})

exports.app = functions.https.onRequest(app);
*/

