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
    app.ask(app.buildRichResponse()
      // Create a basic card and add it to the rich response
      .addSimpleResponse('Math and prime numbers it is!')
      .addBasicCard(app.buildBasicCard('42 is an even composite number. It' +
        'is composed of three distinct prime numbers multiplied together. It' +
        'has a total of eight divisors. 42 is an abundant number, because the' +
        'sum of its proper divisors 54 is greater than itself. To count from' +
        '1 to 42 would take you about twenty-one…')
        .setTitle('Math & prime numbers')
        .addButton('Read more', 'https://example.google.com/mathandprimes')
        .setImage('https://example.google.com/42.png', 'Image alternate text')
        .setImageDisplay('CROPPED')
      )
    );
  }

  let router = new Map();
  router.set("display_carousel", displayCarousel);
  app.handleRequest(router);
});
