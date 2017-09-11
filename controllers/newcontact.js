const Contact = require('../models/contactSchema');

/**
 * GET /newcontact
 */
exports.getCreateNewContact = (req, res) => {
    res.render('newcontact/newcontactbase', {
        title: "Create new contact"
    });
};

/**
 * POST /newcontact/addcontact
 */
exports.postNewContact = (req, res) => {
    console.log('newcontact/addcontact');
    let contact = new Contact({
        forename: req.body.forename,
        surname: req.body.surname,
        email: req.body.email,
        phone: req.body.phone,
        bday: req.body.bday,
        location: req.body.location,
        occupation: req.body.occupation,
        about: req.body.about,
        created: req.body.created,
        updated: req.body.updated
    });

    Contact.findOne({ forename : req.body.forename , surname : req.body.surname}, (err, existingContact) => {
        if (err) {
            res.status(500).send(err);
        }
        if (existingContact) {
            res.status(422).send('Contact with that name and surname already exists');
        }
        contact.save((err) => {
            if (err) {
                return res.status(500).send({msg : err});
            } else {
                console.log('response OK');
                res.status(200).send('OK');
            }
        });
    });
};

/**
 * PUT /newcontact/addcontact
 */
exports.putNewContact = (req, res) => {
    Contact.findOne({ forename : req.body.forename, surname : req.body.surname}, (err, existingContact) => {
        if (err) {
            res.status(500).send(err);
        }
        if (!existingContact) {
            res.status(500).send('Contact does not exist');
        }
        console.log(existingContact);
    });
};