var express = require('express');
var router = express.Router();
var User=require('../lib/User');
var Career=require('../lib/Career');
var FB = require('facebook-node');
FB.setApiVersion("v2.2");
FB.setAccessToken('EAACEdEose0cBAIYzGQI9VtZCFYcJfFOjuWmd24DtAEHZCtCO9ZC7ES5t6SgkBRxDLRljMJO4ZCOaZAfkCMGKp1gvWgzZBl383aR9X7AvLUhLRBiGrtNAh0Yx9eFThUkIYI4jz2KBzb1tDXeLNqwBHOhyMkzu7X7MmxHShneITPnf2dcT7M0xHVFd0ZCvhVigXsZD');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login',function(req,res){
 res.render('login');
});
router.post('/login',function(req,res){
  var username=req.body.username;
  var password=req.body.password;

User.findOne({username: username, password: password},function(err,user){
  if(err){
    console.log(err);
    return res.status(500).send();
  }
  if(!user){
    res.render('notfound');
      res.redirect('/login');
  }
  else{
  req.session.user=user;
  res.redirect('/dashboard');
  }
})
});
router.get('/dashboard', function(req,res){
  if(!req.session.user){
    res.redirect('/login');
  }
  res.render('welcome');
})
router.post('/career', function(req,res){
  var title=req.body.title;
  var technology=req.body.technology;
  var minexp=req.body.minexp;
  var maxexp= req.body.maxexp;
  console.log(req.body.technology);
  var description= req.body.description;
  var email= req.body.email;
  var city= req.body.city;
  var location= req.body.location;
  var newcareer=new Career();
  var post='job openings \n Designation: '+title.concat('\n experience: ',minexp,' to  ',maxexp,' years \n description: ',description,'\n email: ',email,'\n city: ',city,'\n location:',location);
  console.log(post);
  newcareer.title=title;
   newcareer.technology=technology;
   newcareer.minexp=minexp;
   newcareer.maxexp=maxexp;
   newcareer.description=description;
   newcareer.city=city;
   newcareer.location=location;
   newcareer.email=email;
   newcareer.save(function(err,savedCareer){
    if(err){
      console.log(err);
      return res.status(500).send();
    }
        var body = 'My first post using facebook-node';
   FB.api('me/feed', 'post', { message: post}, function (res) {
  if(!res || res.error) {
    console.log(!res ? 'error occurred' : res.error);
    return;
  }
  console.log('Post Id: ' + res.id);
});
    return res.status(200).send();

  })
})
router.post('/register', function(req,res){
  var username=req.body.username;
  var password=req.body.password;
  var firstname=req.body.firstname;
  var lastname= req.body.lastname;
  var newuser=new User();
  newuser.username=username;
  newuser.password=password;
  newuser.firstname=firstname;
  newuser.lastname=lastname;
  newuser.save(function(err,savedUser){
    if(err){
      console.log(err);
      return res.status(500).send();
    }
    return res.status(200).send();
  })
})
module.exports = router;
