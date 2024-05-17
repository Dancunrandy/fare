const express = require('express')
const router = express.Router()


router.post('/register', async (req, res, next) => {
    res.send("register route")
})

router.post('/login', async (req, res, next) => {
    res.send("login route")
})

router.post('/refresh-token', async (req, res, next) => {
    res.send("refresh route")
})

router.delete('/logout', async (req, res, next) => {
    res.send("logout route")
})

router.post('/register', async (req, res, next) => {
    console.log('Register route hit');
    res.send('register route');
 });
  

module.exports = router
