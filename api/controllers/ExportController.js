/**
 * ContactController
 *
 * @description :: Server-side logic for managing contacts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var iconv = require('iconv-lite');
var fs = require('fs');
var booleanColumns = ["adherent", "benevole", "donor"];

 function getAllTypes(callback){
    Type.find().exec(function(err, types){
        callback(types);
    });
}
 function getAllGenres(callback){
    Genre.find().exec(function(err, genres){
        callback(genres);
    });
}
 function getAllHelps(callback){
    Help.find().exec(function(err, helps){
        callback(helps);
    });
}
 function getAllDiverse1s(callback){
    Diverse1.find().exec(function(err, diverses){
        callback(diverses);
    });
}
 function getAllDiverse2s(callback){
    Diverse2.find().exec(function(err, diverse2s){
        callback(diverse2s);
    });
}

module.exports = {
    exportExcel: function (req, res) {
        var columns = req.query.col;
        if (columns && !Array.isArray(columns)) {
            columns = [columns];
        }

        var searchQuery = {};
        for (var paramName in req.query) {
            if (paramName != "col") {
                if (booleanColumns.indexOf(paramName) != -1) {
                    searchQuery[paramName] = (req.query[paramName] == "true");
                } else {
                    searchQuery[paramName] = req.query[paramName];
                }
            }
        }
        Contact.find(searchQuery)
            .populate('type')
            .populate('genre')
            .populate('help')
            .populate('diverse1')
            .populate('diverse2')
            .exec(function (err, contacts) {

                ExcelService.generateExcel({
                    contacts: contacts,
                    columns: columns
                }, res);
            });
    },
    importExcel: function (req, res) {
        console.log(req.file('csvFile'));
        req.file('csvFile').upload({}, function done(err, uploadedFiles){
            var uploadedFile = uploadedFiles[0];
            var data = fs.readFileSync(uploadedFile.fd);
            var buf = new Buffer(data, 'binary');
            var translated = iconv.decode(buf, "win1250")
            ExcelService.parseExcel({
                csv: translated
            }, function(newContacts){
                getAllTypes(function(types){
                    getAllGenres(function(genres){
                        getAllHelps(function(helps){
                            getAllDiverse1s(function(diverse1s){
                                getAllDiverse2s(function(diverse2s){
                                    addNewContacts({type: types, genre: genres, help: helps, diverse1: diverse1s, diverse2: diverse2s});                                    
                                });
                            });                      
                        });
                    });
                });
                
                function addNewContacts(dependencies){
                    sails.log.debug(newContacts);
                    newContacts.forEach(function(newContact){
                        for (relKey in dependencies){
                            if (newContact[relKey]){
                                var possibles = dependencies[relKey].filter(function(object){
                                    return object.name == newContact[relKey];
                                });
                                if (possibles.length){
                                    newContact[relKey] = possibles[0].id;
                                } else {
                                    delete newContact[relKey];
                                }
                            }
                        }
                        
                        Contact.create(newContact).exec(function createCB(err,created){
                          console.log('Created contact '+created);
                          });
                    });
                    setTimeout(function(){
                        res.redirect("/");
                    }, newContacts.length*100) // I know, that's dirty, but common, I'm already late on the deliver...
                }
                
            });
        });
    }

};