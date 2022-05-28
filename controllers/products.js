const Products = require('../models/products')
const {validationResult} = require('express-validator')

exports.getProducts= async(req,res,next)=>{
    const page = req.query.page ||1   
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
        totalItems = await Products.find().countDocuments()
        const risks = await Products.find().skip((page-1)*counts).limit(counts)
         res.status(200).json({
         message:`Risks list`,
         risk:risks,
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

exports.getProductsId =async(req,res,next)=>{
    const riskId= req.params.id
    try {
        const typeofrisk= await Products.findById(riskId)
        if(!typeofrisk){
            err.statusCode =404
        }
        res.status(200).json({
            message:`Risks list`,
            typeofrisk:typeofrisk
        })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    }
}

exports.createProducts= async (req,res,next)=>{      
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('Validation error')
        error.statusCode = 422
        throw error
        }
    const name = req.body.name     
    const typeofrisksId = req.body.typeofrisksId 
    const group =new Products({
        name: name,
        typeofrisksId:typeofrisksId,
        creatorId: req.userId
    })
    const groups = await group.save()
    res.status(201).json({
        message:`Risk added`,
        typeofrisk: groups,
        creatorId:req.userId
    })
}

exports.updateProducts =async(req,res,next)=>{
    const typeofriskId= req.params.id
    const name = req.body.name   
    const typeofrisksId = req.body.typeofrisksId     
    try {
    const groups = await Products.findById(typeofriskId)
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
        typeofrisk: typeofrisk
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

exports.deleteProducts = async(req,res,next)=>{
    const typeofrisksId= req.params.id
    try {
        const deleteddata = await Products.findById(typeofrisksId)
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
    const data=await Products.findByIdAndRemove(typeofrisksId)     
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

