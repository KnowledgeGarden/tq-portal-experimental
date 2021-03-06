/**
 * Created by park on 11/26/2015.
 */
var Help = require("./helpers/helpers");

exports.plugin = function(app, environment) {
    var helpers = new Help(environment);
    /////////////////
    // Menu
    /////////////////
    environment.addApplicationToMenu("/geomap","GeoMap");

    /////////////////
    // router
    /////////////////
    app.get("/geomap", helpers.isPrivate, function geoMapGet(req, res) {
        var data = environment.getCoreUIData(req);
        //NOTE, we can create a GeoMap model to control map initialization;
        // here we hard wire some values
        data.x = "30.0";
        data.y = "5.0";
        data.z = "2"; //zoom smaller is further out
        return res.render("geomap", data);
    });

};