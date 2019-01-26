var express = require('express');
var router = express.Router();
var dataCtrl=require("../controllers/users.controller")
/* GET users listing. */
router.post('/data',dataCtrl.create);
router.put('/data/:id',dataCtrl.update);
router.delete('/data/:id',dataCtrl.remove);
router.post('/list',dataCtrl.list);
router.get('/data/:id',dataCtrl.getData);
module.exports = router;
