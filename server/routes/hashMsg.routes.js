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

router.post('/hashcontent',
    [
        check('text', 'min 1 symbol max 122 symbol ').isLength({min: 1, max: 122}),
    ],
    async (req, res) => {
        try {
            const error = validationResult(req);
            const {text} = req.body;

            const id = uuidv1();

            // console.log(id);

            if (!error.isEmpty()) {
                return res.status(400).json({message: 'Uncur req', error});
            }

            const key = crypto.createHash('sha256').update(config.get('secretKey')).digest();
            const cipherForText = crypto.createCipheriv('aes256', key, resizedIV);
            const cipherForId = crypto.createCipheriv('aes256', key, resizedIV);

            let hashText = [];
            let hashId = [];

            hashText = cipherForText.update(text, 'binary', 'hex')
            hashText += cipherForText.final('hex');

            hashId = cipherForId.update(id, 'binary', 'hex')
            hashId += cipherForId.final('hex');

            const secret = new Secret({ _id:hashId, text:hashText });
            await secret.save();
            return res.json({id: hashId, text:hashText});
            // console.log(hashText.join(''));

        } catch (e) {
            console.log(e);
            res.send({message: 'Error'});
        }
    },
);

router.post('/dhashcontent',
    async (req, res) => {
        try {
            const {secretId} = req.body;
            const key = crypto.createHash('sha256').update(config.get('secretKey')).digest();
            const decipher = crypto.createDecipheriv('aes256', key, resizedIV);
            
            let msg = [];

            msg += decipher.update(secretId, 'hex', 'binary');

            msg += decipher.final('binary');
            console.log(msg);

            res.send({message: 'Ok'});

        } catch (e) {
            console.log(e);
            res.send({message: 'Error'});
        }
    },
);

module.exports = router;