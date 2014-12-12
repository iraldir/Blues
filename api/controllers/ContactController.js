/**
 * ContactController
 *
 * @description :: Server-side logic for managing contacts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    length: function (req, res) {
        Contact.find().exec(function (err, contacts) {
            res.send(contacts.length.toString());
        });
    },
    smartfind: function (req, res) {
        var search = req.param('query');
        var realSearch = search.split(' ');
        var firstWord = realSearch[0];
        var secondWord = realSearch[1];
        var contacts = Contact.find().populateAll();
        var request = {
            or: [
                {
                    lastName: {
                        contains: firstWord
                    }
                    },
                {
                    firstName: {
                        contains: secondWord ? secondWord : firstWord
                    }
                    },
                {
                    companyName: {
                        contains: firstWord
                    }
                    },
                {
                    postalCode: {
                        contains: firstWord
                    }
                    },
                {
                    city: {
                        contains: firstWord
                    }
                    },
                {
                    homePhone: {
                        contains: firstWord
                    }
                    },
                {
                    mobilePhone: {
                        contains: firstWord
                    }
                    },
                {
                    officePhone: {
                        contains: firstWord
                    }
                    },
                {
                    email: {
                        contains: firstWord
                    }
                }, {
                    genre: {
                        contains: firstWord
                    }
                },
                {
                    role: {
                        contains: firstWord
                    }
                },
                {
                    comments: {
                        contains: firstWord
                    }
            }
            ]
        };
        contacts.where(request).exec(function (err, data) {
            res.send(data);
        });
    }
};