const functions = require('firebase-functions');
const express = require('express');
const { ExpressAdapter  } = require('ask-sdk-express-adapter');
const Alexa = require('ask-sdk-core');

//loging interceptors
const LogRequestInterceptor = {
  process(handlerInput) {
    //Log Req
    console.log("=REQUEST=");
    console.log(JSON.stringify(handlerInput.reqestEnvelope, null, 2));
  }
}

const LogResponseInterceptor = {
  process(handlerInput, response) {
    //Log Req
    console.log("=RESPONSE=");
    console.log(JSON.stringify(response, null, 2));
  }
}

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    Alexa.getIntentName(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speakOutput = 'Welcome to my skill, Hello World';
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  }
};

const GeneralIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
  },
  handle(handlerInput) {
    const speakOutput = 'Help me';
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  }
};

const WeatherIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
    && Alexa.getIntentName(handlerInput.requestEnvelope) === 'WeatherIntent';
  },
  handle(handlerInput) {
    const speakOutput = 'Todays weather is kinda hi.';
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  }
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest'
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder.getResponse();
  }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const app = express();
const skillBuilder = Alexa.SkillBuilders.custom();
const skill = skillBuilder.addRequestHandlers(
    LaunchRequestHandler,
    GeneralIntentHandler,
    WeatherIntentHandler,
    SessionEndedRequestHandler)
  .addErrorHandlers(ErrorHandler)
  .addRequestInterceptors(LogRequestInterceptor)
  .addResponseInterceptors(LogResponseInterceptor)
  .create();
const adapter = new ExpressAdapter(skill, true, true);

app.get('/', adapter.getRequestHandlers());

// Define and export the Firebase Cloud Function
exports.myFirebaseFunction = functions.https.onRequest(app);
