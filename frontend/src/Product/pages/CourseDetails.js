import React, { useEffect,useState,useContext } from 'react'
import { useParams} from 'react-router-dom'
import config from '../../config/config'
import { AuthContext } from '../../Shared/context/auth-context';

//IMPORT CSS
import './frontEnd.css'


const CourseDetails=()=> {
    const auth=useContext(AuthContext);
   // console.log(auth.userId)
    const [initialProducts, setProducts]=useState()
    const courseId=useParams().id;
    useEffect(()=>{
        const fetchProducts=async () =>{
            try{
                let response=await fetch(`${config.url}/product`)
                let responseData=await response.json()
                var i;
                const dataLength=responseData.products.length;
                for(i=0;i<dataLength;i++){
                    if(responseData.products[i]._id == courseId){
                        setProducts(responseData.products[i])
                    }
                }
                console.log(responseData)
            }
            catch(err){}
        }
        fetchProducts()
    },[])
  
  const cartHandler= async() => {
    const proId=initialProducts && initialProducts._id;
    const price=initialProducts && initialProducts.price;
    try{
    
            const response=await fetch(`${config.url}/cart/addToCart`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer'+ ' ' + auth.token
                },
                body:JSON.stringify({
                    cartItems:{
                        product:proId,
                        quantity:1,
                        price:price
                    }
                  
                })
            })
            const responseData=await response.json();
            if(!response.ok){
                throw new Error(responseData.message)
            }
            alert(responseData.message);
            console.log(responseData.message)
        }
        catch(err){
            alert(err)
            console.log(err)
        }
  }

    return (
     <div className="container-fluid mt-5 mb-5">
           <div className="row">
               <div className="col-12 col-sm-3 col-md-3">
                   <img src={initialProducts && `${config.url}/${initialProducts.image}`} alt='front' className="front-image" />
               </div>
               <div className="col-12 col-sm-4 col-md-4">
                   <h4><b> {initialProducts && initialProducts.title}</b></h4>
                   <em>Beginner to Advance.</em>
                   <br/>
                   <span style={{color:"green"}}>Life Time Access</span>
                   <br/>
                   <span>Language:{initialProducts && initialProducts.language}</span>
                   <br/>
                   <span>Instructor:{initialProducts && initialProducts.instructor}</span>
                   <br/> <br/>
                   <span className="front-price"><b>₹ {initialProducts && initialProducts.price}</b></span>
                   <br/> <br/>
                   <button type="button" className="btn btn-outline-success">PREVIEW</button>
                   <button type="button" 
                    className="btn btn-outline-success mx-5" 
                    onClick={cartHandler}
                    >ADD TO BAG</button>
                </div> 
                <div className="col-12 col-sm-4 col-md-4">
                    <div className="card front-card">
                        <div className="card-body">
                            <div className="table-responsive">
                                <label className-="text-center">Course Contents</label>
                                <table className="table">
                                    <tr className="table-active"><td>HTML</td></tr>
                                    <tr className="table-primary"><td>CSS And Bootstrap</td></tr>
                                    <tr className="table-secondary"><td>JavaScript</td></tr>
                                    <tr className="table-success"><td>Jquery And AJAX</td></tr>
                                    <tr className="table-danger"><td>React Basic</td></tr>
                                    <tr className="table-warning"><td>Frontend Project</td></tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </div>
    )
}

export default CourseDetails
