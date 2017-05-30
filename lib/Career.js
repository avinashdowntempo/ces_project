var mongoose=require('mongoose');

var careerSchema=new mongoose.Schema({
    title:{type:String, unique:true},
    technology:[String],
    minexp:{ type: Number},
    maxexp:{ type: Number},
    description:{type:String},
    city:{type:String},
    location:{type:String},
    email:{type:String}
});
var Career= mongoose.model('career',careerSchema);
module.exports=Career;