var mongoose = require("mongoose");
const News = require("../models/news.model");
exports.create = function (req, res, next) {
    const news = new News(req.body);
    news.save().then(data => {
        res.json(data);
    });
};

exports.update = function (req, res, next) {
    const id = req.params.id
    News.findByIdAndUpdate(id, {
        $set: req.body
    }, {
        new: false
    }).then(data => {
        res.json(data);
    })
};

exports.remove = function (req, res, next) {
    const id = req.params.id;

    var conditions = {
        parentId: id
    };
    News.remove(conditions, function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log("用户删除成功")
        }
    });

    News.findByIdAndRemove(id, (err, data) => {
        res.json("delete success")
    })
};

function reverseTree(data, pid) {
    var result = [];
    var temp = null;
    var data = JSON.parse(JSON.stringify(data));

    for (var i in data) {
        if (data[i].parentId === pid) {
            result.push(data[i]);
            temp = reverseTree(data, data[i]._id);
            if (temp.length > 0) {
                data[i].children = temp;
            }
        }
    }
    return result;
}
exports.list = function (req, res, next) {
    var type = req.params.type || 1;
    News.find({
        type: type
    }, (err, data) => {
        var rpTree = reverseTree(data, null);
        res.json(rpTree);
    })
};
exports.getData = function (req, res, next) {
    const id = req.params.id
    News.findById(id, (err, data) => {
        res.json(data)
    })
}