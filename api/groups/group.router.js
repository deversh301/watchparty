const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

const {
    create_group , update_url
  } = require("./group.controller");

router.post("/create_group", create_group);
router.post("/update_url", update_url);



module.exports = router;