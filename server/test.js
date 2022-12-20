// const crypto = require('crypto');
// const config = require('config');
// const argv = require('yargs').argv;
// const resizedIV = Buffer.allocUnsafe(16);
// const iv = crypto.createHash('sha256').update('myHashedIV').digest();

// const key = crypto.createHash('sha256').update(config.get('secretKey')).digest();
// const decipher = crypto.createDecipheriv('aes256', key, resizedIV);
// let msg = []

// msg += decipher.update(argv._, 'hex', 'binary');

// msg += decipher.final('binary');
// console.log(msg);