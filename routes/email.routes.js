const express = require('express');
const {Router} = express;
const router=Router()
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: 'third3@bk.ru',
        pass: 'tRoRPoOyi1*7'
    },
    // tls: {
    //     rejectUnauthorized: false
    // }
});

const mailer= message =>{
    transporter.sendMail(message,(err,info)=>{
        if (err) return console.log('Error ',err)
        console.log('Email sent:', info)
    })
}

router.post('/email',(req,res)=>{
    if (!req.body.email || !req.body.message) return res.sendStatus(400)
    const message = {
        from: `third3@bk.ru`,
        to: 'pavel12g@mail.ru', // Почта сайта
        subject: req.body.name,
        html: req.body.message
      };
      mailer(message)
})

module.exports = router