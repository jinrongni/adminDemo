var mongoose=require("mongoose");
var materializedPlugin=require("mongoose-materialized");
var CateSchema = new mongoose.Schema({ 
   type:Number,
   text:{type:String}
 });  
CateSchema.plugin(materializedPlugin);
module.exports= mongoose.model('Cate',  CateSchema);