import React, { useState, useContext} from 'react'
import {  useHistory } from 'react-router-dom'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../../Shared/utils/validation';
import Input from '../components/Input'
import LoadingSpinner from '../../Shared/components/LoadingSpinner';
import { useForm } from '../../Shared/hooks/form-hook.js';
import { AuthContext } from '../../Shared/context/auth-context';
import config from '../../config/config'

//IMPORT IMAGE
import register from '../images/register.png'

//IMPORT CSS
import './register.css'

const Register = () => {
    const auth=useContext(AuthContext);
    let history=useHistory();
    const [isLoading ,setIsLoading]=useState(false);
    const [error ,setError]=useState();
    const [formState, inputHandler] = useForm(
        {
            name: {
                value: '',
                isValid: false
            },
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            },
            number: {
                value: '',
                isValid: false
            },
            state: {
                value: '',
                isValid: false
            },
            address: {
                value: '',
                isValid: false
            },

        },
        false
    );

const placeSubmitHandler = async event => {
    event.preventDefault();
    try{
        setIsLoading(true);
        const response=await fetch(`${config.url}/user/signup`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                fullname: formState.inputs.name.value,
                phone: formState.inputs.number.value,
                email: formState.inputs.email.value,
                password: formState.inputs.password.value,
                state: formState.inputs.state.value,
                address: formState.inputs.address.value
            })
        })
        const responseData=await response.json();
        if(!response.ok){
            throw new Error(responseData.error.message)
        }

        alert(responseData.message);
        console.log(responseData)
        history.push('/user-login') 
    }
    catch(err){
      alert(err)
      console.log(err)
      setError(err || 'Something went wrong, please try again.');
    }
    setIsLoading(false);
   // console.log(formState.inputs); // send this to the backend!
  
};

return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-sm-4 col-md-4 mt-5">
                <div className="d-none d-sm-block">
                    <img src={register} alt="register" className="register-image" />
                </div>
            </div>
            <div className="col-sm-2 col-md-2"></div>
            <div className="col-12 col-sm-4 col-md-4">
                <form className="text-center p-5" action="#!" autoComplete="off" onSubmit={placeSubmitHandler}>
                    <p className="h4 mb-4">Sign up</p>
                    <Input type="text" element="input" id="name" className="form-control mb-2" placeholder="Full Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        errorText="Please enter the name"
                    />
                    <Input type="email" element="input" id="email" className="form-control mb-2" placeholder="Email"
                        validators={[VALIDATOR_REQUIRE()], [VALIDATOR_EMAIL()]}
                        onInput={inputHandler}
                        errorText="Please enter the email"
                    />
                    <Input type="password" element="input" id="password" className="form-control mb-2" placeholder="Password"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        errorText="Please enter the password"
                    />

                    <Input type="text" element="input" id="number" className="form-control mb-2" placeholder="Phone number"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        errorText="Please enter the number"
                    />
                     <Input type="text" element="select" id="state" className="form-control mb-2" 
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        errorText="Please select the state"
                     />

                    <div className="form-group">
                        <Input element="textarea" className="form-control" id="address" placeholder="Enter your address..." rows="3"
                            validators={[VALIDATOR_REQUIRE()]}
                            onInput={inputHandler}
                            errorText="Please enter the address"
                        />
                    </div>
                    <button className="btn my-4 btn-block" id="signup" type="submit" disabled={!formState.isValid} onClick={auth.logout}>Sign Up </button>
                    <hr />
                    <p>By clicking&nbsp;
                       <em>Sign up</em> you agree to our &nbsp;
                       <a>terms of service .</a>
                    </p>
                </form>
            </div>
            <div className="col-sm-2 col-md-2"></div>            
        </div>
    </div>
    )
}
// {isLoading && <LoadingSpinner />}

export default Register
