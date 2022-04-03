const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Anuraghasmadethis$webapp'

//ROUTE 1: Create a user using: POST "/api/auth/createuser". Does not require Auth. No loign required
router.post('/createuser', [
    body('name', 'Enter a valid name of atleast 3 chars long').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'The password must be atleast 5 character long').isLength({ min: 5 })], async (req, res) => {
        //If there are errors return bad requests. Following lines are same as mentioned on the express validator website
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //try catch statement to prevent errors
        try {
            //Check whether the user with this email exists
            let user = await User.findOne({ email: req.body.email })

            //If user already exists then send the status code 400 with the message that the user already exists.
            if (user) {
                return res.status(400).json({ error: "Sorry a user with this email already exists" })
            }

            //Generating the salt and hashing the password to save in the database
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            //Create a user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })
            // res.json(user)

            //signing the token and giveing a authtoken to the user
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET)
            res.json({ authtoken })

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error")

        }
    })

//ROUTE 2: Authenticate a user using: POST "/api/auth/login". Does not require Auth. No loign required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()], async (req, res) => {

        //If there are errors return bad requests. Following lines are same as mentioned on the express validator website
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            //finding user with the entered email in the database
            let user = await User.findOne({ email })

            //If user doesn't exists then send the 400 status code with a message of please try again with the correct credentials
            if (!user) {
                return res.status(400).json({ error: "Please try to login with correct credentials" });
            }

            //Compare the password entered by the user and the hash stored in the database
            const passwordCompare = await bcrypt.compare(password, user.password);

            //If the password is wrong sending the status code 400 with a message of please try to login with correct credentials
            if (!passwordCompare) {
                return res.status(400).json({ error: "Please try to login with correct credentials" });
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            //Signing and issuing a token to the user for login
            const authtoken = jwt.sign(data, JWT_SECRET)
            res.json({ authtoken })
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error")
        }
    })

//ROUTE 3: Get logged in user details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;

        //Finding the user and don't take its password stored in our user variable and then send the user as a json
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router
