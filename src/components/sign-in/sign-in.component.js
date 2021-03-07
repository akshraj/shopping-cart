import React,{useState} from 'react'

import './sign-in.styles.scss'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import {auth,signInWihGoogle} from '../../firebase/firebase.utils'

const SignIn = () => {
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await auth.signInWithEmailAndPassword(email,password)
            setEmail('')
            setPassword('')
        }catch(error){
            console.log(error)
        }
    }


    const handleChange  = (e) => {
        const {value, name} = e.target
        if(name === 'email'){
            setEmail(value)
        }else if(name==='password'){
            setPassword(value)
        }
    }

    return(
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput label='Email' handleChange={handleChange} name='email' type='email' value={email} required/>
                

                <FormInput label='Password' handleChange={handleChange} name='password' type='password' value={password} required />
                
                <div className='buttons'>
                    <CustomButton type='submit'>
                        Sign in
                    </CustomButton>
                    <CustomButton isGoogleSignIn onClick={signInWihGoogle}>
                        Sign in with google
                    </CustomButton>
                </div>
               
            </form>
        </div>
    )
}

export default SignIn