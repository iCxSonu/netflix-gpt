import { signOut } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Header = () => {
    const navigate = useNavigate()
    //creating for photoUrl
    const user = useSelector(store => store.user)
    const handleClick = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/")
        }).catch((error) => {
            // An error happened.
            navigate("/error")
        });
    }
  

    return (
        
        <div className="absolute w-[1262px]  px-3 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
            <img className="h-[85px] w-45 " src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logo" />
            {user &&
                <div className="flex flex-wrap p-2 ">
                    <img className="w-12 h-12" alt="usericon" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwzo1nkPAp0Ci7tHdly8KL-vLsJj-C-fW2EA&usqp=CAU"} />
                    <button onClick={handleClick} className="font-semibold text-white bg-black ml-2 w-20 shadow-sm shadow-red-500 h-8 rounded-lg mt-2">Sign Out</button>
                </div>}
        </div>
        
    )
}

export default Header;