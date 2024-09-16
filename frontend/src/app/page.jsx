"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

const Home = () => {
  const [user, setUser] = useState();
  const fetchUser = async () => {
    const response = await axios.get("http://localhost:8000/");
    console.log(response.data);
    setUser(response);
  };

  return (
    <div className="flex  flex-col gap-5 mt-[200px] ml-[100px] ">
      <Link
        className="h-[50px] w-[200px] border flex justify-center items-center text-white rounded-md bg-slate-700"
        href={"/login"}
      >
        Log In
      </Link>
      <Link
        className="h-[50px] w-[200px] border  flex justify-center items-center text-white rounded-md bg-slate-700"
        href={"/signup"}
      >
        Sign Up
      </Link>
      <button onClick={fetchUser} className="border h-[50px] w-[200px]">
        Show all users
      </button>
    </div>
  );
};

export default Home;
