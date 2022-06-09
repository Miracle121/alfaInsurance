const Risks = require('../models/risks')
const {validationResult} = require('express-validator')

exports.getRisks= async(req,res,next)=>{
    const page = req.query.page ||1   
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
        totalItems = await Risks.find().countDocuments()
        const risks = await Risks.find().skip((page-1)*counts).limit(counts)
         res.status(200).json({
         message:`Risks list`,
         data:risks,
         totalItems:totalItems
     })
    } 
    catch (err)
     {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    } 
}

exports.getRisksId =async(req,res,next)=>{
    const riskId= req.params.id
    try {
        const typeofrisk= await Risks.findById(riskId)
        if(!typeofrisk){
            err.statusCode =404
        }
        res.status(200).json({
            message:`Risks list`,
            data:typeofrisk
        })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    }
}

exports.createRisks= async (req,res,next)=>{      
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('Validation error')
        error.statusCode = 422
        throw error
        }
    const name = req.body.name     
    const typeofrisksId = req.body.typeofrisksId 
    const group =new Risks({
        name: name,
        typeofrisksId:typeofrisksId,
        creatorId: req.userId
    })
    const groups = await group.save()
    res.status(201).json({
        message:`Risk added`,
        data: groups,
        creatorId:req.userId
    })
}

exports.updateRisks =async(req,res,next)=>{
    const typeofriskId= req.params.id
    const name = req.body.name   
    const typeofrisksId = req.body.typeofrisksId     
    try {
    const groups = await Risks.findById(typeofriskId)
    if(!groups){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    groups.name= name  
    groups.typeofrisksId=typeofrisksId
    const typeofrisk = await groups.save()
    res.status(200).json({
        message:`Risks is changed`,
        data: typeofrisk
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

exports.deleteRisks = async(req,res,next)=>{
    const typeofrisksId= req.params.id
    try {
        const deleteddata = await Risks.findById(typeofrisksId)
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
    const data=await Risks.findByIdAndRemove(typeofrisksId)     
    res.status(200).json({
        message:'Risks is deleted',
        data:data
    })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode =500
        }
        next(err)
    }
}

