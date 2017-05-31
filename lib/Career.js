var mongoose=require('mongoose');

var careerSchema=new mongoose.Schema({
    title:{type:String},
    technology:[String],
    minexp:{ type: Number},
    maxexp:{ type: Number},
    description:{type:String, unique:true},
    city:{type:String},
    location:{type:String},
    email:{type:String}
});
var Career= mongoose.model('career',careerSchema);
module.exports=Career;