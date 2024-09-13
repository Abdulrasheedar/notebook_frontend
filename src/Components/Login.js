import React, { useState} from "react";
import {useNavigate} from 'react-router-dom';

const Login = (props) => {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  let history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8080/api/auth/login";
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    const body = JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    });
    let data = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });
    const json = await data.json();
    console.log(json);
    if(json.true){
        localStorage.setItem('token',json.authtoken);
        history("/home");
        props.showAlert("Logged In Successfully","success");
    }else{
        props.showAlert("Invalid Credentials","danger");
    }
  };
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="mt-3">
      <h2>Login to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={credentials.email}
            onChange={onChange}
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={credentials.password}
            onChange={onChange}
            id="password"
            name="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
