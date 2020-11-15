import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import data from '../../Product/data'
import { VALIDATOR_REQUIRE } from '../../Shared/utils/validation';
import Input from '../components/Input'
import { useForm } from '../../Shared/hooks/form-hook.js';
import { AuthContext } from '../../Shared/context/auth-context';

const UpdateProfile=()=> {
    // const userId=useParams().userId;
    // var i,product;
    // const dataLength=data.products.length;
    // for(i=0;i<dataLength;i++){
    //     if(data.products[i].id == userId){
    //          product=data.products[i]
    //     }
    // }
const auth=useContext(AuthContext);
const [formState, inputHandler] = useForm(
        {
            updateEmail: {
                value: auth.email,
                isValid: false
            },
            updatePassword: {
                value: auth.password,
                isValid: false
            },
          
        },
       true
    );

const profileUpdateHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
}
    return (
        <div className="container mt-4">
         <div className="row">
            <div className="col-sm-4 col-md-4"></div>
            <div className="col -12 col-sm-4 col-md-4">
                <div className="card mt-5 mb-5 login-card">
                     <div className="card-body">
                        <form className="text-center p-5" action="#!" autoComplete="off" onSubmit={ profileUpdateHandler }>
                            <p className="h4 mb-4">Update Profile</p>
                            <Input element="input" type="email" id="updateEmail" className="form-control mb-2" placeholder="E-mail" 
                                 validators={[VALIDATOR_REQUIRE()]}
                                 onInput={inputHandler}
                                 errorText="Please enter the Email"
                                 initialValue={formState.inputs.updateEmail.value}
                                 initialValid={formState.inputs.updateEmail.isValid}
                            />
                            <Input element="input" type="password" id="updatePassword" className="form-control mb-2" placeholder="Password" 
                                 validators={[VALIDATOR_REQUIRE()]}
                                 onInput={inputHandler}
                                 errorText="Please enter the Password"
                                 initialValue={formState.inputs.updatePassword.value}
                                 initialValid={formState.inputs.updatePassword.isValid}
                            />
                            <hr />
                            <button className="btn my-4 btn-block" id="signup" type="submit" disabled={!formState.isValid}>Update</button>
                            <span style={{fontSize:14,color:"red"}}>Forgot Password ?</span><br />
                            <div style={{fontSize:14,color:"red"}}>Don't have account ? <span style={{color:"blue"}}>Sign-Up</span></div>
                        </form>
                     </div>
                </div>
            </div>
            <div className="col-sm-4 col-md-4"></div>
        </div>
    </div>
    )
}

export default UpdateProfile