const express = require('express');
const router = express.Router();
const maincontrol = require('../controllers/maincontroller');

console.log("Router Loaded");
router.get('/',maincontrol.home);

module.exports = router;