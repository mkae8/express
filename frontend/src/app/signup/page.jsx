"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignUp = () => {
  const [userDetail, setUserDetail] = useState({});
  const { push } = useRouter();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetail({ ...userDetail, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userDetail);

    const res = axios.post("http://localhost:8000/sign-up", userDetail);
    console.log(res.data);

    push("/login");
    console.log(userDetail);
  };

  return (
    <div className="flex flex-col gap-10 w-full h-[800px] justify-center items-center">
      <h1 className="font-bold text-[40px]">Sign Up Page</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
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
export default SignUp;
