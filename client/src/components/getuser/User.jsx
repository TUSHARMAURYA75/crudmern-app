import React, { useEffect, useState } from 'react'
import "./user.css"
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const User = () => {

    const [users , setUsers] = useState([]);

    useEffect(()=>{
        const fetchData = async()=>{
           const response =  await axios.get('http://localhost:8000/api/getAll')
            setUsers(response.data);   

        }

        fetchData();
    },[])

        const deleteUser = async(userid) =>{
            await axios.delete(`http://localhost:8000/api/delete/${userid}`)
            .then((response)=>{
              setUsers((prevUser)=> prevUser.filter((user)=> user._id !== userid))
              toast.success(response.data.msg , {position: 'top-right'});
            })
            .catch((error)=>{
                console.log(error);
            })
        }

  return (
    <div className='userTable'>
        <Link to = {"/add"} className='addbutton'>Add User </Link>
        <table border = {1} cellPadding={10} cellSpacing={0}>

        <thead>
            <tr>
                <th>S.no</th>
                <th>User name</th>
                <th>User Email</th>
                <th>Action</th>
            </tr>
        </thead>
            <tbody>
                {
                    users.map((User , index)=>{
                        return(
                <tr KEY = {User._id}>
                    <td>{index + 1}</td>
                    <td>{User.Fname} {User.Lname}</td>
                    <td>{User.Email}</td>
                    <td className='actionButtons'>
                        <button onClick={()=> deleteUser(User._id)}><i class="fa-solid fa-trash"></i></button>
                        <Link to={`/edit/` + User._id}><i class="fa-solid fa-pen-to-square"></i></Link>
                    </td>
                </tr>
                        )
                    })
                }
                
            </tbody>


        </table>
    </div>
  )
}

export default User