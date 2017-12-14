/**
 * Created by park on 12/27/2015.
 */
var Help = require("./helpers/helpers");

exports.plugin = function(app, environment) {
    var helpers = new Help(environment);

    app.get("/contact", helpers.isPrivate, function(req, res) {
        res.render("contact" , environment.getCoreUIData(req));
    });
};