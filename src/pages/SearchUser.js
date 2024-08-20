import React, { useState, useEffect } from 'react';
import { IoClose, IoSearchOutline } from 'react-icons/io5';
import Loading from '../components/Loading';
import SearchUserCard from './SearchUserCard';

import { toast } from 'react-hot-toast';
import axios from '../axios/axiosInstance'
const SearchUser = ({ onClose }) => {
    const [searchUser, setSearchUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    const handleSearchUser = async () => {
        const URL = '/api/search-user';
        try {
            setLoading(true);
            const response = await axios.post(URL, {
                search: search
            });
            setLoading(false);

            setSearchUser(response.data.data);

        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.message || "Error fetching users");
        }
    };

    useEffect(() => {
        handleSearchUser();
    }, [search]);

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 p-2 z-10'>
            <div className='w-full max-w-lg mx-auto mt-12'>
                <div className='bg-white rounded h-14 overflow-hidden border flex'>
                    <input 
                        type="text" 
                        className='w-full outline-none py-1 h-full px-2' 
                        placeholder='Search user by name, email...' 
                        onChange={(e) => setSearch(e.target.value)} 
                        value={search}
                    />
                    <div className='flex justify-center items-center h-14 mr-3'>
                        <IoSearchOutline size={20} onClick={handleSearchUser} />
                    </div>
                </div>

                <div className='bg-white mt-2 w-full p-4 rounded h-full max-h-[70vh] overflow-scroll scrollbar'>
                    {searchUser.length === 0 && !loading && search.trim() !== "" && (
                        <p className='text-center text-slate-500'>No User Found!</p>
                    )}

                    <div className='flex justify-center'>
                        {loading && <Loading />}
                    </div>

                    {searchUser.length > 0 && !loading && (
                        searchUser.map((user) => (
                            <SearchUserCard key={user._id} user={user} onClose={onClose }
                             />
                        ))
                    )}
                </div>
            </div>
            
            <div className='absolute top-0 right-0 text-2xl p-2 lg:text-4xl hover:text-white' onClick={onClose}>
            <button>
                <IoClose/>
            </button>
        </div>
            

    
        </div>
    );
};

export default SearchUser;
