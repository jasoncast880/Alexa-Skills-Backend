const functions = require('firebase-functions');
const AlexaASK = require('ask-sdk-core');
const { SkillRequestSignatureVerifier, TimestampVerifier } = require('ask-sdk-express-adapter');

...your ASK code..

let skillBuilder;

exports.alexaskill = functions.https.onRequest((req, response) => {
    if (!skillBuilder) {
        skillBuilder = AlexaASK.SkillBuilders.custom()
            .addRequestHandlers(
                LaunchRequestHandler,
                ExitHandler,
                SessionEndedRequestHandler
            )
            .addErrorHandlers(ErrorHandler)
            .create();
    } // only create the skill builder on the first invocation; otherwise it's static

   // validate that the signatures match
    try {
        const textBody = req.rawBody.toString()
        await new SkillRequestSignatureVerifier().verify(textBody, req.headers);
        await new TimestampVerifier().verify(textBody);
    } catch (err) {
        // server return err message
        response.send(403, JSON.stringify(err))
    }

    // invoke the skill 
    const responseASK = skill.invoke(req.body);
    response.send(responseASK.response); // this may just be responseASK

});
