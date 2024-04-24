const functions = require('firebase-functions');
const express = require('express');
//const { ExpressAdapter } = require('ask-sdk-express-adapter');
const Alexa = require('ask-sdk-core');

function handleAlexaRequest(alexaRequest) {
    // Parse the Alexa request and determine the intent
    const intent = alexaRequest.request.intent.name;

    // Determine the action based on the intent
    let response;
    if (intent === 'HelloIntent') {
        // Construct response for HelloIntent
        response = {
            "version": "1.0",
            "response": {
                "outputSpeech": {
                    "type": "PlainText",
                    "text": "Hello! How can I help you if?"
                }
            }
        };
    } else {
        // Construct response for HelloIntent
        response = {
            "version": "1.0",
            "response": {
                "outputSpeech": {
                    "type": "PlainText",
                    "text": "Hello! How can I help you else?"
                }
            }
        };

    }

    return response;
}

const app = express();

app.use(express.json());
app.post('/alexaEndpoint', (req, res) => {
  const alexaRequest = req.body;

  const alexaResponse = handleAlexaRequest(alexaRequest);

  res.json(alexaResponse);
});

// Define and export the Firebase Cloud Function
exports.alexaSkill = functions.https.onRequest(app);
