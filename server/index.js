var express = require('express');
var app = express();
const cors = require('cors');
const mongoose=require('mongoose');
const bodypraser=require('body-parser');
const bcrypt = require('bcryptjs');
const urlencodedParser = bodypraser.urlencoded( { extended : true}) ;
const jwt = require('jsonwebtoken');
const multer = require('multer');
const json = require("json");
require("dotenv").config();




const storage = multer.diskStorage(
    {
        destination:(req,file,cb)=>
        {
            cb(null,"./uploads")
        },
        filename:(req,file,cb)=>
        {
            cb(null,"RentalHousing"+Date.now()+"--"+file.originalname);
        }
    }
);

const upload = multer(
    {
        storage:storage
    }
);

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

app.use(cors());
app.use(express.json());

// connect to the Database
const url="mongodb://localhost:27017/RentalHousing";
mongoose.connect(url);

// To check whether the Database is connected Successfully
const con = mongoose.connection;
con.on('open',()=>{
    console.log("Connected to Database......!");
});

//Creating the schema for userDetails
const mongomodel = mongoose.Schema(
    {
    name:{
        type: String,
        required: true
    },

    emailid:{
        type:String,
        required:true
    },

    phonenumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
});

var userDetails = mongoose.model('userDetails',mongomodel);


// creating schema for propertyDetails

const mongomodelproperty = mongoose.Schema(
    {
    propertyid:
    {
        type:Number,
        required:true
    },
    emailid:{
        type:String,
        required:true
    },
    bhktype:{
        type: String,
        required: true
    },

    facing:{
        type:String,
        required:true
    },

    propertyAge:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    street:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    size:{
        type: String,
        required: true
    },
    cost:{
        type: String,
        required: true
    },

    deposit:{
        type:String,
        required:true
    },

    preferredTenant:{
        type:String,
        required:true
    },
    furnishing:{
        type:String,
        required:true
    },
    parkingFacility:{
        type: String,
        required: true
    },

    waterSupply:{
        type:String,
        required:true
    },

    nonvegAllowed:{
        type:String,
        required:true
    },
    latitude:{
        type:String,
        required:true
    },
    longitude:{
        type:String,
        required:true
    },
    pno:{
        type:String,
        required:true
    },
    uname:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
});

var propertyDetails = mongoose.model('propertyDetails',mongomodelproperty);


app.post("/userdata",urlencodedParser,cors(),async(req,res)=>
{
    var emailcheck = await userDetails.findOne( { emailid : req.body.email });
    if( emailcheck){
        return res.json({message:"Email id is already registered"});
    }
   var encrypt = await bcrypt.hash(req.body.pwd,10);

   const user = new userDetails({
    name: req.body.name,
    emailid : req.body.email,
    phonenumber: req.body.phone, 
    password: encrypt
});

   const data = user.save();
   res.send("Success");
   
});

function validuser(req,res,next){
    var user_token = localStorage.getItem('auth');
    try{
        jwt.verify(user_token,'@RentalHouseSearching152002');
        res.json({auth:true,message:"Authorization done"});
    }catch(err){
        res.json({auth:false,message:"Authorization Failed"})     
    }
    next();
}

app.get("/isUserAuth",validuser,(req,res)=>
{
});


app.post("/login",urlencodedParser,cors(),async(req,res)=>
{
    //check email
    var emailcheck = await userDetails.findOne( { emailid : req.body.email });

    if(!emailcheck){
        return res.json({message:"Email id not found"});    
    }else{
        //storing the emailid and pno in a .env file for the later access in propertyregistration....
    process.env.email = emailcheck.emailid;
    process.env.pno =   emailcheck.phonenumber;
    process.env.name = emailcheck.name;
    }
    //check password
    var pwd = await bcrypt.compare(req.body.pwd,emailcheck.password);
    if(!pwd){
        return res.json({message:"Invalid Password"}); 
    }
    var user_token = jwt.sign({email:emailcheck.emailid },'@RentalHouseSearching152002',{expiresIn:"24h"});
    localStorage.setItem('auth',user_token);
    res.send("success");

});


app.post("/propertyregistration",upload.single("image"),urlencodedParser,cors(),(req,res)=>
{
    const randnum = Math.floor(Math.random()*10000);
    console.log(randnum)
    const property = new propertyDetails({
        propertyid:randnum,
        emailid: process.env.email,
        bhktype : req.body.bhktype,
        facing: req.body.facing, 
        propertyAge: req.body.propertyAge,
        city:req.body.city,
        street: req.body.street,
        address:req.body.address,
        pincode:req.body.pincode,
        size:req.body.propertySize,
        cost : req.body.cost,
        deposit: req.body.deposit, 
        preferredTenant: req.body.preferredTenant,
        furnishing: req.body.furnishing,
        parkingFacility : req.body.parkingFacility,
        waterSupply: req.body.waterSupply, 
        nonvegAllowed: req.body.nonvegAllowed,
        latitude: req.body.latitude,
        longitude : req.body.longitude,
        pno : process.env.pno,
        uname:process.env.name,
        image: req.file.filename, 
    });

    const data = property.save();
    res.send("Success");
});


app.post("/search",urlencodedParser,cors(),async( req,res)=>
{
    const pd = await propertyDetails.find({city:req.body.city});
    res.json({message : pd});
});

//new module working......
app.post("/adminsearch",urlencodedParser,cors(),async( req,res)=>
{
    const pd = await propertyDetails.find();
    res.json({message : pd});
});


const adminschema = mongoose.Schema(
    {
    emailid:{
        type:String,
        required:true
    },
    pwd:{
        type:String,
        required:true
    }
});

var adminDetails = mongoose.model('adminDetails',adminschema);
adminDetails.save;

app.post("/adminlogin",urlencodedParser,cors(),async (req,res)=>
{
    try{
    var emailcheck = await adminDetails.findOne({$and:[{emailid : req.body.email},{pwd:req.body.pwd}]});
    console.log(emailcheck.emailid);
    res.json({auth:true});

    }catch(err){
        res.json({auth:false});
    }
});



const deleteproperty = mongoose.Schema(
    {
    propertyid:
    {
        type:Number,
        required:true
    },
    emailid:{
        type:String,
        required:true
    },
    bhktype:{
        type: String,
        required: true
    },

    facing:{
        type:String,
        required:true
    },

    propertyAge:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    street:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    size:{
        type: String,
        required: true
    },
    cost:{
        type: String,
        required: true
    },

    deposit:{
        type:String,
        required:true
    },

    preferredTenant:{
        type:String,
        required:true
    },
    furnishing:{
        type:String,
        required:true
    },
    parkingFacility:{
        type: String,
        required: true
    },

    waterSupply:{
        type:String,
        required:true
    },

    nonvegAllowed:{
        type:String,
        required:true
    },
    latitude:{
        type:String,
        required:true
    },
    longitude:{
        type:String,
        required:true
    },
    pno:{
        type:String,
        required:true
    },
    uname:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
});

var deletedpropertyDetails = mongoose.model('deletedpropertyDetails',deleteproperty);

app.post("/delete",urlencodedParser,cors(),async (req,res)=>
{
    const propdetails = await propertyDetails.findOne({propertyid : req.body.id});
    console.log(propdetails.emailid);
    const property = new deletedpropertyDetails({
        propertyid:propdetails.propertyid,
        emailid: propdetails.emailid,
        bhktype : propdetails.bhktype,
        facing: propdetails.facing, 
        propertyAge: propdetails.propertyAge,
        city:propdetails.city,
        street:propdetails.street,
        address:propdetails.address,
        pincode:propdetails.pincode,
        size:propdetails.size,
        cost : propdetails.cost,
        deposit: propdetails.deposit, 
        preferredTenant: propdetails.preferredTenant,
        furnishing: propdetails.furnishing,
        parkingFacility : propdetails.parkingFacility,
        waterSupply: propdetails.waterSupply, 
        nonvegAllowed: propdetails.nonvegAllowed,
        latitude: propdetails.latitude,
        longitude :propdetails.longitude,
        pno : propdetails.pno,
        uname:propdetails.uname,
        image: propdetails.image, 
    });
    const data = property.save();
    const deleteProperty = await propertyDetails.remove({propertyid : req.body.id});
});

app.listen(8080,()=>
{
    console.log("Server Started to Run on PORT 8080.....");
});