const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-west-1",
});

exports.sendEmail = (to, body, subj) =>
    ses
        .sendEmail({
            Source: "Cactus Pedestrian <cactus.pedestrian@spicedling.email>",
            Destination: {
                ToAddresses: [to],
            },
            Message: {
                Body: {
                    Text: {
                        Data: body,
                    },
                },
                Subject: {
                    Data: subj,
                },
            },
        })
        .promise();

// Data: "Here is your security code to reset your password!",
// Subject "Here is your security code to reset your password. Please bear in mind that you have to use this code in 10 minutes!",
