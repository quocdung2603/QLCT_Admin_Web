import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { VscThreeBars } from "react-icons/vsc";

//component
import PostManage from './PostManage';
import WorkoutDirectory from './WorkoutDirectory'
import ListExercise from './ListExercise';

const Dashboard = () => {
    const [selectedTab, setselectedTab] = useState(1);
    const [MCE, setMCE] = useState(1);
    return (
        <div className='flex-col'>
            {/* header-navbar */}
            <div className='flex items-center border-[1px] mb-[10px] justify-center'>
                <div className='flex items-center me-auto ms-[20px]'>
                    <p className='text-[50px] font-bold text-[#000]'>QL</p>
                    <p className='text-[50px] font-bold text-[red]'>CT</p>
                </div>
                <div className=' flex items-center w-[500px]'>
                    <input type='text' placeholder='Nhập nội dung tìm kiếm...' className='p-[5px] w-full' />
                    <FaSearch className='text-[30px] ms-[10px]'/>
                </div>
                <div className='flex items-center ms-auto me-[20px]'>  
                    <div className='w-[50px] h-[50px] rounded-[25px] bg-[#000]'>
                        {/* ảnh đại diện */}
                    </div>
                    <div className='flex-col ms-[10px]'>
                        <p className='text-[18px] font-bold'>Lê Tuấn Kiệt</p>
                        <p className='text-[16px]'>ADMIN</p>
                    </div>
                </div>
            </div>
            {/* body-main content */}
            <div className='flex my-[10px]'>
                {/* bên trái */}
                <div className='flex-col w-1/5 h-full'>
                    <div className='flex items-center my-[10px]'>
                        <VscThreeBars className='ms-auto text-[30px]'/>
                    </div>
                    <div className='flex items-center my-[10px]'>
                        <button onClick={() => { setselectedTab(1) }} className='w-full p-[10px]'>
                            <p className='text-start font-bold'>Quản lý bài viết</p>
                        </button>
                    </div>
                    <div className='flex items-center my-[10px]'>
                        <button onClick={() => { MCE === 1 ? setMCE(0) : setMCE(1) }} className='w-full p-[10px] flex items-center'>
                            <p className='text-start font-bold'>Quản lý sức khỏe</p>
                            <div className='ms-auto'>
                                {MCE === 1 ? <IoIosArrowDown /> : <IoIosArrowUp />}
                            </div>
                        </button>
                    </div>
                    {MCE === 1 ? (
                        <div className='flex-col ms-[20px]'>
                            <div className='flex items-center my-[10px]'>
                                <button onClick={() => { setselectedTab(2) }} className='w-full p-[10px]'>
                                    <p className='text-start'>Danh Mục</p>
                                </button>
                            </div>
                            <div className='flex items-center my-[10px]'>
                                <button onClick={() => { setselectedTab(3) }} className='w-full p-[10px]'>
                                    <p className='text-start'>Bài tập</p>
                                </button>
                            </div>
                        </div>

                    ) : ""}
                </div>
                {/* bên phải */}
                <div className='flex-col w-4/5 h-full border-2'>
                    {selectedTab === 1 ? (
                        <PostManage />
                    ) : selectedTab === 2 ? (
                        <WorkoutDirectory />
                    ) : selectedTab === 3 ? (
                        <ListExercise />
                    ) : ""}
                </div>
            </div>
            {/* footer */}
            <div className='flex items-center border-[1px] my-[10px] justify-center'>
                <p className='text-[20px]'>@2024.Admin.QLCT</p>
            </div>
        </div>
    )
}
export default Dashboard;