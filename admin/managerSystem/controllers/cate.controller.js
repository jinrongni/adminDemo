var mongoose = require("mongoose");
const Cate = require("../models/cate.model");
exports.create = function (req, res, next) {
    const cate = new Cate(req.body);
    cate.save().then(data => {
        res.json(data);
    });
};

exports.update = function (req, res, next) {
    const id = req.params.id
    Cate.findByIdAndUpdate(id, {
        $set: req.body
    }, {
        new: false
    }).then(data => {
        res.json(data);
    })
};


exports.remove = function (req, res, next) {
    const id = req.params.id;
    removechidren(id);
    res.json("delele success");
};

function removechidren(aid) {
    Cate.findByIdAndRemove(aid, erro => {
        console.log(erro)
    });
    var conditions = {
        parentId: aid
    };
    Cate.find(conditions, function (error, data) {
        var len = data.length;

        for (var i = 0; i < len; i++) {
            removechidren(data[i]['_id']);
        }
    })
}




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
    Cate.find({
        type: type
    }, (err, data) => {
        var rpTree = reverseTree(data, null);
        res.json(rpTree);
    })
};
exports.getData = function (req, res, next) {
    const id = req.params.id
    Cate.findById(id, (err, data) => {
        res.json(data)
    })
}