import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import "./add.css"  
import axios from "axios";
import toast from 'react-hot-toast';
const Add = () => {

    const users = {

        Fname: "",
        Lname: "",
        Email: "",
        Password: "",
    }

    const [user , setuser] = useState(users);
    const navigate  = useNavigate();

   const inputhandler = (e)=>{
    
    const {name , value} = e.target;
    setuser({...user , [name]:value});
    console.log(user)

   }


   const submitform = async(e) =>{
    const msg = "created successfully";
    e.preventDefault();
    await axios.post("http://localhost:8000/api/create" , user)
    
    .then((response)=>{
        
       toast.success(response.data.msg , {position: "top-right"})
       navigate("/");
      
    })
    .catch(error => console.log(error))
   }


  return (
    <div className='adduser'>
        <Link to={"/"}>Back</Link>
        <h3>ADD NEW USER</h3>
        <form className='adduserform' onSubmit={submitform}>
            <div className='inputGroup'>
                <label htmlFor='Fname'>First name</label>
                <input type='text' onChange={inputhandler} id ="Fname" name = "Fname" autoComplete='off' placeholder="first name"></input>
            </div>
            <div className='inputGroup'>
                <label htmlFor='Lname'>Last name</label>
                <input type='text'onChange={inputhandler} id ="Lname" name = "Lname" autoComplete='off' placeholder="first name"></input>
            </div>
            <div className='inputGroup'>
                <label htmlFor='Email'>Email</label>
                <input type='text'onChange={inputhandler} id ="Email" name = "Email" autoComplete='off' placeholder="Email"></input>
            </div>
            <div className='inputGroup'>
                <label htmlFor='Password'>Password</label>
                <input type='text'onChange={inputhandler} id ="Password" name = "Password" autoComplete='off' placeholder="Password"></input>
            </div>

            <div className='inputGroup'>
                <button type='submit'>ADD USER</button>
            </div>
        </form>
    </div>
  )
}

export default Add