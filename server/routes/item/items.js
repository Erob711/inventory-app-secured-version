const express = require("express");
const itemsRouter = express.Router();
const { Item } = require("../../models");
const { check, validationResult } = require('express-validator');
const { auth } = require('express-oauth2-jwt-bearer');
const jwtAuthz = require('express-jwt-authz');



// DEMO: Making sure requests are coming in with valid permissions:

const jwtCheck = auth({
  audience: 'http://localhost:3000/items',
  issuerBaseURL: 'https://dev-57j8ewiwddxcplk2.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// enforce on all endpoints
itemsRouter.use(jwtCheck);

itemsRouter.get("/", async (req, res, next) => {
  // console.log("REQ" + req.headers.authorization);
  try {
    const items = await Item.findAll();
    res.send(items);
  } catch (error) {
    next(error);
  }
});


itemsRouter.post("/",
  [check('name').not().isEmpty().trim().isAlphanumeric().isLength({ max: 100 }),
    check('price').not().isEmpty().trim().isNumeric(),
    check('description').not().isEmpty().trim().isLength({ max: 250 })],
  async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      res.json({ errors : errors.array() });
    }
    else {
      try{
        const newItem = await Item.create(req.body);
        res.json(newItem);
      }
      catch(error){
        next(error);
      }
    }
  });

itemsRouter.put("/:id",
  [check('name').not().isEmpty().trim().isLength({ max: 100 }),
    check('price').not().isEmpty().trim().isNumeric(),
    check('description').not().isEmpty().trim().isLength({ max: 250 })],
  async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      res.json({ errors : errors.array() });
    }
    else {
      try {
        const item = await Item.findByPk(req.params.id);
        const updatedItem = await item.update(req.body, { where:{ id: req.params.id } });
        res.json({ message: "updated item " + updatedItem.name });
      } catch (error) {
        next(error);
      }
    }
  });

itemsRouter.delete("/:id", async (req, res, next) => {
  try{
    const item = await Item.findByPk(req.params.id);
    await item.destroy();
    res.json({ message: "Deleted item with id: " + req.params.id });
  }
  catch(error){
    next(error);
  }
});

module.exports = itemsRouter;
