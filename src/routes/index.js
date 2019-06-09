import express from "express";
import TimeController from "../parser/time";
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
	//[ywdhms]
	//y w d h m s

	var seconds = 0;
	for (var i = 0; i < timeType.length; i++) {
		var type = timeType[i];
		// if(req.params[0])
		// seconds += type.toSeconds * 10;
	}

	console.log(req.params[0])
	// TimeController

	res.render("clock", { title: "timer", seconds: seconds });
});

router.get("/", function (req, res, next) {
	//[ywdhms]
	//y w d h m s

	var seconds = 0;
	for (var i = 0; i < timeType.length; i++) {
		var type = timeType[i];
		// if(req.params[0])
		// seconds += type.toSeconds * 10;
	}

	console.log(req.params[0])
	// TimeController

	res.render("index");
});

// router.get("/", function (req, res, next) {
// 	TimeController.interpretTime(req.params[0]);
// 	res.render("index", { title: "welp  fuck" });
// });
//
//The user types "./4h20m"
//the site starts couting down from there

module.exports = router;
