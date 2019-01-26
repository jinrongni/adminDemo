var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
var CommentSchema = new mongoose.Schema({
  newsid: String,
  name: String,
  content: String,
  date: {
    type: String,
    default: Date.now
  },

});
CommentSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Comment', CommentSchema);