const express = require("express");
const router = express.Router();

const itemsRouter = require('./item/items');
const usersRouter = require('./user/users');
const tokenRouter = require('./token/token');
// different model routers
router.use('/items', itemsRouter);
router.use('/users', usersRouter);
router.use('/token', tokenRouter);
module.exports = router;
