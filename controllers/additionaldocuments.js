const Additionaldocuments = require('../models/additionaldocuments')
const User = require('../models/users')
const {validationResult} = require('express-validator')

exports.getadditionaldocuments= async(req,res,next)=>{
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Additionaldocuments.find().countDocuments()
     const data = await Additionaldocuments.find().skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Additional documents form docs`,
         data:data,
         totalItems:totalItems
     })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    } 
}

exports.getAdditionaldocumentsById = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const result= await Additionaldocuments.findById(AgesId)
        if(!result){
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message:`ma'lumotlar topildi`,
            result:result
        })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    }
}

exports.createAdditionaldocuments = async(req,res,next)=>{
    const name = req.body.name
    const url= req.body.url
    const result = new Additionaldocuments({
        name:name,
        url:url,
        creatorId: req.userId
    })
    const results = await result.save()
    res.status(200).json({
        message:`ma'lumotlar kiritildi`,
        results: results,
        creatorId: req.userId,
    })
}

exports.updateAdditionaldocuments = async(req,res,next)=>{ 
    const AgesId = req.params.id
    const name = req.body.name
    const url = req.body.url
    try {
    const result = await Additionaldocuments.findById(AgesId)
    if(!result){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    result.name= name
    result.url=url
    const data =await result.save()  
    res.status(200).json({
        message:`ma'lumotlar o'zgartirildi`,
        resultorder: data
    })
    } catch (err) {
        if(!err.statusCode){
            const error = new Error('Intenall error11111')
            error.statusCode = 500
            throw error
        }
        next(err)
    }
}

exports.deleteAdditionaldocuments = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const deleteddata = await Additionaldocuments.findById(AgesId)
    if(!deleteddata){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    if(deleteddata.creatorId.toString()!==req.userId){
        const error = new Error('bu userni ochirishga imkoni yoq')
        error.statusCode =403
        throw error
    }
    const data=await Additionaldocuments.findByIdAndRemove(AgesId)
    res.status(200).json({
        message:'Region is deletes',
        data:data   
    })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode =500
        }
        next(err)
    }
}