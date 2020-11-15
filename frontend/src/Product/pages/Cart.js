import React,{ useContext,useEffect,useState,useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../Shared/context/auth-context'
import config from '../../config/config'
import CartCard from '../components/cartCard'
import Razorpay from '../components/razorpay'

//IMPORT IMAGE
import frontEnd from '../images/frontend.jpg'

//IMPORT FONT-AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons'


//IMPORT CSS
import './cart.css'

//IMPORT FONT-AWESOME
const deleteIcon = <FontAwesomeIcon icon={faTrashAlt} size="2x" style={{color:"red"}}/>


const Cart = () => {
    //let path;
    const auth=useContext(AuthContext)
    const [initialProducts, setProducts]=useState()
    const [totalPrice, setTotalPrice]=useState(888)
    
    useEffect(()=>{
        const fetchProducts=async () =>{
            try{
                let response=await fetch(`${config.url}/cart/getCartData`,{
                    headers:{
                        'Authorization':'Bearer' + ' ' +  auth.token
                    }
                })
                let responseData=await response.json()
                let data=responseData.product.map(doc => doc.products)
                console.log(data)
                setProducts(data)
                
                //{setTotal(total+array.product.price)}
            }
            catch(err){}
        }
        fetchProducts()
    },[])

   const cartItemDeleteHandler = async (productId) =>{
    try{
        let response=await fetch(`${config.url}/cart/deleteItemById`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer' + ' ' +  auth.token
            },
            body:JSON.stringify({
               
                    proId:productId
            })
        })
        let responseData=await response.json()
        alert(responseData.msg)
        //setProducts(prev => prev.filter(data => data.product_id!==productId))
    }
    catch(err){}
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-12 col-sm-8 col-md-8">
                <div className="card cart-card">
                    <div className="card-body">
                        <div className="row">
                           <div className="col-4 col-sm-4 col-md-4">
                               <b>Product Details</b>
                           </div>
                           <div className="col-2 col-sm-2 col-md-2"></div>
                           <div className="col-3 col-sm-3 col-md-3">
                               <b>Price</b>
                           </div>
                           <div className="col-3 col-sm-3 col-md-3">
                               <b>Action</b>
                           </div>
                        </div>
                        <hr/>
                        {initialProducts && initialProducts.map(cart => cart.map(array=>
                            <div className="row">
                                <CartCard  header={array.product.title} image={`${config.url}/${array.product.image}`} delprice={"Rs" + array.product.delPrice} price={"Rs"+array.product.price} />
                                <div className="col-2 col-sm-2 col-md-2"></div>
                                <div className="col-3 col-sm-3 col-md-3">
                                     <b>Rs {array.product.price}</b>
                                </div>
                                <div className="col-3 col-sm-3 col-md-3">
                                    <span onClick={()=>cartItemDeleteHandler(array.product._id)} style={{cursor:"pointer"}}>{deleteIcon}</span>
                                </div>
                            </div>
                        )) }
                     </div>
                </div>
                </div>
                <div className="col-12 col-sm-4 col-md-4">
                    <div className="card cart-card">
                        <div className="card-body">
                        <b>Total Amount : Rs {totalPrice}</b>
                            <hr/>
                            <NavLink to ="/razorpay"><button type="button" className="btn float-right checkout">Checkout</button></NavLink>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
