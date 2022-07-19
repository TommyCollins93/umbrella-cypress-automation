// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

// Cypress.Commands.add('login', (mail) => {

//         console.log(mail);
//         var http = require('https');
//         var MongoClient = require('mongodb').MongoClient;
//         MongoClient.connect('mongodb://test:2wsxCDE#@3.130.75.230',{useNewUrlParser: true }, function (err, client) {
//         if (err) throw err;
//         console.log("Database connected!");
//         var db = client.db('salesDB');
//         const collection = db.collection("userAccount");
//         collection.find({'email' : mail}).toArray(function(err, docs) {
//         console.log("Found the following records");
//         console.log(docs);
//         console.log(mail);
//         var token = docs[0].tokens.find(token => token.type == "ACTIVATION").value;
//         console.log(token);
//         browser.get("https://stage.myaudit.net/system/password-change?token="+token+"&email="+mail);
//         browser.sleep(10000)
//         });
//         });
//         })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//

//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
