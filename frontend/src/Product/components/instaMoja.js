import React,{ useContext } from 'react'
import paidCourse from '../../onSuccesspaymnet/pages/PaidCourse';
import { AuthContext } from '../..//Shared/context/auth-context'; 
import axios from 'axios';


const InstMoja = () => {
    const auth=useContext(AuthContext)
    console.log(auth.name)
    const pay =() =>{
        const data = 
        {
                purpose: 'Course Payment',
                amount: '200',
                buyer_name: auth.name,
                email: auth.email,
                phone: '9960119040',
                user_id: auth.userId,
                redirect_url: `http://localhost:5000/callback?user_id:${auth.userId}`,
                webhook_url: '/webhook/',
        };

        // fetch('http://localhost:5000/payment', {
        //     method:'POST',
        //     headers:{
        //         'Content-Type':'application/json'
        //     },
        //     body:JSON.stringify(data)
        // })
        // .then(res=>{
        //  console.log(res.body);
        // })
        // .catch( ( error ) => console.log( error.response.data ) );
        
        axios.post( 'http://localhost:5000/payment', data )
			  .then( res => {
			  	console.log( 'resp', res.data );
          window.location.href = res.data;
        })
			  .catch( ( error ) => console.log( error.response.data ) );

	
    }
   
 
    
    return (
    <div className="mt-5">
      <button onClick={pay}>Pay</button> 
    </div>
      
    )
}

export default InstMoja