import React from "react";
import Header from "./Header";

const Home = () => {
  return (
    <section className=" z-[-1] h-screen">
      {/* <Header /> */}
      <div className="grid grid-cols-2 gap-5 h-[450px] ">
        <div className="w-auto bg-blue-300 rounded-[20px]"></div>
        <div className="w-auto bg-blue-300 rounded-[20px]"></div>
        <div className="w-auto bg-blue-300 rounded-[20px]"></div>
        <div className="w-auto bg-blue-300 rounded-[20px]"></div>
      </div>
    </section>
  );
};

export default Home;
