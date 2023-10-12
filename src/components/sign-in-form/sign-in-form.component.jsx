import { useState } from "react";

import { 
    createUserDocumentFromAuth, 
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";

import './sign-in-form.styles.scss';

import Button from "../button/button.component";

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const[formFields, setFormField] = useState(defaultFormFields);
    const {email,password} =  formFields;

    const resetFormFields = () => {
        setFormField(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(
                email, 
                password
            );
            console.log(response);
            resetFormFields();
        } catch(error) {
            switch (error.code) {
                case "auth/wrong-password":
                    alert("incorrect password for email");
   
                    break;
                case "auth/user-not-found":
                    alert("no user associated with this email");
   
                    break;
                default:
                    console.error(error);
                    break;
            }
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormField({...formFields, [name]: value})
    }

    return (
        <div className="sign-up-container">
            <h2>Already have a account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
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
                <div className="buttons-container">
                    <Button 
                       type="submit"
                    >
                        Sign In
                    </Button>
                    <Button 
                    type='button'
                    buttonType='google'
                    onClick={signInWithGoogle}
                    >
                    Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;