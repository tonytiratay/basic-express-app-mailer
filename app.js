var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodeMailer = require('nodemailer');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/', function(req, res){
  res.render('index', {title: 'Welcome to your basic Express tutorial'});
});
app.get('/about', function(req, res){
  res.render('about');
});
app.get('/contact', function(req, res){
  res.render('contact');
});

app.post('/contact/send', function(req, res){
  var transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'ttiratay@simplon.co',
      pass: 't132435TT'
    }
  });
  var mailsOptions = {
    from: 'Tony Tiratay <tony.tiratay@gmail.com>',
    to: 'tony.tiratay@gmail.com',
    subject: 'Test Basic Express',
    text: 'You have a submission with these: name: '+ req.body.name + ', email: ' + req.body.email + ', message: ' + req.body.message,
    html: '<p>You have a submission with these: </p><ul><li>Name: '+ req.body.name + '</li><li>Email: ' + req.body.email + '</li><li>Message: ' + req.body.message + '</li></ul>'
  };
  transporter.sendMail(mailsOptions, function(err, info){
    if(err){
      console.log(err);
      res.redirect('/');
    } else {
      console.log('message envoyé '+ info.response);
      res.redirect('/');
    }
  });
});

app.listen('3000');

console.log("Server running");
