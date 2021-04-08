const express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
const hbs = require('hbs');
const axios = require('axios');
var yargs = require('yargs');

var argv = yargs.help().argv


var app = express();


app.set('view engine', 'hbs');
// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

hbs.registerPartials(__dirname + '/views/partials');
 hbs.registerHelper('getTimeDate', ()=> {
     return new Date().getFullYear();
 })

 hbs.registerHelper('changeUpper', (data) => {
     return data.toUpperCase();
 })

 app.use((req,res,next) => {
     if(argv._[0] === 'maintain' )
     {
         res.render('maintain.hbs');

     }else
     {  
         //console.log(argv);
         next();
        
     }
 })
app.get('/',(req,res) => {
   res.render('index.hbs',{
       company : {
               name:'Agricultural Development bank',
              symbol:'adbl',
       },
   });
});

app.get('/company', (req,res) => {
     var url = 'https://nepse-data-api.herokuapp.com/data/todaysprice';
     axios.get(url).then((response)=> {
         //console.log('hello');
         //console.log(response);
          res.render('company.hbs',{
        
              response,
          })
     }).catch((er)=>{
            console.log(er.message);
     });
})

app.post('/company', (req,res) => {
    var url = 'https://nepse-data-api.herokuapp.com/data/todaysprice';
     axios.get(url).then((response)=> {
         //console.log('hello');
         //console.log(response);
          var company_data = response.data.filter((respo) => respo.companyName === req.body.company_name);
          console.log(company_data);
          res.render('singlecompany.hbs',{
            
              cdata:company_data[0],
          })
     }).catch((er)=>{
            console.log(er.message);
     });
})

//app.use(express.static('public'));

app.listen(5000);