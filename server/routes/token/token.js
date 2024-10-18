// const { token } = require("morgan");
const express = require("express");
const tokenRouter = express.Router();

tokenRouter.get("/", async (req, res, next) => {
    let token;
  try {
    var request = require("request");
    var options = { method: 'POST',
        url: 'https://dev-57j8ewiwddxcplk2.us.auth0.com/oauth/token',
        headers: { 'content-type': 'application/json' },
        body: '{"client_id":"QN581rsLEqmYqyusHyKtDGqKDioOFyTZ","client_secret":"43Ak6UHAZhkU_2O1SXSUcQv29sveW9F4eCIKJCq_TadVRJqeV7J8VfD2KY47tV6Z","audience":"http://localhost:3000/items","grant_type":"client_credentials"}' };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
       token = body;
      res.send(body);
    });
  } catch (error) {
    console.log(error);
  }
});


tokenRouter.get("/insufficient-token", async (req, res, next) => {
  let token;
try {
  var request = require("request");
  var options = { method: 'POST',
    url: 'https://dev-57j8ewiwddxcplk2.us.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    body: '{"client_id":"5kXJeakm1BzcGOCOTD1e2bbsHGCepmxe","client_secret":"zM4TWnOj21bqrKMxcJLeRB3cASbIO1qtQMp3-oTyuGeonS25gFKZKx6_TxG4bksv","audience":"http://localhost:3000/users","grant_type":"client_credentials"}' };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
     token = body;
    res.send(body);
  });
} catch (error) {
  console.log(error);
}
});

module.exports = tokenRouter;
