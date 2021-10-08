const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const db = require("../models");

const md5 = (str) => {
    return crypto.createHash('md5').update(str).digest("hex").toString();
};

router.post('/login', async (req, res) => {

    let email = req.body['email'];
    let user = await db.user.findOne({ where: { email: email } });

    if (!user || !user['id']) {
        return res.status(401).json({  });
    }

    if (user.md5password.toString() != md5(req.body['password'])) {
        return res.status(401).json({  });
    }

    // Generate JWT token
    const token = jwt.sign({
        user: {
            id: user.id,
            email:user.email
        },
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, 'Some--Secr(*)t.');

    return res.status(200).json({ token });


});

router.post('/signup', async(req, res) => {

    let { name, email, password } = req.body;
    let data = {
        'name': name,
        'email': email,
        'password': md5(password),
        'created_at': 'NOW()'
    };
    let id = await db.users.create(data);
    return res.status(200).json({ status: 'success' });
});




module.exports = router;
