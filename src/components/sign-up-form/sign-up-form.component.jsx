import { useState } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";

import './sign-up-form.styles.scss';

import Button from "../button/button.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const[formFields, setFormField] = useState(defaultFormFields);
    const {displayName,email,password,confirmPassword} =  formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormField(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword){
            alert('passwords do not matchs')
            return;
        }
        try {
            const {user} = await createAuthUserWithEmailAndPassword(
                email, 
                password
            );
            await createUserDocumentFromAuth (user, {displayName});
            resetFormFields();
        } catch(error) {
            if (error.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use')
            } else {
                console.error('User creation encounted', error)
            }
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormField({...formFields, [name]: value})
    }

    return (
        <div className="sign-up-container">
            <h2>Do you have a account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Display Name"
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name="displayName"
                    value={displayName}
                />
                <FormInput 
                    label="Email"
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email"
                    value={email}
                />
                <FormInput 
                    label="Password"
                    type="password" 
                    required 
                    onChange={handleChange}
                    name="password"
                    value={password}
                />
                <FormInput 
                    label="Confirm Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="confirmPassword"
                    value={confirmPassword}
                />

                <Button 
                type="submit"
                buttonType={'google'}
                >
                    Sign up
                </Button>
            </form>
        </div>
    )
}

export default SignUpForm;