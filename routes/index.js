import * as express from "express";
import TimeController from "../controllers/time.controller";
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
	console.log(req.params);
	res.render("index", { title: "Express" });
});

router.get("/*", function(req, res, next) {
	TimeController.interpretTime(req.params[0]);
	res.render("index", { title: req.params });
});

module.exports = router;
