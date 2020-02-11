const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

const settings=require('./settings.json');
const session=require('express-session');
const MongoStore=require('connect-mongo')(session);
const bcrypt=require('bcrypt');

module.exports=class Server{
  constructor(){
    this.start();
  }
  async start(){
    console.log(await this.connectToDb());
    await this.startWebServer();
  }

  connectToDb(){
    return new Promise((resolve,reject)=>{
      let dbName='tradera'
      mongoose.connect(`mongodb://localhost/${dbName}`);
      global.passwordSalt=settings.passwordSalt;
      global.db=mongoose.connection;
      db.on('error',()=>reject('can NOT connect to db'));
      db.once('open',()=>resolve('connected to db'));
    });
  }

  startWebServer(){
    const app=express();
    app.use(bodyParser.json());
    //app.use(express.static('www'));
    app.use(session({
      secret: settings.cookieSecret,
      resave: true,
      saveUninitialized: true,
      store: new MongoStore({ mongooseConnection: db })
    }));

    const users = require( './models/User.js' );
    const products = require( './models/Product.js' );

    //----------- USERS ROUTES----------//
    // Get users
    app.get( '/json/users/', async( req, res ) => {
      res.json( await users.find() );
    });

    // Post user
    app.post( '/json/users/', async( req, res ) => {
      let instance = new users(req.body);
      let result = await instance.save();
      res.json(result);
    });

    // Login 
    app.post( '/json/login/', async( req, res ) => {
      let user = await users.findOne({ email: req.body.email });
      if(!user){
        res.json({ error: 'No such user !' });
        return;
      }    
      let passwordCheck = await bcrypt.compare( req.body.password + passwordSalt, user.password );
      if(!passwordCheck){
        res.json({ error: 'The password does not match!' });
        return;
      }    
      req.session.user = user;
      req.session.save();
      res.json({ loggedIn: true });   
    });

    // Check if logged in
    app.get( '/json/login', async( req, res ) => {
      if(!req.session.user){
        res.json({ error: 'Not logged in!' });
        return;
      }
      res.json( req.session.user );
    });

    // Logout
    app.delete( '/json/login/*' , (req, res) => {
      delete req.session.user;
      req.session.save();
      res.json({ loggedOut: true });
    });

    //-------------PRODUCT ROUTES-----------//

    // Get all products
    app.get( '/json/products/', async( req, res ) => {
      res.json( await products.find() );
    });


    app.listen(3001,()=>console.log('listening on port 3001'));

  }

}

