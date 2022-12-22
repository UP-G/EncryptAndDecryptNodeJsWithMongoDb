const Router = require('express');
const Secret = require('../model/Secret');
const crypto = require('crypto');
const config = require('config');
const { v1: uuidv1 } = require('uuid');
const {check, validationResult} = require('express-validator');

const router = new Router();

const resizedIV = Buffer.allocUnsafe(16);
const iv = crypto.createHash('sha256').update('myHashedIV').digest();

iv.copy(resizedIV);

router.post('/private/:id',
    // [
    //     check('text', 'min 1 symbol max 122 symbol ').isLength({min: 1, max: 122}),
    // ],
    async (req, res) => {
        try {
let id = req.params.id
return res.json({text: "ku", id: id});
        } catch (e) {
            console.log(e);
            res.send({message: 'Error'});
        }
    },
);

module.exports = router;