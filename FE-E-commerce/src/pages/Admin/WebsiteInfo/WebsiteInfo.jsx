import React from 'react';
import './WebsiteInfo.scss';

const WebsiteInfo = () => {
    const value = 'https://example.com';
    const Phonevalue = '0123456789';
    return (
        <div className='website-info'>
            <h2 className='heading'>Thông tin trang web</h2>
            <hr />
            <div className='input-group'>
                <label className='input-label' htmlFor='websiteName'>Link trang web:</label>
                <input className='input-field' type='text' id='websiteName' placeholder='Nhập tên trang web' value={value} />
            </div>
            <div className='input-group'>
                <label className='input-label' htmlFor='websiteUrl'>Link tiktok:</label>
                <input className='input-field' type='url' id='websiteUrl' placeholder='Nhập địa chỉ URL' value={value} />
            </div>
            <div className='input-group'>
                <label className='input-label' htmlFor='websiteEmail'>Link facebook:</label>
                <input className='input-field' type='email' id='websiteEmail' placeholder='Nhập email liên hệ' value={value} />
            </div>
            <div className='input-group'>
                <label className='input-label' htmlFor='websitePhone'>Link ig:</label>
                <input className='input-field' type='tel' id='websitePhone' placeholder='Nhập số điện thoại' value={value} />
            </div>
            <div className='input-group'>
                <label className='input-label' htmlFor='websitePhone'>Số điện thoại:</label>
                <input className='input-field' type='tel' id='websitePhone' placeholder='Nhập số điện thoại' value={Phonevalue} />
            </div>
            <button className='save-button'>Lưu</button>
        </div>
    );
};

export default WebsiteInfo;