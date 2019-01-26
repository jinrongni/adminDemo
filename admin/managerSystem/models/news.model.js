var mongoose=require("mongoose");
var materializedPlugin=require("mongoose-materialized");
var NewsSchema = new mongoose.Schema({ 
   type:Number,
   text:{type:String}
 });  
NewsSchema.plugin(materializedPlugin);
module.exports= mongoose.model('News',  NewsSchema);