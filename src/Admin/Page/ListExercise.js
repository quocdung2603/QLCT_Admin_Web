import React, { useEffect, useState } from 'react';

import { Modal, Select, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { Timestamp, arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc } from 'firebase/firestore';
import uuid from 'react-uuid';


const ListExercise = () => {
    // modal
    const [Madd, setMadd] = useState(0);
    const [Medit, setMedit] = useState(0);
    const [Mdel, setMdel] = useState(0);
    const [Mview, setMview] = useState(0);
    const [exercise, setExercise] = useState([]);
    const [dataOp, setDataOp] = useState([]);
    //Tên bài tập muốn thêm
    const [nameBt, setNameBt] = useState(""); // tên bài tập
    const [descript, setDescript] = useState("");//Mô tả bài tập
    const [idCreate, setIdCreate] = useState("");//Id Của danh mục muốn thêm bài tập
    const [carlo, setCarlo] = useState(1);// Số carlo của bài tập
    const getEx = async () => {
        const q = query(collection(db, "exercise"));
        const docSnap = await getDocs(q);
        const dt = [];
        docSnap.docs.forEach((item) => {
            const ex = item.data().exercises;
            ex.forEach((it) => {
                const tmp = it;
                tmp.idDm = item.data().id;
                tmp.nameDm = item.data().name;
                dt.push(tmp);
            })
        })
        setExercise(dt);
    }
    const getAllExercise = async () => {
        const q = query(collection(db, "exercise"));
        const docSnap = await getDocs(q);
        const dt = [];
        const dt1 = [];
        docSnap.docs.forEach((item) => {

            const ex = item.data().exercises;
            ex.forEach((it) => {
                const tmp = it;
                tmp.idDm = item.data().id;
                tmp.nameDm = item.data().name;
                dt.push(tmp);
            })
            console.log(dt);
            const lb = item.data().name;
            const dta = item.data().id;
            const tmp = {
                value: dta,
                label: lb,
            }
            dt1.push(tmp);
        })
        console.log(dt);
        setDataOp(dt1);
        setExercise(dt);
    }
    useEffect(() => {

        return () => {
            getAllExercise();
        }
    }, [])

    const [uploadProgress, setUploadProgress] = useState(0);

    // handle
    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const idExercise = uuid();
            const date = Date.now();
            const storageRef = ref(storage, `/ImgExercise/${idExercise + date}`);
            let linkImg = "";
            const time = Timestamp.now();
            await uploadBytesResumable(storageRef, fileList).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update profile
                        linkImg = downloadURL;
                    } catch (err) {
                        console.log(err);
                        alert("Chưa thành công vui lòng thử lại!")
                    }
                });
            });     
            
            const storageRef1 = ref(storage, `/VideoExercise/${idExercise + date}`);
            const uploadTask = uploadBytesResumable(storageRef1, fileListVideo);

            uploadTask.on('state_changed',
                (snapshot) => {
                    // Tính phần trăm tải lên
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    // Tải lên hoàn thành
                    getDownloadURL(storageRef1).then(async (downloadURL) => {
                        try {
                            const cl= parseInt(carlo);
                        const tmp = {
                            id: idExercise,
                            name: nameBt,
                            image: linkImg,
                            introduction: descript,
                            carlo: cl,
                            video: downloadURL,
                            timeCreate: time
                        }
                        await updateDoc(doc(db, "exercise", idCreate), {
                            exercises: arrayUnion(tmp)
                        })
                        setNameBt("");
                        setCarlo(0);
                        setDescript("");
                        setIdCreate(null);
                        setFileList(null);
                        setFileListVideo(null);
                        setMadd(0);
                        alert("Thêm thành công");
                        getEx();
                        window.location.reload();
                        } catch (err) {
                            alert("Chưa thành công vui lòng thử lại!")
                            console.log(err);
                        }
                    });
                }
            );
        } catch (error) {
            alert("Chưa thành công vui lòng thử lại!")
            console.log(error);

        }
    }

    //Sửa bài tập
    const [edit, setEdit] = useState(null);
    const [editName, setEditName] = useState("");
    const [editIntro, setEditIntro] = useState("");
    const [editcarlo, setEditCarlo] = useState(0);
    const [idEdit, setIdEdit] = useState("");

    const handleEdit = async () => {
        try {
            const time = Timestamp.now();
            if (fileList != null) {
                const date = Date.now();
                const storageRef = ref(storage, `/ImgExercise/${idEdit + date}`);
                await uploadBytesResumable(storageRef, fileList).then(() => {
                    return getDownloadURL(storageRef).then(async (downloadURL) => {
                        try {
                            const ex = await getDoc(doc(db, "exercise", idEdit));
                            const allEx = ex.data().exercises;
                            let cur = allEx.findIndex(item => item.id === edit.id);
                            allEx[cur].image = downloadURL;
                            await updateDoc(doc(db, "exercise", idEdit), {
                                exercises: allEx,
                            })
                        } catch (err) {
                            console.log(err);
                        }
                    });
                });
            }
            if (fileListVideo != null) {
                const date = Date.now();
                const storageRef1 = ref(storage, `/VideoExercise/${idEdit+date}`);
                await uploadBytesResumable(storageRef1, fileListVideo).then(() => {
                    getDownloadURL(storageRef1).then(async (downloadURL) => {
                        try {
                            const ex = await getDoc(doc(db, "exercise", idEdit));
                            const allEx = ex.data().exercises;
                            let cur = allEx.findIndex(item => item.id === edit.id);
                            allEx[cur].video = downloadURL;
                            await updateDoc(doc(db, "exercise", idEdit), {
                                exercises: allEx,
                            })
                        } catch (err) {
                            console.log(err);
                        }
                    });
                });
            }

            const ex = await getDoc(doc(db, "exercise", idEdit));
            const allEx = ex.data().exercises;
            let cur = allEx.findIndex(item => item.id === edit.id);
            allEx[cur].name = editName;
            allEx[cur].introduction = editIntro;
            allEx[cur].carlo = editcarlo;
            allEx[cur].timeCreate = time;
            await updateDoc(doc(db, "exercise", idEdit), {
                exercises: allEx,
            })
            setEdit(null);
            setEditName("");
            setEditIntro("");
            setEditCarlo("");
            setFileList(null);
            setFileListVideo(null);
            setMedit(0);
            getAllExercise();
            alert("Thành công cập nhật");
        } catch (error) {
            console.log(error)
        }
    }
    const [idDel,setIdDel]=useState();
    const handleDel = async () => {
        try {
            const ex = await getDoc(doc(db, "exercise", idDel.idDm));
            const allEx = ex.data().exercises;
            const cur = allEx.findIndex(item => item.id === idDel.id);
            const datadelete=allEx[cur];
            await updateDoc(doc(db,"exercise",idDel.idDm),{
                exercises: arrayRemove(datadelete)
            })
            setMdel(0);
            getAllExercise();
            alert("Xóa thành công");
        } catch (error) {
            console.log(error)
        }
    }
    const handleView = () => {

    }
    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setIdCreate(value);
    };
    // hinh anh
    const [fileList, setFileList] = useState(null);

    //video
    const [fileListVideo, setFileListVideo] = useState(null);

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);

        // Định dạng ngày giờ
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        return formattedDate;
    }
    return (
        <>
            <div className='m-[10px] border-[1px] p-[5px]'>
                <div className='bg-[#CDD4E6] p-[10px] my-[10px]'>
                    <p className='text-[30px] text-center font-bold'>QUẢN LÝ CÁC BÀI TẬP</p>
                </div>
                <hr className='m-[10px]' />
                <div className='flex items-center'>
                    <button onClick={() => { setMadd(1) }} className='ms-auto border-[1px] rounded-[10px] px-[10px] py-[5px]'><p className='text-[18px] font-bold'>Thêm</p></button>
                </div>
                <table className='table-auto w-full my-[10px]'>
                    <thead className='bg-[violet]'>
                        <tr className='text-center'>
                            <th><input type='checkbox' /></th>
                            <th>TÊN BÀI TẬP</th>
                            <th>TÊN DANH MỤC</th>
                            <th>NGÀY TẠO</th>
                            <th>CHỨC NĂNG</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            exercise.length > 0 && exercise.map((item) => (
                                <tr className='text-center hover:bg-[#CDD4E6]'>
                                    <td><input type='checkbox' /></td>
                                    <td>{item.name}</td>
                                    <td>{item.nameDm}</td>
                                    <td>{formatTimestamp(item.timeCreate)}</td>
                                    <td>
                                        <div className='flex items-center justify-center'>
                                            <button
                                                onClick={() => {
                                                    setMedit(1);
                                                    setEditName(item.name);
                                                    setEditIntro(item.introduction);
                                                    setEditCarlo(item.carlo);
                                                    setIdEdit(item.idDm);
                                                    setEdit(item);
                                                }} className='border-[1px] rounded-[10px] px-[15px] py-[5px] mx-[10px]'>Sửa</button>
                                            <button onClick={() => { setMdel(1); setIdDel(item) }} className='border-[1px] rounded-[10px] px-[15px] py-[5px]'>Xóa</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {/* thêm */}
            <Modal open={Madd} onCancel={() => { setMadd(0) }} onOk={handleAdd} okButtonProps={{ className: 'bg-primary' }}>
                <div className='flex-col justify-center items-center'>
                        {uploadProgress > 0 && <div>Đang tải {uploadProgress}</div>}
                    <p className='text-center text-[20px] font-bold my-[10px]'>Thêm bài tập mới</p>
                    <div className='flex items-center my-[10px]'>
                        <p className='text-[17px] font-bold me-auto'>Tên bài tập</p>
                        <input type='text' value={nameBt} onChange={(e) => { setNameBt(e.target.value) }}
                            placeholder='Nhập tên bài tập'
                            className='border-[1px] rounded-[10px] p-[5px] w-[200px] ms-auto'
                        />
                    </div>
                    <div className='flex items-center my-[10px]'>
                        <p className='text-[17px] font-bold me-auto'>Chọn danh mục</p>
                        {
                            dataOp.length > 0 &&
                            <Select
                                defaultValue="Không"
                                style={{
                                    width: 200,
                                }}
                                onChange={handleChange}
                                options={dataOp}
                            />
                        }
                    </div>
                    <div className='flex-col my-[10px]'>
                        <p className='text-[17px] font-bold me-auto'>Mô tả bài tập</p>
                        <textarea value={descript} onChange={(e) => { setDescript(e.target.value) }} placeholder='Mô tả cho bài tập' className='w-full border-[1px] rounded-[10px] p-[5px]' />
                    </div>
                    <div className='flex items-center my-[10px]'>
                        <p className='text-[17px] font-bold me-auto'>Số carlo tiêu thụ</p>
                        <input type='number' value={carlo} onChange={(e) => { setCarlo(e.target.value) }}
                            placeholder='Nhập số carlo'
                            className='border-[1px] rounded-[10px] p-[5px] w-[200px] ms-auto'
                        />
                    </div>
                    <div className='flex-col my-[10px]'>
                        <p className='text-[17px] font-bold me-auto'>Hình ảnh</p>
                        <input type='file' onChange={(e) => { setFileList(e.target.files[0]) }} />
                    </div>
                    <div className='flex-col my-[10px]'>
                        <p className='text-[17px] font-bold me-auto'>Video</p>
                        <input type='file' onChange={(e) => { setFileListVideo(e.target.files[0]) }}></input>
                    </div>
                </div>
            </Modal>
            {/* xem */}
            <Modal open={Mview} onCancel={() => { setMview(0) }} onOk={handleView} okButtonProps={{ className: 'bg-primary' }}>
                <div className='flex-col justify-center items-center'>
                    <p className='text-center text-[20px] font-bold my-[10px]'>Thêm bài tập mới</p>
                    <div className='flex items-center my-[10px]'>
                        <p className='text-[17px] font-bold me-auto'>Tên bài tập</p>
                        <input type='text' placeholder='Nhập tên bài tập' className='border-[1px] rounded-[10px] p-[5px] w-[200px] ms-auto' disabled />
                    </div>
                    <div className='flex items-center my-[10px]'>
                        <p className='text-[17px] font-bold me-auto'>Chọn danh mục</p>
                        <input type='text' placeholder='Tên danh mục' className='border-[1px] rounded-[10px] p-[5px] w-[200px] ms-auto' disabled />
                    </div>
                    <div className='flex-col my-[10px]'>
                        <p className='text-[17px] font-bold me-auto'>Mô tả bài tập</p>
                        <textarea placeholder='Mô tả cho bài tập' value={descript} onChange={(e) => setDescript(e.target.value)}
                            className='w-full border-[1px] rounded-[10px] p-[5px]' disabled />
                    </div>
                    <div className='flex-col my-[10px]'>
                        <p className='text-[17px] font-bold me-auto'>Hình ảnh</p>
                        <input type='file' />
                    </div>
                    <div className='flex-col my-[10px]'>
                        <p className='text-[17px] font-bold me-auto'>Video</p>
                        <input type='file' />
                    </div>
                </div>
            </Modal>
            {/* sửa */}
            <Modal open={Medit} onCancel={() => { setMedit(0) }} onOk={handleEdit} okButtonProps={{ className: 'bg-primary' }}>
                {
                    edit &&
                    <div className='flex-col justify-center items-center'>
                        <p className='text-center text-[20px] font-bold my-[10px]'>Chỉnh sửa bài tập</p>
                        <div className='flex items-center my-[10px]'>
                            <p className='text-[17px] font-bold me-auto'>Tên bài tập</p>
                            <input type='text'
                                value={editName}
                                onChange={(e) => {setEditName(e.target.value);}}
                                placeholder='Nhập tên bài tập' className='border-[1px] rounded-[10px] p-[5px] w-[200px] ms-auto' />
                        </div>
                        <div className='flex items-center my-[10px]'>
                            <p className='text-[17px] font-bold me-auto'>Chọn danh mục</p>
                            {
                                dataOp.length > 0 &&
                                <Select
                                    defaultValue={edit.idDm}
                                    style={{
                                        width: 200,
                                    }}
                                    onChange={(value) => {
                                        setIdEdit(value);
                                    }}
                                    options={dataOp}
                                    disabled
                                />
                            }
                        </div>
                        <div className='flex-col my-[10px]'>
                            <p className='text-[17px] font-bold me-auto'>Mô tả bài tập</p>
                            <textarea value={editIntro}
                                onChange={(e) => {
                                    setEditIntro(e.target.value);
                                }}
                                placeholder='Mô tả cho bài tập' className='w-full border-[1px] rounded-[10px] p-[5px]' />
                        </div>
                        <div className='flex items-center my-[10px]'>
                            <p className='text-[17px] font-bold me-auto'>Số carlo tiêu thụ</p>
                            <input type='number' value={editcarlo}
                                onChange={(e) => {
                                    setEditCarlo(e.target.value);
                                }}
                                placeholder='Nhập số carlo'
                                className='border-[1px] rounded-[10px] p-[5px] w-[200px] ms-auto'
                            />
                        </div>
                        <div className='flex-col my-[10px]'>
                            <p className='text-[17px] font-bold me-auto'>Hình ảnh</p>
                            <img alt='hình ảnh' src={edit.image} />
                        </div>
                        <div className='flex-col my-[10px]'>
                            <p className='text-[17px] font-bold me-auto'>Hình ảnh</p>
                            <input type='file' onChange={(e) => { setFileList(e.target.files[0]) }} />
                        </div>
                        <div className='flex-col my-[10px]'>
                            <p className='text-[17px] font-bold me-auto'>Video</p>
                            <video src={edit.video}></video>
                        </div>
                        <div className='flex-col my-[10px]'>
                            <p className='text-[17px] font-bold me-auto'>Video</p>
                            <input type='file' onChange={(e) => { setFileListVideo(e.target.files[0]) }}></input>
                        </div>
                    </div>
                }
            </Modal>
            {/* xóa */}
            <Modal open={Mdel} onCancel={() => { setMdel(0) }} onOk={handleDel} okButtonProps={{ className: 'bg-primary' }}>
                <p className='text-center text-[20px] font-bold my-[10px]'>Bạn có chắc muốn xóa không ?</p>
            </Modal>
        </>
    );
};
export default ListExercise;