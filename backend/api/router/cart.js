const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth'); 

//IMPORT MODELS
const Cart = require('../models/cart');

//ADD TO CART ROUTE
router.post('/addToCart',checkAuth, (req, res) => {
    const id=req.userData.userId;
   // const id=req.body.user
    Cart.findOne({ user: id })
    .exec((error, cart) => {
        if(error) return res.status(400).json({ error });
        if(cart){
           
            const product = req.body.cartItems.product;
            const item = cart.cartItems.find(c => c.product == product);
            let condition, update;
            if(item){
               res.status(200).json({
                    message:'Course Exist in cart'
                })
                
            }else{
                condition = { user: id };
                update = {
                    "$push": {
                        "cartItems": req.body.cartItems
                    }
                };
                Cart.findOneAndUpdate(condition, update)
                .exec((error, _cart) => {
                    if(error) return res.status(400).json({ error });
                    if(_cart){
                        return res.status(201).json({ cart: _cart,message:'Course added to cart successfully' });
                    }
                })
            }
           
        }else{
            const cart = new Cart({
                user: id,
                cartItems: [req.body.cartItems]
            });
            cart.save((error, cart) => {
                if(error) return res.status(400).json({ error });
                if(cart){
                    return res.status(201).json({ cart,message:'Course added to cart successfully' });
                }
            });
        } 
    });

})  


//GET CART DATA
router.get('/getCartData',checkAuth, async(req, res) => {
    const id=req.userData.userId;
    await Cart.find({user:id})
    .populate('cartItems.product')
    .exec()
    .then(docs=>{
       if(docs){
           const response={
            product:docs.map(doc => {
                return{
                    id:doc._id,
                    userid:doc.user,
                    products:doc.cartItems
                }
            })
           }
         res.status(200).json(response)
        }
       else{
        res.status(200).json({msg:'Add item to continue'})
       }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
    
})


//DELETE CART ITEM
router.delete('/deleteItemById', checkAuth, (req, res) => {
    const id = req.userData.userId;
    const productId = req.body.proId;
    Cart.find({ user: id })
        .exec()
        .then(doc => {
            let cartLength = doc[0].cartItems.length
            if (cartLength == 1) {
                Cart.remove({ user: id })
                    .exec()
                    .then(data => {
                        res.status(200).json({
                            result: data,
                            msg: 'Deleted'
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        })
                    })
            }
            else {
                Cart.update(
                    {
                        'user': id
                    },
                    {
                        $pull: { "cartItems": { "product": productId } }
                    },
                    (err, result) => {
                        if (err) {
                            res.status(200).json({
                                err: err
                            })
                        }
                        else {
                            res.status(200).json({
                                result: result,
                                msg: 'Deleted'
                            })
                        }
                    })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

module.exports=router