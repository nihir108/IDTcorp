// const bookRoutes = require("./books");
const data = require('../data');
const locationData=data.location;
const express = require('express');
const router = express.Router();
require('dotenv').config();
var AWS = require('aws-sdk');


function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 const Middleware = (req, res, next) => {
    if (!req.session.ak) {
        req.session.ak=makeid(6);
    } else {
       // res.locals.testName =  req.session.userInfo.firstName+" "+ req.session.userInfo.lastName
       req.session.ak= req.session.ak;
    }
    next();
}

const constructorMethod = app => {
    app.get("/",Middleware,async(req, res) => {
        try 
        {
            console.log(req.session.ak) 
            // const rloc =await locationData.getAll();
            res.render("home",{ title:"Get location by IP address"});
        } 
        catch (e) 
        {
            res.status(500).json({e});
        }
    });
    app.get('/message/', (req, res) => {

        console.log("Message = " + req.query.Message);
        console.log("Number = " + req.query.Number);
        console.log("Subject = " + req.query.Subject);
        var params = {
            Message: req.query.Message,
            PhoneNumber: '+' + req.query.Number,
            MessageAttributes: {
                'AWS.SNS.SMS.SenderID': {
                    'DataType': 'String',
                    'StringValue': 'hello'
                }
            }
        };
    
        var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();
    
        publishTextPromise.then(
            function (data) {
                res.end(JSON.stringify({ MessageID: data.MessageId }));
            }).catch(
                function (err) {
                    res.end(JSON.stringify({ Error: err }));
                });
    
    });
    app.post("/location/", Middleware, async(req, res) => {
        try 
        {
           
            // console.log(req.session.ak);
            selectValuesArr = []
            
             const rloc =await locationData.getOne(req.session.ak)
             for(let i=0; i<rloc.length; i++) {
                selectValuesArr.push(i+1)
             }
            // console.log(selectValuesArr)
            res.render("location",{ title:"locations",res1: rloc, selectValues:selectValuesArr, displayCount: rloc.length+1});
        } 
        catch (e) 
        {
            res.status(500).json({e});
        }
    });
    app.get("/location/", Middleware, async(req, res) => {
      //  console.log("inside locations")
        try 
        {
            // console.log("bhbhbjb")
            // console.log(req.session.ak);
            // console.log("bhbhbjb44")
             const rloc =await locationData.getOne(req.session.ak)
             selectValues = []
             for(let i=0; i<rloc.length; i++) {
                selectValues.push(i+1)
             }
           //  console.log("printing selectvalues")
            // console.log(selectValues)
            res.render("location",{ title:"locations",res1: rloc, selectValues:selectValues});
        } 
        catch (e) 
        {
            res.status(500).json({e});
        }
    });
    app.get("/getnloc/:n", Middleware, async(req, res) => {
        try 
        {
            // console.log("bhbhbjb")
            // console.log(req.session.ak);
            // console.log("bhbhbjb44")
            selectValuesArr = []
             let rloc =await locationData.getOne(req.session.ak)
             for(let i=0; i<rloc.length; i++) {
                selectValuesArr.push(i+1)
             }
            rloc=rloc.slice(0, req.params.n);
            
            res.render("location",{ title:"locations",res1: rloc, selectValues: selectValuesArr, displayCount: req.params.n});
        } 
        catch (e) 
        {
            res.status(500).json({e});
        }
    });

    app.post("/", Middleware , async(req, res) => {
        try 
        {
          //  console.location(req.data);
            await locationData.postLocation(req.body.ip,req.body.latitude,req.body.longitude,req.body.city,req.session.ak);
            const rloc =await locationData.getOne(req.session.ak)
            res.json(rloc);
        } 
        catch (e) 
        {
            res.status(500).json({e});
        }
    });
    app.get("/getallloc",Middleware,async(req,res)=>{
        const rloc =await locationData.getOne(req.session.ak)
        res.json(rloc);
    })
  app.use("*", (req, res) => {
    res.status(404).render("error", { title:"error", error: "page not found"});
  });
};

module.exports = constructorMethod;






