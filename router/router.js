const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');
const secretKey = '129834765';
const jwt = require('jsonwebtoken');


router.get('/', (req, res) => {
    res.send("This is the homepage");
});


router.post('/register', async (req, res) => {

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    })

    res.json(req.body)
})



router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.status(401).json({ message: 'Email incorssrect.' });
        return;
    }
    
    let pass = await bcrypt.compare(req.body.password, user.password);

    if (pass) {
        const token = jwt.sign({ sub: user._id }, secretKey, { expiresIn: '30m' });
        res.json({ token })
        return
    }
    res.status(401).json({ message: 'password.' });
})

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({status:200, message: 'You have access to this protected route.' });
});
module.exports = router