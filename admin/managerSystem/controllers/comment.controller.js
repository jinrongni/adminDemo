var mongoose = require("mongoose");
const Comment = require("../models/comment.model");
exports.create = function (req, res, next) {
    const comment = new Comment(req.body);
    comment.save().then(data => {
        res.json(data);
    });
};

exports.update = function (req, res, next) {
    const id = req.params.id
    Comment.findByIdAndUpdate(id, {
        $set: req.body
    }, {
        new: false
    }).then(data => {
        res.json(data);
    })
};

exports.remove = function (req, res, next) {
    const id = req.params.id;
    var ids = id.split(",")
   Comment.remove({
        _id: {
            $in: ids
        }
    }, (err, data) => {
        res.json("delete success")
    })

};

exports.list = function (req, res, next) {
    var newsids = req.params.id;
    var page = req.body.page ? req.body.page : 1;
    var rows = req.body.rows ? req.body.rows : 5;

    var queryCondition = {};
    if (newsids == "all") {
        queryCondition = {}
    } else {
        if (newsids.indexOf("search") !== -1) {
            var len = newsids.length;
            newsids = newsids.substring(6, len);
            queryCondition = {
                name: new RegExp(newsids, "i"),
            }
        } else {
            queryCondition = {
                newsid: new RegExp(newsids, "i"),
            }
        }
    }
    Comment.paginate(queryCondition, {
        page: +page,
        limit: +rows
    }, function (err, result) {
        result.rows = result.docs;
        delete result.docs;
        res.json(result);
    })
};
exports.getData = function (req, res, next) {
    const id = req.params.id
    Comment.findById(id, (err, data) => {
        res.json(data)
    })
}