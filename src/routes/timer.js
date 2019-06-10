import express from "express";
var router = express.Router();

var timeType = [
    {
        name: "year",
        symbol: "y",
        toSeconds: 31536000
    },
    {
        name: "week",
        symbol: "w",
        toSeconds: 604800
    },
    {
        name: "day",
        symbol: "d",
        toSeconds: 86400
    },
    {
        name: "hour",
        symbol: "h",
        toSeconds: 3600
    },
    {
        name: "minutes",
        symbol: "m",
        toSeconds: 60
    },
];

/* GET home page. */
router.get(/^\/(\d?\d[ywdhms]+)$/, function (req, res, next) {

    var seconds = 10;
    for (var i = 0; i < timeType.length; i++) {
        var type = timeType[i];
    }

    console.log(req.params[0])

    res.render("timer", { seconds: seconds });
});

module.exports = router;