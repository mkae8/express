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
    <div className="flex  flex-col gap-5 ">
      <Link href={"/login"}>Log In</Link>
      <Link href={"/signup"}>Sign Up</Link>
      <button onClick={fetchUser} className="border h-[50px] w-[200px]">
        avchirlaa
      </button>
    </div>
  );
};

export default Home;
