const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

exports.upload = (req, res, next) => {
    if (!req.file) {
        console.log("multer fail");
        return res.sendStatus(500);
    }
    const { filename, mimetype, size, path } = req.file;

    s3.putObject({
        Bucket: "spicedling",
        ACL: "public-read",
        Key: filename,
        Body: fs.createReadStream(path),
        ContentType: mimetype,
        ContentLength: size,
    })
        .promise()
        .then(function () {
            next();
            fs.unlink(path, () => {});
        })
        .catch(function (err) {
            console.log(err);
            res.sendStatus(500);
        });
};

exports.delete = (req, res, next) => {
    var params = {
        Bucket: "spicedling",
        Key: req.body.imageurl,
    };

    console.log(req.body.imageurl);
    s3.deleteObject(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            return next(err);
        }
        console.log(data);
    });
};
