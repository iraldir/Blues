var stringify = require('csv-stringify');
var parse = require('csv-parse');

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
        type: "relation",
        width: 28
    },
    genre: {
        key: "genre",
        caption: "Genre de contact",
        type: "relation",
        width: 28
    },
    adherent: {
        key: "adherent",
        caption: "Adhérent",
        type: "boolean",
        width: 28
    },
    benevole: {
        key: "benevole",
        caption: "Bénvole",
        type: "boolean",
        width: 28
    },
    donor: {
        key: "donor",
        caption: "Donateur",
        type: "boolean",
        width: 28
    },
    help: {
        key: "help",
        caption: "Type de Mecenat",
        type: "relation",
        width: 28
    },
    diverse1: {
        key: "diverse1",
        caption: "Divers I",
        type: "relation",
        width: 28
    },
    diverse2: {
        key: "diverse2",
        caption: "Divers II",
        type: "relation",
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
    parseExcel: function(options, callback){
        parse(options.csv, {}, function(err, output){
           var rows = output;
            rows.shift(); // first line is seq=,
            var columns = rows[0].map(function(col){
                for (colKey in allColumns){
                    if (allColumns[colKey].caption == col){
                        return colKey;
                    }
                }
                throw Error("Colonne inconnue " + col);
            });
            rows.shift();
            contacts = rows.map(function(values){
                var contact = {};
                columns.forEach(function(colKey, index){
                    var columnInfos = allColumns[colKey];
                    if (columnInfos.type=="boolean"){
                        contact[colKey] = (values[index] == "oui");
                    } else {
                        contact[colKey] = values[index];
                    }
                });
                return contact;
            });
            callback(contacts);
            
        });
    },
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
            rows[rows.length - 1] = cols.map(function (col, i) {
                if (cols[i].type == "boolean"){
                    return contact[col.key] ? "oui" : "non";
                } else {
                    return (contact[col.key] && contact[col.key].name ? contact[col.key].name : contact[col.key]) || "";
                }
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