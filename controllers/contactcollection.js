const Contact = require('../models/contactSchema');

/**
 * GET /contactcollection
 */
exports.getContactCollection = (req, res) => {
    res.render('contactcollection/contactcollectionbase', {
        title: 'Contact collection'
    });
};

/**
 * GET /contaccollection/contaclist
 */
exports.getContactList = (req, res) => {
    console.log('/contactlist');
    Contact.find({}, (err, contacts) => {
        if (err) return console.error(err);
        res.json(contacts);
    });
};

/**
 * DELETE /contactcollection/deletecontact/:id
 */
exports.deleteContact = (req, res) => {
    console.log(req.params);
    Contact.remove({ _id : req.params.id }, (err, targetContact) => {
        if (err) return res.send({msg : err});
        res.send({msg : ''});
    });
};

/**
 * ??? /contactcollection/editcontact
 */
exports.editContact = (req, res) => {
    console.log('/editcontact');
    console.log(req.params.id);
};