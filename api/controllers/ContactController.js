/**
 * ContactController
 *
 * @description :: Server-side logic for managing contacts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    length: function (req, res) {
        Contact.find().exec(function(err, contacts){
            res.send(contacts.length.toString());
        });
    }
};