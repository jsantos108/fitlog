import React from 'react';
import {Link} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../SignIn.css"

const LoginSchema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required()
  });

export default function Login() {
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(LoginSchema)
      });
      const onSubmit = (data) => {
        document.getElementsByName("username")[0].value = "";
        document.getElementsByName("email")[0].value = "";
        document.getElementsByName("password")[0].value = "";
        alert(JSON.stringify(data));
      };
    
      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>User</label>
            <input type="text" name="username" ref={register} />
            {errors.username && <p>{errors.username.message}</p>}
          </div>
          <div>
            <label>Email</label>
            <input type="text" name="email" ref={register} />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div>
            <label>Password</label>
            <input type="text" name="password" ref={register} />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <input type="submit" style={{marginTop: 30}} value='Login' />
          <Link to={`/register`} style={{display:'flex', flexDirection:'column', alignItems:'center'}}>Sign Up</Link>
        </form>
      );
}
