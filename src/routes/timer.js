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
    {
        name: "seconds",
        symbol: "s",
        toSeconds: 1
    },
];

/* GET home page. */
router.get(/^\/(\d?\d[ywdhms])+$/, function (req, res, next) {


    var requestString = req.originalUrl.substring(1);
    var seconds = 0;

    for (var i = 0; i < timeType.length; i++) {
        var type = timeType[i];
        var amount = 0;
        var re = new RegExp('(\\d)+' + type.symbol, 'gi');
        var matches = [...requestString.matchAll(re)];
        if (matches === undefined || matches === null) continue;

        for (var j = 0; j < matches.length; j++) {
            var amount = parseInt(matches[j][0]);
            if (amount !== NaN)
                seconds += type.toSeconds * amount;
        }

    }

    res.render("timer", { seconds: seconds });
});


//ployfill
String.prototype.matchAll = function (regexp) {
    var matches = [];
    this.replace(regexp, function () {
        var arr = ([]).slice.call(arguments, 0);
        var extras = arr.splice(-2);
        arr.index = extras[0];
        arr.input = extras[1];
        matches.push(arr);
    });
    return matches.length ? matches : null;
};

module.exports = router;