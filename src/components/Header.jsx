import React, { useState, useEffect } from "react";
import search from "../assets/icons/search.svg";
import notification from "../assets/icons/notification.svg";
import { FaHamburger, FaBars } from "react-icons/fa";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../utils/Firebase";

const Header = (props) => {
  const [username, setUsername] = useState("");
  //   let username;

  const getUsername = async () => {
    try {
      const uid = sessionStorage.getItem("uid");

      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUsername(docSnap.data().username);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      await getUsername();
    })();
  }, []);

  const sidebarHandler = () => {
    props.onSidebarToggle(!props.isOpen);
    // console.log(props.isOpen)
  };

  return (
    <div className=" mb-14 text-base flex items-center md:justify-end justify-between ">
      {/* <div className="flex items-center h-12">
        <div className="py-3 pl-3 pr-4 border rounded-tl-md rounded-bl-md border-r-0 h-full">
          <img src={search} alt="search icon" className="" />
        </div>
        <input
          className="w-[400px] h-12 py-3 pr-3 bg-transparent outline-none border rounded-tr-md rounded-br-md border-l-0"
          placeholder="Search"
          type="text"
        />
      </div> */}
      <FaBars onClick={sidebarHandler} className="md:hidden block " />
      <div className=" flex items-center gap-9">
        <img src={notification} alt="notification icon" className="" />
        <div className="flex items-center gap-3">
          <p className="">Hey {username}</p>
          <div className="h-8 w-8 rounded-full bg-slate-300"></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
