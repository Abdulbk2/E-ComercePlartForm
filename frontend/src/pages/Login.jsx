import { useState } from "react";
import axios from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const submitHandler = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/auth/login", form);
    localStorage.setItem("userInfo", JSON.stringify(data));
    window.location.href = "/";
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={submitHandler}
        className="bg-white p-8 shadow-lg rounded-lg w-96">

        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input type="email" placeholder="Email"
          className="w-full p-2 border mb-3"
          onChange={(e)=>setForm({...form,email:e.target.value})}/>

        <input type="password" placeholder="Password"
          className="w-full p-2 border mb-3"
          onChange={(e)=>setForm({...form,password:e.target.value})}/>

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}