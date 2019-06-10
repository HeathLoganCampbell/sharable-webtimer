import express from "express";
var router = express.Router();

router.get("/", function (req, res, next) {

	console.log(req.params[0])

	res.render("index");
});


module.exports = router;
