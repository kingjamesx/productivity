import React from "react";
import Header from "./Header";

const Home = () => {
  return (
    <section className=" md:pb-6">
      {/* <Header /> */}
      <div className="grid grid-cols-2 gap-5 h-[500px] md:h-screen ">
        <div className="w-auto bg-blue-300 rounded-[20px]"></div>
        <div className="w-auto bg-blue-300 rounded-[20px]"></div>
        <div className="w-auto bg-blue-300 rounded-[20px]"></div>
        <div className="w-auto bg-blue-300 rounded-[20px]"></div>
      </div>
    </section>
  );
};

export default Home;
