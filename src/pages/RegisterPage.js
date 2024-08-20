import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from '../axios/axiosInstance'
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: ""
  });
  const [uploadPhoto, setUploadPhoto] = useState(null);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadPhoto = async (e) => {
    try {
      const file = e.target.files[0];
      const uploadedPhoto = await uploadFile(file);
      console.log(uploadedPhoto);
      setUploadPhoto(file);
      setData((prev) => ({
        ...prev,
        profile_pic: uploadedPhoto?.url || ""
      }));
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload profile picture.");
    }
  };

  const handleClearUploadPhoto = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadPhoto(null);
    setData((prev) => ({
      ...prev,
      profile_pic: ""
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
  
    console.log("Submit button clicked, data:", data); // Log before making API call
  
    if (!data.profile_pic) {
      toast.error("Profile picture is required.");
      console.log("Profile picture is missing"); // Log missing profile picture case
      return;
    }
  
    const URL = "/api/register";
  
    try {
      const response = await axios.post(URL, data);
      console.log("Server response:", response); // Log server response
  
      if (response.data.success) {
        toast.success(response.data.message);
        console.log("User registered successfully"); // Log successful registration
        setData({
          name: "",
          email: "",
          password: "",
          profile_pic: ""
        });
        navigate('/email');
      } else {
        toast.error(response.data.message);
        console.log("Error from server:", response.data.message); // Log server error message
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(error?.response?.data?.message || "Registration failed.");
    }
  };
  

  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>
        <h3>Welcome to Chat app!</h3>

        <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label htmlFor='name'>Name :</label>
            <input
              type='text'
              id='name'
              name='name'
              placeholder='Enter your name'
              className='bg-slate-100 px-2 py-1 focus:outline-primary'
              value={data.name}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='email'>Email :</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Enter your email'
              className='bg-slate-100 px-2 py-1 focus:outline-primary'
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='password'>Password :</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Enter your password'
              className='bg-slate-100 px-2 py-1 focus:outline-primary'
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='profile_pic'>
              Photo:
              <div className='h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer'>
                <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
                  {uploadPhoto?.name || "Upload profile photo"}
                </p>
                {uploadPhoto?.name && (
                  <button className='text-lg ml-2 hover:text-red-600' onClick={handleClearUploadPhoto}>
                    <IoClose />
                  </button>
                )}
              </div>
            </label>
            <input
              type='file'
              id='profile_pic'
              name='profile_pic'
              className='bg-slate-100 px-2 py-1 focus:outline-primary hidden'
              onChange={handleUploadPhoto}
            />
          </div>

          <button
            type='submit'
            className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
          >
            Register
          </button>
        </form>

        <p className='my-3 text-center'>
          Already have an account? <Link to={"/email"} className='hover:text-primary font-semibold'>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
