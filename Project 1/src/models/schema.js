const express=require("express");
const mongoose=require("mongoose");
const itemSchema=new mongoose.Schema({
    id:{
        type:Number
    },
    title:{
        type:String,
        required:true,
        trim:true,
    },
    stage:{
        type:Number
    }
})
const monmodel=new mongoose.model("items",itemSchema)
module.exports=monmodel;
