import React, { useState } from "react";
import "./CSS/LoginSignup.css";
const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("login fn ext", formData);
    let responseData;
    await fetch('https://my-ecom-backend.onrender.com/login',{
      method: 'post',
      headers: {
        "Accept": 'application/form-data',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then((response)=> response.json()).then((data)=>responseData= data);
    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/")
    }
    else{
      alert(responseData.errors)
    }
  };

  const signup= async ()=>{
    console.log("signup fn ext", formData);
    let responseData;
    await fetch('https://my-ecom-backend.onrender.com/signup',{
      method: 'post',
      headers: {
        "Accept": 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then((response)=> response.json()).then((data)=>responseData= data);
    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      alert(responseData.message);
      window.location.replace("/")
    }
    else{
      alert(responseData.errors)
    }
  }

 

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "SignUp" ? (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
            />
          ) : (
            <></>
          )}
          <input
            name="email"
            value={FormData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={FormData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
          />
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
        >
          Continue
        </button>
        {state === "SignUp" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span
              onClick={() => {
                setState("SignUp");
              }}
            >
              Click here
            </span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to the terms of use and privacy policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
