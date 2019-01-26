var mongoose = require("mongoose");
var mongoosePaginate=require("mongoose-paginate");
var NewsContentSchema = new mongoose.Schema({
  deffer:String,
  title: String,
  content: {
    type: String
  },
  date: {
    type: String,
    default: Date.now
  },
});
NewsContentSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('NewsContent', NewsContentSchema);