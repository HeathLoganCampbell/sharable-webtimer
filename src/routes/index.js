import express from "express";
import TimeController from "../parser/time";
var router = express.Router();

/* GET home page. */
router.get(/^\/(\d?\d[ywdhms]+)$/, function (req, res, next) {
	//[ywdhms]
	//y w d h m s

	// TimeController

	res.render("index", { title: "timer", seconds: "1000" });
});

// router.get("/", function (req, res, next) {
// 	TimeController.interpretTime(req.params[0]);
// 	res.render("index", { title: "welp  fuck" });
// });
//
//The user types "./4h20m"
//the site starts couting down from there

module.exports = router;
