import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link,  useNavigate, useParams } from 'react-router-dom'
const Edit = () => {

    const users = {

       Fname: "",
       Lname: "",
       Email: ""
    }

    const {id} = useParams();
    const Navigate = useNavigate();
    const [user , setUser] = useState(users);

    const inputchangehandler = (e)=>{
        const {name , value}  = e.target;
        setUser({...user , [name]:value});
        console.log(user);
    }

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/getOne/${id}`)
        .then((response)=>{
           setUser(response.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    },[id])


    const submitForm  = async(e) =>{
        const msg = "created successfully";
        e.preventDefault();
        await axios.put(`http://localhost:8000/api/update/${id}` , user)
        
        .then((response)=>{
            
           toast.success(response.data.msg , {position: "top-right"})
           Navigate("/");
          
        })
        .catch(error => console.log(error))
       }
    

  return (
    <div className='adduser'>
    <Link to={"/"}>Back</Link>
    <h3>UPDATE USER</h3>
    <form className='adduserform' onSubmit={submitForm}>
        <div className='inputGroup'>
            <label htmlFor='Fname'>First name</label>
            <input type='text'  value={user.Fname} onChange={inputchangehandler} id ="Fname" name = "Fname" autoComplete='off' placeholder="first name"></input>
        </div>
        <div className='inputGroup'>
            <label htmlFor='Lname'>Last name</label>
            <input type='text' value={user.Lname} onChange={inputchangehandler} id ="Lname" name = "Lname" autoComplete='off' placeholder="first name"></input>
        </div>
        <div className='inputGroup'>
            <label htmlFor='Email'>Email</label>
            <input type='text' value={user.Email} onChange={inputchangehandler} id ="Email" name = "Email" autoComplete='off' placeholder="Email"></input>
        </div>
       

        <div className='inputGroup'>
            <button type='submit'>UPDATE USER</button>
        </div>
    </form>
</div>
)
}
  
export default Edit