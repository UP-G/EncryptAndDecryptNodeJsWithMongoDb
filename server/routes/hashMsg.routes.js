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

            const hashText = hashMsg(text);
            const hashId = hashMsg(id);
            //console.log(id);

            if (!error.isEmpty()) {
                return res.status(400).json({message: 'Uncur req', error});
            }

            const secret = new Secret({ _id:hashId, text:hashText });
            await secret.save();
            return res.json({cId: id, id: hashId, text:hashText});
            // console.log(hashText.join(''));

        } catch (e) {
            console.log(e);
            res.send({message: 'Error'});
        }
    },
);

router.post('/dhashcontent/:secretId',
    async (req, res) => {
        try {
            secretId = req.params.secretId;

            console.log(secretId)

            Secret.findById(hashMsg(secretId), function (err, docs) {
                if (err){
                    console.log(err);
                }
                else{
                    //console.log(docs.id, dHashMsg(docs.text), docs.date);
                    return res.json({id: docs.id, text:dHashMsg(docs.text), date: docs.date});
                }
            });

        } catch (e) {
            console.log(e);
            res.send({message: 'Error'});
        }
    },
);

module.exports = router;

function hashMsg(string) {

    const key = crypto.createHash('sha256').update(config.get('secretKey')).digest();
    const cipher = crypto.createCipheriv('aes256', key, resizedIV);

    let hashString = [];

    hashString = cipher.update(string, 'binary', 'hex')
    hashString += cipher.final('hex');

    return hashString;
}

function dHashMsg(string) {
            const key = crypto.createHash('sha256').update(config.get('secretKey')).digest();
            const decipher = crypto.createDecipheriv('aes256', key, resizedIV);
            
            let dHashString = [];

            dHashString += decipher.update(string, 'hex', 'binary');

            dHashString += decipher.final('binary');
            //console.log(msg); // msg dHashMsg

            return dHashString;
}