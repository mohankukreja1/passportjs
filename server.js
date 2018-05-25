const express=require('express');
const body_parser=require('body-parser');
const path=require('path');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const mongoose=require('mongoose');
const passport=require('passport');
const MongoStore=require('connect-mongo')(session); // allo us to save session in mongodb so when we refresh our page session is saved
const flash=require('express-flash');

var app=express();


mongoose.connect('mongodb://localhost/localpassport', function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Server successfully!');
    }
});

var user=require('./controllers/user');



app.set('view engine','ejs');
app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json());
app.use(cookieParser())
//app.use('/',express.static(path.join(__dirname,'public')));
//passport is initialized afte session is declared
app.use(session({
    secret:'mysecretsessionkey',
    resave:true,
    saveUninitialized:true,
    store: new MongoStore({mongooseConnection : mongoose.connection })
}));
app.use(flash());
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());
app.use( '/',user );
app.listen(3000,function () {
    console.log('server started');
}) ;