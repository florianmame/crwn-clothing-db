import { useState } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";

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
        <div>
            <h1>Sign up with your email and password</h1>
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

                <button type="submit">Sign up</button>
            </form>
        </div>
    )
}

export default SignUpForm;