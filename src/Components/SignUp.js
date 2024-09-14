import React, { useState} from "react";
import {useNavigate} from 'react-router-dom';

const SignUp = (props) => {
    const [credentials, setcredentials] = useState({ name:"",email: "", password: "",cpassword: "" });
    let history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = "http://localhost:8080/api/auth/createUser";
        const {name,email,password} = credentials;
        const headers = new Headers();
        headers.set("Content-Type", "application/json");
        const body = JSON.stringify({name,email,password});
        let data = await fetch(url, {
          method: "POST",
          headers: headers,
          body: body,
        });
        const json = await data.json();
        console.log(json);
        if(json){
            localStorage.setItem('token',json.true);
            history("/home");
            props.showAlert("Account created successfully","success");
        }else{
            props.showAlert("Invalid details","danger");
        }
      };
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
      };
  return (
    <div className='container mt-3'>
      <h2>Create an account to use to iNotebook</h2>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
    <div id="email" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary">Sign Up</button>
</form>
    </div>
  )
}

export default SignUp
