const path = require("path");

module.exports = function(app) {
    // Use this route to return to the index.html page
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../Develop/public/index.html"));
    });

    // Use this route to return to the exercise.html page
    app.get("/exercise", function(req, res) {
        res.sendFile(path.join(__dirname, "../Develop/public/exercise.html"));
    });
    
    // Use this route to return to the stats.html page
    app.get("/stats", function(req, res) {
        res.sendFile(path.join(__dirname, "../Develop/public/stats.html"));
    });
}