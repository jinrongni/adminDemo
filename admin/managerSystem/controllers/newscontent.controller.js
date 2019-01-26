var mongoose = require("mongoose");
const NewsContent = require("../models/newscontent.model");
exports.create = function (req, res, next) {
    const newscontent = new NewsContent(req.body);
    newscontent.save().then(data => {
        res.json(data);
    });
};

exports.update = function (req, res, next) {
    const id = req.params.id
    NewsContent.findByIdAndUpdate(id, {
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
    NewsContent.remove({
        _id: {
            $in: ids
        }
    }, (err, data) => {
        res.json("delete success")
    })

};

exports.list = function (req, res, next) {
    var defferid = req.params.id;
    var page = req.body.page ? req.body.page : 1;
    var rows = req.body.rows ? req.body.rows : 5;
    var queryCondition = {};
    queryCondition = {
        deffer: new RegExp(defferid, "i")
    }

    NewsContent.paginate(queryCondition, {
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
    NewsContent.findById(id, (err, data) => {
        res.json(data)
    })
}