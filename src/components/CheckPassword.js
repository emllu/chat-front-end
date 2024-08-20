import React, { useEffect, useState } from 'react';
import { IoClose } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import toast from 'react-hot-toast';
import Avatar from '../pages/avatar';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../redux/userSlice';
import axios from '../axios/axiosInstance'
const CheckPasswordPage = () => {
  const [data, setData] = useState({
    password: "",
    userId: ""
  });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!location?.state?.name) {
      navigate('/email');
    }
  }, []);

  console.log(location);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  console.log(location?.state?._id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = '/api/verify';

    try {
      const response = await axios.post(
        URL,
        {
          userId: location?.state?._id,  // Ensure consistency with backend
          password: data.password
        },
        { withCredentials: true }
      );
console.log("response from checkpasswod",response)
      toast.success(response.data.message);

      if (response.data.success) {
        
        // dispatch(setUser(response?.data?.data))
        dispatch(setToken(response?.data?.token));
        localStorage.setItem('token', response?.data?.token);

        setData({
          password: "",
        });
        navigate('/');
      }
    } catch (error) {
      toast.error(error?.response?.data?.ErrorMessage || "Error occurred");
    }
  };

  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>
        <div className='w-fit mx-auto mb-2 flex justify-center items-center flex-col'>
          <Avatar
            width={70}
            height={70}
            name={location?.state?.name}
            imageUrl={location?.state?.profile_pic}
          />
          <h2 className='font-semibold text-lg mt-1'>{location?.state?.name}</h2>
        </div>

        <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>
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

          <button
            className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
          >
            Login
          </button>
        </form>

        <p className='my-3 text-center'>
          <Link to={"/forgot-password"} className='hover:text-primary font-semibold'>Forgot password?</Link>
        </p>
      </div>
    </div>
  );
};

export default CheckPasswordPage;