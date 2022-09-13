var express = require('express');
var router = express.Router();
let groups = require('../controller/group.controller');
router.post('/add_url',  groups.create_group);
router.get('/get_url/:id',  groups.get_group);
router.post('/add_members',  groups.add_members_in_group);
module.exports = router;