"use client";
import axios from "axios";
import React, { useState } from "react";

const LogIn = () => {
  const [userDetail, setUserDetail] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetail({ ...userDetail, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await axios.post("http://localhost:8000/sign-in", userDetail);
    console.log(res.data);
  };

  return (
    <div className="flex flex-col gap-10 w-full h-[800px] justify-center items-center">
      <h1 className="font-bold text-[40px]">Log in page</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
        <input
          type="text"
          placeholder="Enter your email"
          name="username"
          onChange={handleChange}
          className="h-[50px] w-[200px] p-4 border rounded-xl"
        />
        <input
          type="password"
          placeholder="Enter your password "
          name="password"
          onChange={handleChange}
          className="h-[50px] w-[200px] p-4 border rounded-xl"
        />
        <button
          type="submit"
          className="h-[50px] w-[200px] bg-blue-700 rounded-xl text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LogIn;
