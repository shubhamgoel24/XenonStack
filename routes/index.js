const express = require('express');
const router = express.Router();
const passport = require('passport');

const maincontrol = require('../controllers/maincontroller');
const usercontroller = require('../controllers/users_controller');

console.log("Router Loaded");
router.get('/',maincontrol.home);
router.get('/contact',maincontrol.contact);
router.post('/contactSubmit',maincontrol.contactSubmit);
router.get('/sign-in', usercontroller.signIn);
router.get('/sign-up', usercontroller.signUp);
router.post('/create', usercontroller.create);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/sign-in'}
), usercontroller.createSession);

router.get('/sign-out', usercontroller.destroySession);


module.exports = router;