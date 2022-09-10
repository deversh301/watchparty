var express = require('express');
var router = express.Router();
router.get('/', function(req, res){
    try {
        res.render("home");
    } catch (error) {
        
    }
});
module.exports = router;