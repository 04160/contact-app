const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    forename: String,
    surname: String,
    email: String,
    phone: String,
    bday: String,
    location: String,
    occupation: String,
    about: String,
    created: Date,
    updated: Date
}, { collection : 'contactlist'});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;