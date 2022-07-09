import React from 'react';
import style from '../scss/style.module.scss';
const FeedList = ({user}) => {

    
    const inputQuery = React.useRef();
    const [addcom, setAddCom] = React.useState([]);
    
    const handleClick = (e)=>{
        e.preventDefault();
        const value = inputQuery.current.value;
        
        
        setAddCom([...addcom, {com : value, localId : localStorage.id}]);
        console.log(value);
    }
    
    
    return (
        
        <div className={style.main}>
                
        {user && user.map((v)=>{
            
             return (
                <article className={style.content} key={v.id}>
                <ul>
                <li className={style.feed}>
                    <div className={style.list_top}>
                        <ul>
                            <li>
                            <img src={v.url} className={style.profile}/>
                            </li>
                            <li>
                            <span>{v.id}</span>
                            </li>
                        </ul>
                    </div>
                    <div className={style.ImgBox}>
                        <img src={v.url}></img>
                    </div>
                    <div>
                    <ul>
                        <li>
                            <a href="#" >
                                <img src={process.env.PUBLIC_URL + '/assets/img/heart.png'}  className={style.icon}/>   
                            </a>
                            <a href="#" >
                                <img src={process.env.PUBLIC_URL + '/assets/img/talk.png'} className={style.icon}/>
                            </a>
                            <a href="#">
                                <img src={process.env.PUBLIC_URL + '/assets/img/share.png'} className={style.icon}/>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={style.like}>
                <span>좋아요 {v.like} 개</span>
                </div>
                <div className={style.footer}>
                    <div className={style.id}>
                        <ul>
                            <li>{v.id}</li>
                            
                        </ul>
                    </div>
                    <div className={style.content}>
                        <ul>
                            <li>{v.msg}</li>
                        </ul>
                    </div>

                        
                    
                </div>
               <div className={style.coments}>
                
                    <div className={style.smile}>
                        <img src={process.env.PUBLIC_URL + '/assets/img/smile.png'}></img>
                    </div>
                        <input type="text" name="addcom" className={style.text} ref={inputQuery} placeholder="댓글추가.."/>
                    <button onClick={handleClick} className={style.btn_coments}>게시</button>
                
               </div>
                </li>
                </ul>
            </article>
            )
         })}
    </div>
    );
};

export default FeedList;