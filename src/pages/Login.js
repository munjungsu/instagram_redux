import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../scss/style.module.scss';

//임시 로그인 계정
const userInfo = {
    id : 'mjcah2013',
    pw : '1234@'
}

const Login = () => {
    
    const navigate = useNavigate();
    const useridRef = React.useRef();
    const userpwRef = React.useRef();
    
    

    const [userid, setUserid] = React.useState('');
    const [userpw, setUserpw] = React.useState(''); 
    

    const handleSubmit = ()=>{
        const idvalue = useridRef.current.value;
        const pwvalue = userpwRef.current.value;
        setUserid(idvalue);
        setUserpw(pwvalue);
        
        if(idvalue === userInfo.id && pwvalue === userInfo.pw){
            alert('로그인 성공')
            localStorage.setItem('id', idvalue);
            localStorage.setItem('pw', pwvalue);
            navigate('/feed');
        }
        else {
            alert('아이디와 비밀번호가 다릅니다.');
            idvalue.current.value = '';
            pwvalue.current.value = '';
        }
        
    }

    
    
    return (
        <div className={style.container}>
            <h1>instagram</h1>
            <form onSubmit={handleSubmit}>
                <section className={style.login_form}>
                    <input type="text" name="id" id="id" ref={useridRef}  required   placeholder="전화번호, 사용자 이름 또는 이메일"className={style.form_control}/>
                    <input type="password" name="password" id="password" ref={userpwRef}placeholder="비밀번호" required className={style.form_control}/>
              
                
                    <div>
                        <button type="submit" className={style.btn}>로그인</button>
                    </div>
                    <div className={style.box}>
                      <div className={style.line}>또는</div>
                      <a href="#" style={{marginTop : '10px'}}>Facebook으로 로그인</a>
                      <a href="#">비밀번호 찾기</a>
                    </div>
                </section>
            </form>
            <div className={style.box2}>
                <p>계정이 없으신가요?
                    <a href="#"><span>가입하기</span></a>
                </p>
            </div>
            <div>
                <p>앱을 다운로드 하세요</p>
                <div className={style.footer}>
                    <a href="#">
                        <img src={process.env.PUBLIC_URL + '/assets/img/google.png'}></img>
                    </a>
                    <a href="#">
                        <img src={process.env.PUBLIC_URL + '/assets/img/app.png'}></img>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;