var mongoose = require("mongoose");
const User = require("../models/users.model");
exports.create = function (req, res, next) {
    const user = new User(req.body);
    user.save().then(data => {
        res.json(data);
    });
};

exports.update = function (req, res, next) {
    const id = req.params.id
    User.findByIdAndUpdate(id, {
        $set: req.body
    }, {
        new: false
    }).then(data => {
        res.json(data);
    })
};

exports.remove = function (req, res, next) {
    const id = req.params.id;
    console.log(id)
    var ids = id.split(",")
    User.remove({
        _id: {
            $in: ids
        }
    }, (err, data) => {
        res.json("delete success")
    })
 
};

exports.list = function (req, res, next) {
console.log(req.body)
    var page = req.body.page ? req.body.page : 1;
    var rows = req.body.rows ? req.body.rows : 5;
    var queryCondition = {};
    if (req.body.name && req.body.name.trim().length > 0) {
        name = req.body.name;
        queryCondition = {
            name: new RegExp(name, "i")
        }
    }
    User.paginate(queryCondition, {
        page: +page,
        limit: +rows
    }, function (err, result) {
        result.rows = result.docs;
        delete result.docs;
        res.json(result)
    })
};
exports.getData = function (req, res, next) {
    const id = req.params.id
    User.findById(id, (err, data) => {
        res.json(data)
    })
}