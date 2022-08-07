import React,{ useState } from 'react'
import AuthInput from './AuthInput';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { signin, signup } from '../../actions/auth';

import './styles.css'

const initialState = { UserName: '', EmailId:'', Password:'', confirmPassword:'' };

const SignInUp = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignIn){
            dispatch(signin(formData, history));
        }
        else
        dispatch(signup(formData, history));

        console.log('success');
    }
    
    return (
        <div id='Auth' className='Auth'>
            <div className="Auth-container">
                <h2>{isSignIn ? 'Sign In' : 'Sign Up'}</h2>
                <form className='auth-form' onSubmit={handleSubmit}>
                    <AuthInput name='UserName' label='Username' inputType='text' show={false} handleChange={handleChange} autoFocus/>
                { (!isSignIn) && (<AuthInput name='EmailId' label='Email Id' inputType='text' show={false} handleChange={handleChange}/>)}
                    <AuthInput name='Password' label='Password' inputType='password' show={true} handleChange={handleChange}/>
                    { (!isSignIn) && (<AuthInput name='confirmPassword' label='Re-enter Password' inputType='password' show={true} handleChange={handleChange}/>)}
                    <input type="submit" />
                </form>
                <h5 onClick={() => setIsSignIn(!isSignIn)}>{ isSignIn ? 'Do not have an account ? Sign Up' : 'Already have an account ? Sign In'}</h5>
            </div>
        </div>
    )
}

export default SignInUp
