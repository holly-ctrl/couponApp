require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const ctrl = require('../controllers/controller')
const authCtrl = require('../controllers/authController')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

const app = express()
app.use(express.json())

app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false 
}))
app.use(express.static(`${__dirname}/../build`))

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)

app.post('/api/addCouponImage', ctrl.addCouponImage)
app.post('/api/addCoupon', ctrl.addCoupon)
app.get('/api/getAllCoupons', ctrl.getAllCoupons)
app.delete('/api/deleteCoupon/:id', ctrl.deleteCoupon)
app.put('/api/editCoupon/:id', ctrl.editCoupon)

app.get('/sign-s3', ctrl.signedRequest)
app.post('/addCouponImage', ctrl.addCouponImage)

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))
})