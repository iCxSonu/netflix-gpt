import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Browse from "./Browse"
import Login from "./Login"
import { useEffect } from "react"
// import Logout from "./Logout"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../Utils/firebase"
import { useDispatch } from "react-redux"
import { addUser, removeUser } from "../Utils/userSlice"
import Error from "./Error"

const Body = () => {

    // and then we will need a dispath hook
    //always write your hook at the top of the component

    const dispatch = useDispatch()

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login/>
        },
        {
            path: "/browse",
            element: <Browse/>
        },
        {
            path: "/error",
            element:<Error/>
        }
        
    ])

    // we will call it here onAuthStateChange using useeffect with empty dependency array bcoz we want it once

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName,photoURL } = user;
                dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL:photoURL }))
                // and when the user is signed in we will redirect to browse page
                //removing the navigate bcoz of error
                // navigate("/browse")
            } else {
                // User is signed out
                dispatch(removeUser()) // and this dont need any action bcoz it is null in the store
                // navigate("/")
            }
        });
    },[])
    return (

        <div>
            <RouterProvider router={appRouter}/>
        </div>
    )
}

export default Body