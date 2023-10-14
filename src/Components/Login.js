import { useRef, useState } from "react";
import Header from "./Header";
import { CheckValidate } from "../Utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../Utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";


const Login = () => {

    //creating navigate hook for redirecting
    const navigate = useNavigate()

    const [isSignInForm, setIsSignUpForm] = useState(true)

    const toggleSignInFrom = (() => {
        setIsSignUpForm(!isSignInForm)
    })
    // For error message
    const [errorMessage, seterrorMessage] = useState()

    // dispatching for fixing the error
    const dispatch = useDispatch()



    // creating useref for the input box
    const email = useRef(null)
    const password = useRef(null)
    const name = useRef(null)
    // creating for the name value
    // const name = useRef(null)

    const handleButtonClick = () => {
        console.log(email.current.value)
        console.log(password.current.value)
        // console.log(name)

        const message = CheckValidate(email.current.value, password.current.value)
        console.log(message)
        seterrorMessage(message)
        if (message) return;

        if (!isSignInForm) {
            // for sign up 
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)

                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log(user)
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwzo1nkPAp0Ci7tHdly8KL-vLsJj-C-fW2EA&usqp=CAU"
                    }).then(() => {
                        // Profile updated!
                        // dispatch an action here bcoz of the error
                        const { uid, email, displayName, photoURL } = auth.currentUser;

                        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }))

                        navigate("/browse")
                    }).catch((error) => {
                        // An error occurred
                        seterrorMessage("Sorry, we can't find an account with this email address. Please try again or create a new account.")
                    });

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    seterrorMessage(errorCode + "-" + errorMessage)
                })
        }
        else {
            // sign in
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user)
                    navigate("/browse")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    seterrorMessage("Sorry, we can't find an account with this email address. Please try again or create a new account.")
                });
        }


    }

    return (
        <div>
            <Header />
            <div className="absolute ">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/9db4a880-3034-4e98-bdea-5d983e86bf52/b5953637-091d-4e02-9754-2bfadc8a8f7c/IN-en-20230925-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="logo" />

            </div>
            <form onSubmit={(e) => e.preventDefault()} className=" absolute p-12 bg-black w-4/12 mx-auto right-0 left-0 my-24 bg-opacity-80 rounded-md ">

                <h1 className="font-semibold text-3xl py-4 text-white">{isSignInForm ? "Sign In" : "Sign Up"}</h1>

                {!isSignInForm && (<input ref={name} type="text" placeholder="Full Name" className="p-4 my-4 w-full bg-zinc-800 rounded-md text-white " />)}  {/* It will only show when the sign in form is false */}


                <input ref={email} type="text" placeholder="Email or phone number" className="p-4 my-2 w-full bg-zinc-800 rounded-md text-white " />


                <input ref={password} type="password" placeholder="Password" className="p-4 my-3 w-full bg-zinc-800 rounded-md text-white" />

                <p className="text-red-600 font-bold text-md py-1">{errorMessage}</p>

                <button className="p-4 my-7 font-medium  bg-red-700 text-white w-full rounded-md" onClick={handleButtonClick}> {isSignInForm ? "Sign In" : "Sign Up"}</button>
                <h4 className="text-white cursor-pointer " onClick={toggleSignInFrom}>
                    {isSignInForm ? "New to Netflix? Sign Up Now." : "Already Registered? Sign In Now."}
                </h4>
                <h6 className="text-zinc-400 mt-3">This page is protected by Google reCAPTCHA to ensure you're not a bot.</h6>

            </form>
        </div>
    )
}

export default Login;