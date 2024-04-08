import React, { useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Modal} from 'antd';
import uuid from 'react-uuid';
import { Timestamp, collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc } from 'firebase/firestore';
import {db} from '../../firebase'
const WorkoutDirectory = () => {
    // modal
    const [Madd,setMadd] = useState(0);
    const [Mview, setMview] = useState(0);
    const [Medit, setMedit] = useState(0);
    const [Mdel, setMdel] = useState(0);
    const [nameAdd,setNameAdd]=useState("");
    const [allDm,setAllDm]=useState([]); // lấy toàn bộ danh mục
    const getDm= async ()=>{
        const q = collection(db,"exercise");
        const snapDoc= await getDocs(q);
        const dt=[];
        snapDoc.docs.forEach((item)=>{
            dt.push(item.data());
        })
        setAllDm(dt);
    }
    useEffect(()=>{
        return ()=>{
            getDm();
        }
    },[])

    // handle
    const handleAdd = async () => {
        const id = uuid();
        const time = Timestamp.now();
        try {
            await setDoc(doc(db,"exercise",id),{
                id: id,
                name: nameAdd,
                exercises: [],
                timeCreate: time
            })
            alert("Thêm thành công");
            setMadd(0);
            getDm();
        } catch (error) {
            console.log(error);
        }
    }
    const [dmEdit,setDmEdit]=useState(null);
    const [newNameEdit,setNewNameEdit]=useState("");
    const handleEdit = async () => {
        try {
            const time = Timestamp.now();
            await updateDoc(doc(db,"exercise",dmEdit.id),{
                name: newNameEdit,
                timeCreate: time
            })
            getDm();
            alert("Cập nhật thành công");
            setMedit(0);
        } catch (error) {
            console.log(error);
        }
    }
    const [dmDele,setDmdele]=useState(null);
    const handleDel = async () => {
        try {
            await deleteDoc(doc(db,"exercise",dmDele.id));
            alert("Xóa thành công");
            setMdel(0);
        } catch (error) {
            console.log(error);
        }
    }
    function formatTimestamp(timestamp) {
        if(timestamp!==undefined)
        {

            const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
      
            // Định dạng ngày giờ
            const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    
            return formattedDate;
        }
        else
        {
            return "Chưa định dạng";
        }
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
                        {
                            allDm.length>0 && allDm.map((item) => (
                                <tr className='text-center hover:bg-[#CDD4E6]'>
                                    <td><input type='checkbox' /></td>
                                    <td>{item.name}</td>
                                    <td>{formatTimestamp(item.timeCreate)}</td>
                                    <td>
                                        <div className='flex items-center justify-center'>
                                            <button onClick={() => { setMedit(1); setDmEdit(item) }} className='border-[1px] rounded-[10px] px-[15px] py-[5px] me-[5px]'>Sửa</button>
                                            <button onClick={() => { setMdel(1); setDmdele(item) }} className='border-[1px] rounded-[10px] px-[15px] py-[5px] ms-[5px]'>Xóa</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <Modal open={Madd} onCancel={()=>{setMadd(0)}} onOk={handleAdd} okButtonProps={{className:'bg-primary'}}>
                <div className='flex-col justify-center items-center'>
                    <p className='text-center text-[20px] font-bold my-[10px]'>Nhập tên danh mục bài tập</p>
                    <div className='flex items-center justify-center'>
                        <input type='text' placeholder='Nhập tên bài tập' value={nameAdd} onChange={(e)=>{setNameAdd(e.target.value)}} className='border-[1px] rounded-[10px] p-[5px]' />
                    </div>
                </div>
            </Modal>
            <Modal open={Medit} onCancel={()=>{setMedit(0)}} onOk={handleEdit} okButtonProps={{className:'bg-primary'}}>
                <div className='flex-col justify-center items-center'>
                    <p className='text-center text-[20px] font-bold my-[10px]'>Nhập tên danh mục bài tập mới</p>
                    <div className='flex items-center justify-center'>
                        <input type='text' value={newNameEdit} onChange={(e)=>{setNewNameEdit(e.target.value)}} placeholder='Nhập tên danh mục mới' className='border-[1px] rounded-[10px] p-[5px]' />
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