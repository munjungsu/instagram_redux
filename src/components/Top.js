import React from 'react';
import {useNavigate} from 'react-router-dom';
import style from '../scss/style.module.scss';
const Top = () => {
    const navigate = useNavigate();
    const onDelete = ()=>{
        localStorage.removeItem('id');
        localStorage.removeItem('pw');
        navigate('/login');
    }
    return (
        <div className={style.Top}>
            <div className={style.headerTop}>
                <div className={style.leftBox}>
                    <h2>instagram</h2>
                </div>
                <div className={style.midBox}>
                    <input type="search" placeholder="검색"></input>
                </div>
                <div className={style.rightBox}>
                    <ul>
                        <li>
                            <a href="#">
                                <img src={process.env.PUBLIC_URL + '/assets/img/home.png'}></img>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img src={process.env.PUBLIC_URL + '/assets/img/talk.png'}></img>
                            </a>
                        </li>
                        <li>
                            <button type="button" onClick={onDelete} className={style.btn_logout}>로그아웃</button>
                        </li>
                    </ul>
                </div>
                
            </div>
        </div>
    );
};

export default Top;