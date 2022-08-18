'use strict';
// Database
var userModel = require('../models/user.model');
var contactModel = require('../models/contact.model');
var jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config().parsed;


exports.getAllContacts = async(req, res) => {
    console.log("req.userId ------- \n ", req.userId)
    /* // These are with Promise based
    // userModel.findOne({_id: req.userId}).then(function(user){
    //     // Do something with the user
    //    // return res.send(200);
    // });
    
    // var query = {
    //     _userid: req.decoded._id
    // };
    // ContactModel.find(query, function (err, contacts) {
    //     if (err) {
    //         return res.status(500).send(err);
    //     }userId

    //     res.json(_result);
    // });
    */

    // These are with async- await
    let user = await userModel.findOne({_id: req.userId}, {_id: 1, username: 1,email: 1})
    try{user_id
        let connect = await contactModel.find({user_id: user._id})
        if(connect){
            res.status(200).send({
                status: true,
                message:'Contacts list.',
                data: connect
            });
        } else {
            res.status(200).send({
                status: false,
                message:'No Contacts found.',
                data: []
            });
        }
        
    } catch (err) {
        console.log(err);
        res.status(400).send({
            status: true,
            message:err,
            data: []
        }); 
    }
    
};
exports.getContactById = async(req, res) => {
    const id = req.params.id;
    console.log("req.query", req.params, req.userId)
    try{
        let connect = await contactModel.find({_id: id, user_id: req.userId})
        if(connect){
            res.status(200).send({
                status: true,
                message:'Contacts details.',
                data: connect
            });
        } else {
            res.status(200).send({
                status: false,
                message:'No Contacts found.',
                data: []
            });
        }
        
    } catch (err) {
        console.log(err);
        res.status(400).send({
            status: true,
            message:err,
            data: []
        }); 
    } 
};
exports.addContacts = async(req, res) => {
    console.log("req.userId------- \n ", req.userId)
    const userContact = new contactModel({  //req.body.archive
        title:req.body.title,
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        company:req.body.company,
        group:req.body.group,
        archive: false,
        user_id:req.userId
    });

    try{
        let contactData = await userContact.save();
        console.log("contactData------- \n ", contactData)
    } catch (err) {
        console.log(err);
    }

    res.status(200).send("Contacts add successfully.");
};
exports.updateContactById = (req, res) => {
    var query = {
        user_id: req.userId,
        _id: req.params.id
    };

    const updateContact = { 
        title:req.body.title,
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        company:req.body.company,
        group:req.body.group,
        archive: false
    };

    contactModel.findOneAndUpdate(query, { $set: updateContact }, { new: true },
        function (err, doc) {
            if (err) {
                return res.status(404).send(err);
            }
            res.status(200).send("updateContactById Content.");
    });
    
};
exports.deleteContactById = (req, res) => {
    var query = {
        user_id: req.userId,
        _id: req.params.id
    };

    contactModel.findOneAndRemove(query, function (err, doc) {
            if (err) {
                return res.status(404).send(err);
            }
            res.status(200).send("Resource deleted successfully.");
    }); 
};