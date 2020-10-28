const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const multer=require('multer');
const uuid=require('uuid')
const AWS =require('aws-sdk')

//IMPORT MODELS
const Product=require('../models/product');

const s3=new AWS.S3({
    accessKeyId: "",
    secretAccessKey:""
})

const storage=multer.memoryStorage({
    destination:function(req,file,cb){
        cb(null,'');
    },
    // filename:function(req,file,cb){
    //     cb(null, Date.now() + file.originalname);
    // }
}); 

const upload = multer({storage:storage}).array('productImage'); 

//INSERT PRODUCT DETAILS 
router.post('/',upload,(req,res,next)=>{  
 let filName=req.file.originalname
 const params = {
      Bucket:"edu-startup",
      Key: Date.now() + `${filName}`,
      ContentType :'image/jpegw',
      Body:req.file.buffer,
      ACL:"public-read"
  }

  let location;
  s3.upload(params, (error, data) =>{
      if(error){
          res.status(500).json(error)
      }
      res.status(500).json(data)
  })
  
//   const product=new Product({            
//     _id:mongoose.Types.ObjectId(),
//     title:req.body.title,
//     image:location,
//     delPrice:req.body.delPrice,
//     price:req.body.price,
//     language:req.body.language,
//     instructor:req.body.instructor,
//     courseContent:[ 
//         {
//             _id:mongoose.Types.ObjectId(),
//             subTitle:req.body.subTitle,
//             subTitleWithVideo:[{
//                 subSubTitle:req.body.subSubTitle,
//                 videoLink:req.body.videoLink,
//             }]
//         }
//     ]
//     });
//     product.save()                       
//             .then(result=>{
//                 console.log(result);
//                 res.status(200).json({
//                     message:'created products successfully',
//                     createdProduct:product            
//                 });
//             })
//             .catch(err=>{
//                 console.log(err);
//                 res.status(500).json({
//                     error:err
//                 });                
//             })
})


//GET ALL PRODUCTS
router.get('/',(req,res,next)=>{
   Product.find()
    .exec()
    .then(docs=>{
        const response={
            count:docs.length,
            products:docs.map(doc=>{
                return{
                    _id:doc._id,
                    title:doc.title,
                    image:doc.image,
                    delPrice:doc.delPrice,
                    price:doc.price,
                    language:doc.language,
                    instructor:doc.instructor
                }
            })
        };
     res.status(200).json(response);
     })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

//GET PRODUCT BY ID
router.get('/:id',(req,res,next)=>{
    const id=req.params.id;
    Product.findById(id)
        .exec()
        .then(doc=>{
            console.log(doc); 
            if(doc){
                res.status(200).json({product:doc}); 
            }
            else{
                res.status(404).json({message:'No valid entry found for provided Id'});
            }
                 
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({error:err});
        });
});

module.exports=router;
