'use strict';

process.env.DEBUG = 'actions-on-google:*';

const App = require('actions-on-google').DialogflowApp;
const firebase = require('firebase-functions');

exports.carouselAssistant = firebase.https.onRequest((request, response) => {

  const app = new App({request, response});

  //I'm logging this into my firebase console so I can learn the data-structures Google is passing to the app.
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

  function displayCarousel(app){
    app.tell('Hello!');
  }

  let router = new Map();
  router.set("display_carousel", displayCarousel);
  app.handleRequest(router);
});
