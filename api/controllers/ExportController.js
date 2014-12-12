/**
 * ContactController
 *
 * @description :: Server-side logic for managing contacts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var booleanColumns = ["adherent", "benevole", "donor"];
module.exports = {
    exportExcel: function (req, res) {
        var columns = req.query.col;
        if (columns && !Array.isArray(columns)){
            columns = [columns];
        }
        
        var searchQuery = {};
        for (var paramName in req.query){
            if (paramName != "col"){
                if (booleanColumns.indexOf(paramName) != -1){
                    searchQuery[paramName] = (req.query[paramName] == "true");
                } else {
                    searchQuery[paramName] = req.query[paramName];
                }
            }
        }
        Contact.find(searchQuery).exec(function (err, contacts) {
            ExcelService.generateExcel({
                contacts: contacts,
                columns: columns
            }, res);
        });
    },
   
};