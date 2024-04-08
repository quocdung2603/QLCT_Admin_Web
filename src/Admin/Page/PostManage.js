import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

const WorkoutDirectory = () => {
    // modal
    const [Madd, setMadd] = useState(0);
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
    // hinh anh
    const [fileList, setFileList] = useState([

    ]);
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };
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
                            <th>NGÀY TẠO</th>
                            <th>NGÀY CHỈNH SỬA</th>
                            <th>CHỨC NĂNG</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='text-center hover:bg-[#CDD4E6]'>
                            <td><input type='checkbox' /></td>
                            <td>VÚ</td>
                            <td>04-07-2024</td>
                            <td>04-07-2024</td>
                            <td>
                                <div className='flex items-center justify-center'>
                                    <button onClick={() => { setMview(1) }} className='border-[1px] rounded-[10px] px-[15px] py-[5px]'>Xem</button>
                                    <button onClick={() => { setMedit(1) }} className='border-[1px] rounded-[10px] px-[15px] py-[5px] mx-[10px]'>Sửa</button>
                                    <button onClick={() => { setMdel(1) }} className='border-[1px] rounded-[10px] px-[15px] py-[5px]'>Xóa</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* thêm */}
            <Modal open={Madd} onCancel={() => { setMadd(0) }} onOk={handleAdd} okButtonProps={{ className: 'bg-primary' }}>
                <div className='flex-col justify-center items-center'>
                    <p className='text-center text-[20px] font-bold my-[10px]'>Thêm bài viết</p>
                    <div className='flex items-center my-[10px]'>
                        <p className='text-[17px] font-bold me-auto'>Tiêu đề bài viết</p>
                        <input type='text' placeholder='Nhập tiêu đề bài viết' className='border-[1px] rounded-[10px] p-[5px] w-[200px] ms-auto' />
                    </div>
                    <div className='flex-col my-[10px]'>
                        <p className='text-[17px] font-bold me-auto'>Mô tả bài viết</p>
                        <textarea placeholder='Mô tả bài viết' className='w-full border-[1px] rounded-[10px] p-[5px]' />
                    </div>
                    <div className='flex-col my-[10px]'>
                        <p className='text-[17px] font-bold me-auto'>Chi tiết bài viết</p>
                        <textarea placeholder='Chi tiết bài viết' className='w-full border-[1px] rounded-[10px] p-[5px]' />
                    </div>
                    <div className='flex-col my-[10px]'>
                        <p className='text-[17px] font-bold me-auto'>Hình ảnh</p>
                        <ImgCrop rotationSlider>
                            <Upload
                                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                listType="picture-card"
                                fileList={fileList}
                                onChange={onChange}
                                onPreview={onPreview}
                            >
                                {fileList.length < 5 && '+ Upload'}
                            </Upload>
                        </ImgCrop>
                    </div>
                </div>
            </Modal>
            {/* xem */}
            <Modal open={Mview} onCancel={() => { setMview(0) }} onOk={handleView} okButtonProps={{ className: 'bg-primary' }}>
                <div className='flex-col justify-center items-center'>
                    <p className='text-center text-[20px] font-bold my-[10px]'>Chi tiết bài viết</p>
                    <div className='flex items-center my-[10px]'>
                        <p className='text-[17px] font-bold me-auto'>Tiêu đề bài viết</p>
                        <input type='text' placeholder='Nhập tiêu đề bài viết' className='border-[1px] rounded-[10px] p-[5px] w-[200px] ms-auto' disabled />
                    </div>
                    <div className='flex-col my-[10px]'>
                        <p className='text-[17px] font-bold me-auto'>Mô tả bài viết</p>
                        <textarea placeholder='Mô tả bài viết' className='w-full border-[1px] rounded-[10px] p-[5px]' disabled />
                    </div>
                    <div className='flex-col my-[10px]'>
                        <p className='text-[17px] font-bold me-auto'>Chi tiết bài viết</p>
                        <textarea placeholder='Chi tiết bài viết' className='w-full border-[1px] rounded-[10px] p-[5px]' disabled />
                    </div>
                    <div className='flex-col my-[10px]'>
                        <p className='text-[17px] font-bold me-auto'>Hình ảnh</p>
                        <ImgCrop rotationSlider>
                            <Upload
                                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                listType="picture-card"
                                fileList={fileList}
                                onChange={onChange}
                                onPreview={onPreview}
                                disabled
                            >
                                {fileList.length < 5 && '+ Upload'}
                            </Upload>
                        </ImgCrop>
                    </div>
                </div>
            </Modal>
            {/* sửa */}
            <Modal open={Medit} onCancel={() => { setMedit(0) }} onOk={handleEdit} okButtonProps={{ className: 'bg-primary' }}>
                <div className='flex-col justify-center items-center'>
                    <p className='text-center text-[20px] font-bold my-[10px]'>Chỉnh sửa bài viết</p>
                    <div className='flex items-center my-[10px]'>
                        <p className='text-[17px] font-bold me-auto'>Tiêu đề bài viết</p>
                        <input type='text' placeholder='Nhập tiêu đề bài viết' className='border-[1px] rounded-[10px] p-[5px] w-[200px] ms-auto' />
                    </div>
                    <div className='flex-col my-[10px]'>
                        <p className='text-[17px] font-bold me-auto'>Mô tả bài viết</p>
                        <textarea placeholder='Mô tả bài viết' className='w-full border-[1px] rounded-[10px] p-[5px]' />
                    </div>
                    <div className='flex-col my-[10px]'>
                        <p className='text-[17px] font-bold me-auto'>Chi tiết bài viết</p>
                        <textarea placeholder='Chi tiết bài viết' className='w-full border-[1px] rounded-[10px] p-[5px]' />
                    </div>
                    <div className='flex-col my-[10px]'>
                        <p className='text-[17px] font-bold me-auto'>Hình ảnh</p>
                        <ImgCrop rotationSlider>
                            <Upload
                                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                listType="picture-card"
                                fileList={fileList}
                                onChange={onChange}
                                onPreview={onPreview}
                            >
                                {fileList.length < 5 && '+ Upload'}
                            </Upload>
                        </ImgCrop>
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