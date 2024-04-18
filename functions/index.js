const functions = require('firebase-functions');
const Alexa = require('ask-sdk-core');

const express = require('express');
const {ExpressAdapter} = require('ask-sdk-express-adapter');

//ask handlers here
const app = express();
const skillBuilder = Alexa.SkillBuilders.custom();
const skill = skillBuilder.create();
const adapter = newExpressAdapter(skill, true, true);

app.post('/', adapter.getRequestHandlers());
app.listen(3000);


exports.alexskill = functions.https.onRequest((req, response) => {
  if(!skillBuilder) {
    skillBuilder = Alexa.SkillBuilders.custom()
      .addRequestHandlers(
        LaunchRequestHandler,
        ExitHandler,
        SessionEndedRequestHandler
      )
      .addErrorHandlers(ErrorHandler)
      .create();

    //possibly do validation on signatures here
    
    //invoke the skill
    const responseASK = skill.invoke(req.body);
    response.send(responseASK.response);
    
});
