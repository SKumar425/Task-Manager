import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn, setUserData } from "../store/authSlice";

const tasklist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userData = useSelector((state) => state.auth.userData);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(setIsLoggedIn(false));
        dispatch(setUserData({}));
        navigate("/");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  console.log(isLoggedIn, userData);

  return (
    <div>
      <h1>{userData?.name || "User"}</h1>
      <button
        onClick={handleLogout}
        className="w-[200px] h-[50px] bg-[#FF5733] rounded-[10px] text-[#fff] font-bold"
      >
        Logout
      </button>
    </div>
  );
};

export default tasklist;
