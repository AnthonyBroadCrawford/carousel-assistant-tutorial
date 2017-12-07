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
    app.askWithList('Alright! Here are a few things you can learn. Which sounds interesting?',
        // Build a list
        app.buildList('Things to learn about')
          // Add the first item to the list
          .addItems(app.buildOptionItem('MATH_AND_PRIME',
            ['math', 'math and prime', 'prime numbers', 'prime'])
            .setTitle('Math & prime numbers')
            .setDescription('42 is an abundant number because the sum of its ' +
            'proper divisors 54 is greater…')
            .setImage('http://example.com/math_and_prime.jpg', 'Math & prime numbers'))
          // Add the second item to the list
          .addItems(app.buildOptionItem('EGYPT',
            ['religion', 'egpyt', 'ancient egyptian'])
            .setTitle('Ancient Egyptian religion')
            .setDescription('42 gods who ruled on the fate of the dead in the ' +
            'afterworld. Throughout the under…')
            .setImage('http://example.com/egypt', 'Egypt')
          )
          // Add third item to the list
          .addItems(app.buildOptionItem('RECIPES',
            ['recipes', 'recipe', '42 recipes'])
            .setTitle('42 recipes with 42 ingredients')
            .setDescription('Here\'s a beautifully simple recipe that\'s full ' +
            'of flavor! All you need is some ginger and…')
            .setImage('http://example.com/recipe', 'Recipe')
          )
      );
  }

  let router = new Map();
  router.set("display_carousel", displayCarousel);
  app.handleRequest(router);
});
