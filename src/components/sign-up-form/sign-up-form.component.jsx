import { useState } from "react";
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '', 
};


const SignUpForm = () => {

    const [formFields,setFormFields] = useState(defaultFormFields);
    const {displayName,email,password,confirmPassword} = formFields;

    console.log(formFields);

    const resetFormFields = () => {

        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !=  confirmPassword) {
            alert ('password do not match');
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(
                email,
                password);

            await createUserDocumentFromAuth(user,{displayName});
            resetFormFields();

        } catch(error) {
            if (error.code === 'auth/email-already-in-use'){
                alert('Email already in use, use new emailid');
            }else {
            console.log('error logged in by the user:',error);
            }
        }

    }

    const handleChange = (event) => {
        const {name,value} = event.target;
        
        setFormFields({...formFields, [name]: value});
        
    };

    return (
        <div>
            <h1> SignUp with Email and Password </h1>
            <form onSubmit={handleSubmit}>

                <label>Display Name</label>
                <input type="text" required onChange={handleChange} 
                name="displayName" 
                value={displayName}/>

                <label>Email</label>
                <input  type="email" required onChange={handleChange} 
                name="email"
                value={email}/>

                <label>Password</label>
                <input  type="password" required onChange={handleChange} 
                name="password"
                value={password}/>

                <label>Confirm Password</label>
                <input  type="password" required onChange={handleChange} 
                name="confirmPassword"
                value={confirmPassword}/>

                <button type="submit" ></button>



            </form>


        </div>
    );
};


export default SignUpForm;