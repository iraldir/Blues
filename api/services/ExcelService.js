var stringify = require('csv-stringify');

var allColumns = {
    title: {
        key: "title",
        caption: "Titre",
        type: "string",
        width: 28
    },
    lastName: {
        key: "lastName",
        caption: "Nom de famille",
        type: "string",
        width: 28
    },
    firstName: {
        key: "firstName",
        caption: "Prénom",
        type: "string",
        width: 28
    },
    companyName: {
        key: "companyName",
        caption: "Entreprise",
        type: "string",
        width: 28
    },
    adress: {
        key: "adress",
        caption: "Adresse",
        type: "string",
        width: 28
    },
    complementoryAdress: {
        key: "complementoryAdress",
        caption: "Adresse complémentaire",
        type: "string",
        width: 28
    },
    postalCode: {
        key: "postalCode",
        caption: "Code Postal",
        type: "string",
        width: 28
    },
    city: {
        key: "city",
        caption: "Ville",
        type: "string",
        width: 28
    },
    homePhone: {
        key: "homePhone",
        caption: "Téléphone Domicile",
        type: "string",
        width: 28
    },
    mobilePhone: {
        key: "mobilePhone",
        caption: "Téléphone Portable",
        type: "string",
        width: 28
    },
    officePhone: {
        key: "officePhone",
        caption: "Téléphone Bureau",
        type: "string",
        width: 28
    },
    email: {
        key: "email",
        caption: "Email",
        type: "string",
        width: 28
    },
    birthday: {
        key: "birthday",
        caption: "Date de naissance",
        type: "string",
        width: 28
    },
    sexe: {
        key: "sexe",
        caption: "Sexe",
        type: "string",
        width: 28
    },
    type: {
        key: "type",
        caption: "Type de contact",
        type: "string",
        width: 28
    },
    genre: {
        key: "genre",
        caption: "Genre de contact",
        type: "string",
        width: 28
    },
    adherent: {
        key: "adherent",
        caption: "Adhérent",
        type: "string",
        width: 28
    },
    benevole: {
        key: "benevole",
        caption: "Bénévole",
        type: "string",
        width: 28
    },
    donor: {
        key: "donor",
        caption: "Donateur",
        type: "string",
        width: 28
    },
    help: {
        key: "help",
        caption: "Type de Mécénat",
        type: "string",
        width: 28
    },
    diverse1: {
        key: "diverse1",
        caption: "Divers I",
        type: "string",
        width: 28
    },
    diverse2: {
        key: "diverse2",
        caption: "Divers II",
        type: "string",
        width: 28
    },
    role: {
        key: "role",
        caption: "Fonction",
        type: "string",
        width: 28
    },
    comments: {
        key: "comments",
        caption: "Commentaires",
        type: "string",
        width: 28
    }
};

module.exports = {
    generateExcel: function (options, res) {
        var cols = [];
        var rows = [];

        if (options.columns) {
            cols = options.columns.map(function (columnName) {
                return allColumns[columnName];
            });
        } else {
            cols = [];
            for (var columnName in allColumns) {
                
                cols.push(allColumns[columnName]);
            }
        }
        rows[0] = [];
        cols.forEach(function (col) {
            rows[0].push(col.caption);
        });

        options.contacts.forEach(function (contact) {
            rows.push([]);
            rows[rows.length - 1] = cols.map(function (col) {
                return contact[col.key] || "";
            });
        });
        
        // var result = nodeExcel.execute(conf);       
        stringify(rows, function (err, output) {
            var result = "sep=,\n" + output;
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", "attachment; filename=" + "Contacts Blet.csv");
            res.end(result, 'binary');
        });

    }
};