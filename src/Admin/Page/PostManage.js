import React, { useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { Timestamp, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import uuid from 'react-uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { set } from 'firebase/database';

const WorkoutDirectory = () => {
    // modal
    const [Madd, setMadd] = useState(0);
    const [Mview, setMview] = useState(0);
    const [Medit, setMedit] = useState(0);
    const [Mdel, setMdel] = useState(0);
    const [allPost,setAllPost]=useState([]);

    const [namePost,setNamePost]=useState("");
    const [content,setContent]=useState("");
    const [imgPost,setImgPost]=useState("");
    const [idPost,setIdPost]=useState("");
    const getPost = async () =>{
        const snapDoc = await getDocs(collection(db,"post"));
        const dt=[];
        snapDoc.docs.map((item)=>{
            dt.push(item.data());
        })
        setAllPost(dt);
    }
    useEffect(()=>{
        return ()=>{
            getPost();
        }
    },[])
    // handle
    const handleAdd = async () => {
             const id=uuid();
            const date= Date.now();
            const storageRef = ref(storage,`/post/${id + date}` );
            const time=Timestamp.now();
            await uploadBytesResumable(storageRef, fileList).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                  try {
                        await setDoc(doc(db,"post",id),{
                            id: id,
                            title: namePost,
                            content: content,
                            img: downloadURL,
                            timeCreate: time
                        })
                        setMadd(0);
                        setNamePost("");
                        setContent("");
                        setFileList(null);
                        getPost();
                  } catch (err) {
                    console.log(err);
                  }
                });
              });
    }
    const handleView = () => {

    }
    const handleEdit = async () => {
        const time=Timestamp.now();
        if(fileList!=null)
        {
            const date= Date.now();
            const storageRef = ref(storage,`/post/${idPost + date}` );
            await uploadBytesResumable(storageRef, fileList).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                  try {
                        await updateDoc(doc(db,"post",idPost),{
                            title: namePost,
                            content: content,
                            img: downloadURL,
                            timeCreate: time
                        })
                        setNamePost("");
                        setContent("");
                        setFileList(null);
                        setImgPost(null);
                        setIdPost("");
                        getPost();
                        setMedit(0);
                  } catch (err) {
                    console.log(err);
                  }
                });
              });
        }
        else
        {
            try {
                await updateDoc(doc(db, "post", idPost), {
                    title: namePost,
                    content: content,
                    timeCreate: time
                })
                setMedit(0);
                setNamePost("");
                setContent("");
                setImgPost(null);
                setIdPost("");
                getPost();
            } catch (err) {
                console.log(err);
            }
        }
    }
    const handleDel = async () => {
        try {
            await deleteDoc(doc(db,"post",idPost));
            setMdel(0);
            getPost();
        } catch (error) {
            console.log(error)
        }
    }
    // hinh anh
    const [fileList, setFileList] = useState(null);
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
                    <p className='text-[30px] text-center font-bold'>QUẢN LÝ BÀI VIẾT</p>
                </div>
                <hr className='m-[10px]' />
                <div className='flex items-center'>
                    <button onClick={() => {setMadd(1)}} className='ms-auto border-[1px] rounded-[10px] px-[10px] py-[5px]'><p className='text-[18px] font-bold'>Thêm</p></button>
                </div>
                <table className='table-auto w-full my-[10px]'>
                    <thead className='bg-[violet]'>
                        <tr className='text-center'>
                            <th><input type='checkbox' /></th>
                            <th>TÊN TIÊU ĐỀ</th>
                            <th>Cập nhật</th>
                            <th>CHỨC NĂNG</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allPost.length> 0 &&
                            allPost.map((item) => (
                                <tr className='text-center hover:bg-[#CDD4E6]'>
                                    <td><input type='checkbox' /></td>
                                    <td>{item.title}</td>
                                    <td>{formatTimestamp(item.timeCreate)}</td>
                                    <td>
                                        <div className='flex items-center justify-center'>  
                                            <button
                                                onClick={() => { setMedit(1); setNamePost(item.title); setContent(item.content); setImgPost(item.img); setIdPost(item.id) }}
                                                className='border-[1px] rounded-[10px] px-[15px] py-[5px] mx-[10px]'>
                                                Sửa
                                            </button>
                                            <button onClick={() => { setMdel(1); setIdPost(item.id) }} className='border-[1px] rounded-[10px] px-[15px] py-[5px]'>Xóa</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {/* thêm */}
            <Modal open={Madd} onCancel={() => { setMadd(0); setNamePost(""); setContent(""); setFileList(null) }} onOk={handleAdd} okButtonProps={{ className: 'bg-primary' }}>
                <div className='flex-col justify-center items-center'>
                    <p className='text-center text-[20px] font-bold my-[10px]'>Thêm bài viết</p>
                    <div className='flex items-center my-[10px]'>
                        <p className='text-[17px] font-bold me-auto'>Tiêu đề bài viết</p>
                        <input type='text' value={namePost} onChange={(e)=>{setNamePost(e.target.value)}} placeholder='Nhập tiêu đề bài viết' className='border-[1px] rounded-[10px] p-[5px] w-[200px] ms-auto' />
                    </div>
                    <div className='flex-col my-[10px]'>
                        <p className='text-[17px] font-bold me-auto'>Nội dung bài viết</p>
                        <textarea placeholder='Chi tiết bài viết'
                            value={content}
                            onChange={(e)=>{setContent(e.target.value)}}
                         className='w-full border-[1px] rounded-[10px] p-[5px]' />
                    </div>
                    <div className='flex-col my-[10px]'>
                        <p className='text-[17px] font-bold me-auto'>Cập nhật hình ảnh</p>
                        <input type='file' onChange={(e)=>{setFileList(e.target.files[0])}}/>
                    </div>
                </div>
            </Modal>
            {/* sửa */}
            <Modal open={Medit} onCancel={() => { setMedit(0); setNamePost(""); setContent(""); setFileList(null) }} onOk={handleEdit} okButtonProps={{ className: 'bg-primary' }}>
                <div className='flex-col justify-center items-center'>
                    <p className='text-center text-[20px] font-bold my-[10px]'>Chỉnh sửa bài viết</p>
                    <div className='flex items-center my-[10px]'>
                        <p className='text-[17px] font-bold me-auto'>Tiêu đề bài viết</p>
                        <input type='text' value={namePost}  onChange={(e)=>{setNamePost(e.target.value)}}  placeholder='Nhập tiêu đề bài viết' className='border-[1px] rounded-[10px] p-[5px] w-[200px] ms-auto' />
                    </div>
                    <div className='flex-col my-[10px]'>
                        <p className='text-[17px] font-bold me-auto'>Nội dung bài viết</p>
                        <textarea value={content}  onChange={(e)=>{setContent(e.target.value)}} placeholder='Chi tiết bài viết' className='w-full border-[1px] rounded-[10px] p-[5px]' />
                    </div>
                    <div className='flex-col my-[10px]'>
                        <p className='text-[17px] font-bold me-auto'>Hình ảnh</p>
                        <img alt='Hình ảnh' src={imgPost}/>
                    </div>
                    <div className='flex-col my-[10px]'>
                        <p className='text-[17px] font-bold me-auto'>Hình ảnh</p>
                        <input type='file'  onChange={(e)=>{ setFileList(e.target.files[0])}}/>
                    </div>
                </div>
            </Modal>
            {/* xóa */}
            <Modal open={Mdel} onCancel={() => { setMdel(0) }} onOk={handleDel} okButtonProps={{ className: 'bg-primary' }}>
                <p className='text-center text-[20px] font-bold my-[10px]'>Bạn có chắc muốn xóa không ?</p>
            </Modal>
        </>
    );
};
export default WorkoutDirectory;