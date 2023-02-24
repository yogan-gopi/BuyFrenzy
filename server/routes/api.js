const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const mongoose = require('mongoose')
const db = "mongodb+srv://yogang:PdA8z2xFjBH9mzEB@store.bjpvqe2.mongodb.net/storeDB"; 


mongoose.connect(db, err => {
    if (err) {
        console.error(" Error!: " + err);
    }
    else {
        console.log("Connected to MongoDB")
    }
})

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send("Unauthorized request")
    }
    let token = req.headers.authorization.split(" ")[1]
    if (token === 'null'){
        return res.status(401).send("Unauthorized request")
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload){
        return res.status(401).send("Unauthorized request")
    }
    req.userId = payload.subject
    next()
}
0


router.get('/', (req, res) => {
    res.send("From API route")
})

router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((err, regUser) => {
        if (err) {
            console.log(error)
        }
        else {
            let payload = { subject: regUser._id }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({ token })
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body

    User.findOne({ email: userData.email }, (err, user) => {
        if (err) {
            console.log(err)
        }
        else {
            if (!user) {
                res.status(401).send("Invalid email")
            } else
                if (user.password !== userData.password) {
                    res.status(401).send("Invalid password")
                }
                else {
                    let payload = { subject: user._id }
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({ token })
                }

        }
    })
})

module.exports = router