/**
 * Contact.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        title: 'string',
        lastName: 'string',
        firstName: 'string',
        companyName: 'string',
        adress: 'string',
        complementoryAdress: 'string',
        postalCode: 'string',
        city: 'string',
        homePhone: 'string',
        mobilePhone: 'string',
        officePhone: 'string',
        mail: 'string',
        birthday: 'string',
        sexe: {
            type: 'string',
            enum: ['male', 'female']
        },
        type: {
            model: 'type'
        },
        genre: {
            model: 'genre'
        },
        adherent: 'boolean',
        benevole: 'boolean',
        donor: 'boolean',
        help: {
            model: 'help'
        },
        diverse1: {
            model: 'diverse1'
        },
        diverse2: {
            model: 'diverse2'
        },
        role:{
            model: 'role'
        },
        comments: 'string'
    }
};