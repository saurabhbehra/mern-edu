const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:{type:String, required:true},
    image:{type:String,required:true},
    delPrice:{type:Number,required:true},
    price:{type:Number,required:true},
    language:{type:String,required:true},
    instructor:{type:String,required:true},
    courseContents:
    [
       {
            _id:mongoose.Schema.Types.ObjectId,
            subTitle:{type:String, required:true},
            subTitleWithVideo:
            [   {
                    subSubTitle:{type:String, required:true},
                    videoLink:{type:String, required:true},
                }
            ]
       }
    ]
});

module.exports =mongoose.model('Product',productSchema);