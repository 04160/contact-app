const nodemailer = require('nodemailer');

//Requires working inbox user with enabled SMTP to use
//Currently permits only 15 emails and hour and 5 emails a minute
//Only feasible for test projects like this
let transporter = nodemailer.createTransport({
    host: 'mail.inbox.lv',
    port: 587,
    secure: false,
    auth: {
        user: 'test_smtp_user',
        pass: 'zxc123'
    }
});

/**
 * GET /mail
 */
exports.getMail = (req, res) => {
    res.render('mail/mailbase', {
        title: 'Send mail app'
    });
};

/**
 * POST /mail
 */
exports.sendMail = (req, res) => {
    console.log('post /mail');
    console.log(req.body);
    if (req.body.to !== undefined && req.body.from !== undefined && req.body.subject !== undefined && req.body.text !== undefined) {
        let mailBody = {
            from: "<test_smtp_user@inbox.lv>",
            to: "test <" + req.body.to + ">",
            subject: "Message from: " + req.body.from + " Subject: " + req.body.subject,
            text: req.body.text
        };
        console.log(mailBody);
        transporter.sendMail(
            mailBody,
            (err, info) => {
                if (err) {
                    console.error(err);
                    return err;
                }

                console.log('Message sent: %s', info.messageId);
                return info;
            }
        );
    } else {
        res.send("invalid information provided");
    }

    res.send('missing fields');
};
