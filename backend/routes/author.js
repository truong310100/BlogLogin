const express = require('express');
const router = express.Router();

const Author = require('../models/author');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

filename = ''
const mystorage = multer.diskStorage({

    destination: './uploads',
    filename: (req, file, redirect) => {
        let date = Date.now();
        let fl = date + '.' + file.mimetype.split('/')[1]
        //1231231234324.png
        redirect(null, fl);
        filename = fl;
    }
})

const upload = multer({ storage: mystorage })

router.post('/register', upload.any('image'), (req, res) => {
    data = req.body;
    author = new Author(data);
    author.image = filename;

    salt = bcrypt.genSaltSync(10);
    author.password = bcrypt.hashSync(data.password, salt)

    author.save()
        .then((saveAuthor) => { filename = ''; res.status(200).send(saveAuthor) })
        .catch(err => { res.send(err) });
})

router.post('/login', (req, res) => {
    let data = req.body;
    Author.findOne({ email: data.email })
        .then((author) => { let valid = bcrypt.compareSync(data.password, author.password );
            if (!valid){ res.send('email or password invalid'); }
            else{
                let payload = { _id: author._id, email: author.email, fullname: author.name + ' ' + author.lastname }
                let token = jwt.sign(payload, '123456789');
                res.send({ mytoken: token })}})
        .catch(err => {res.send(err)})
    })

router.get('/all', (req, res) => { })
router.get('/getbyid:id', (req, res) => { })
router.delete('/supprimer/:id', (req, res) => { })
router.put('/update/:id', (req, res) => { })

module.exports = router