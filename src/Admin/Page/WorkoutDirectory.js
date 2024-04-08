import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Modal} from 'antd';

const WorkoutDirectory = () => {
    // modal
    const [Madd,setMadd] = useState(0);
    const [Mview, setMview] = useState(0);
    const [Medit, setMedit] = useState(0);
    const [Mdel, setMdel] = useState(0);
    // handle
    const handleAdd = () => {

    }
    const handleView = () => {

    }
    const handleEdit = () => {

    }
    const handleDel = () => {

    }
    return (
        <>
            <div className='m-[10px] border-[1px] p-[5px]'>
                <div className='bg-[#CDD4E6] p-[10px] my-[10px]'>
                    <p className='text-[30px] text-center font-bold'>QUẢN LÝ DANH MỤC CÁC BÀI TẬP</p>
                </div>
                <hr className='m-[10px]' />
                <div className='flex items-center'>
                    <button onClick={() => {setMadd(1)}} className='ms-auto border-[1px] rounded-[10px] px-[10px] py-[5px]'><p className='text-[18px] font-bold'>Thêm</p></button>
                </div>
                <table className='table-auto w-full my-[10px]'>
                    <thead className='bg-[violet]'>
                        <tr className='text-center'>
                            <th><input type='checkbox' /></th>
                            <th>TÊN DANH MỤC</th>
                            <th>THỜI GIAN TẠO</th>
                            <th>CHỨC NĂNG</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='text-center hover:bg-[#CDD4E6]'>
                            <td><input type='checkbox' /></td>
                            <td>VÚ</td>
                            <td>04-07-2024</td>
                            <td>
                                <div className='flex items-center justify-center'>
                                    <button onClick={()=>{setMedit(1)}} className='border-[1px] rounded-[10px] px-[15px] py-[5px] me-[5px]'>Sửa</button>
                                    <button onClick={()=>{setMdel(1)}} className='border-[1px] rounded-[10px] px-[15px] py-[5px] ms-[5px]'>Xóa</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Modal open={Madd} onCancel={()=>{setMadd(0)}} onOk={handleAdd} okButtonProps={{className:'bg-primary'}}>
                <div className='flex-col justify-center items-center'>
                    <p className='text-center text-[20px] font-bold my-[10px]'>Nhập tên danh mục bài tập</p>
                    <div className='flex items-center justify-center'>
                        <input type='text' placeholder='Nhập tên bài tập' className='border-[1px] rounded-[10px] p-[5px]' />
                    </div>
                </div>
            </Modal>
            <Modal open={Medit} onCancel={()=>{setMedit(0)}} onOk={handleEdit} okButtonProps={{className:'bg-primary'}}>
                <div className='flex-col justify-center items-center'>
                    <p className='text-center text-[20px] font-bold my-[10px]'>Nhập tên danh mục bài tập mới</p>
                    <div className='flex items-center justify-center'>
                        <input type='text' placeholder='Nhập tên danh mục mới' className='border-[1px] rounded-[10px] p-[5px]' />
                    </div>
                </div>
            </Modal>
            <Modal open={Mdel} onCancel={()=>{setMdel(0)}} onOk={handleDel} okButtonProps={{className:'bg-primary'}}>
                <p className='text-center text-[20px] font-bold my-[10px]'>Bạn có chắc muốn xóa không ?</p>
            </Modal>
        </>
    );
};
export default WorkoutDirectory;