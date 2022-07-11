# 인스타그램 클론코딩/redux

### 프로젝트 구조
```
public
├── assets
│   ├── img
├── data
│   └── user.json
├── index.html
src
├── Components
│   ├── FeedLis.js
│   └── Top.js
├── pages
│   ├── Feed.js
│   └── Login.js
├── slices
│   └── FeedSlice.js
├── App.js
├── store.js
├── scss
│   ├──style.module.scss
└── index.js
```

### 로그인 기능
##### useRef()속성으로 input 값의 접근, 임시 로그인 계정정보와 input값의 value가 일치한다면 localStorage에 id,pw 등록한 뒤 useNavigate()속성으로 Feed페이지로 이동하게 하였습니다.
-----------
```
//임시 로그인 계정정보
const userInfo = {
    id : 'mjcah2013',
    pw : '1234@'
}
```

```
const login () =>{


const [userid, setUserid] = React.useState('');
const [userpw, setUserpw] = React.useState(''); 

const useridRef = React.useRef();
const userpwRef = React.useRef();

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
}
```
### 로그아웃 기능
##### 로그아웃 버튼 클릭시 localStorage에 등록했던 id,pw를 지우고 로그인 페이지로 이동하게 하였습니다.
---------
```
 const onDelete = ()=>{
        localStorage.removeItem('id');
        localStorage.removeItem('pw');
        navigate('/login');
    }
```

### slices
##### createAsyncThunk를 사용하여 데이터를 axios로 받아올 함수 구현, 받아온 데이터를 새롭게 담을 createSlice구현 
------
```
export const getFeed = createAsyncThunk("GET_FEED_LIST", async(payload, {rejectWithValue})=>{
    let result = null;
    try {
        result = await axios.get(`${process.env.PUBLIC_URL}/data/user.json`)
    }catch(err){
        result = rejectWithValue(err.response);
    }
    return result;
});
```
```
export const feedSlice = createSlice({
    name : 'feed',
    initialState : {
        rt : null,
        rtmsg : null,
        item : [],
        loading : false,
    },

    reducers : {},

    extraReducers : {
        [getFeed.pending] : (state, {payload})=>{
            return {
                ...state,
                loading : true,
            }
        },
        [getFeed.fulfilled] : (state, {payload})=>{

            return {
                ...state,
                rt : payload.status,
                rtmsg : payload.statusText,
                item : payload.data,
                loading : false,
            }
        },
        [getFeed.rejected] : (state, {payload})=>{
            return {
                ...state,
                rt : payload.status ? payload.status : 500,
                rtmsg : payload.statusText ? payload.statusText : 'Server Error',
                item : payload.data,
                loading : false
            }
        }
    }
});

```

### store.js
새로만든 FeedSlice에 name값을 스토어에 연결시킨다.
--------
```
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import FeedSlice from './slices/FeedSlice';


const logger = createLogger();
const store = configureStore({
   
    reducer: {
        'feed' : FeedSlice,
        
    },    
   
    
    middleware: [...getDefaultMiddleware({serializableCheck: false}), logger], 
    });
    export default store;
```
### 피드
##### useSelector()로 slice에 name속성을 연결, dispatch함수로 데이터를 받아올때 만든 함수를 구독시킵니다.
------
```
const Feed = () => {

    const dispatch = useDispatch();
    const {rt, rtmsg, item, loading} = useSelector((state)=>state.feed);
    React.useEffect(()=>{
        dispatch(getFeed());
        
    }, [])
    

    return (
        <div>
            {loading && (
                <Loading />
            )}
            {rt !== 200 ? (
                <div>
                    {rt},{rtmsg}
                </div>
            ) : (
                <div>
                    <Top />
                    <FeedList user={item.user}/>
                    
                </div>  
            )}
        </div>
    );
};
```
### 피드리스트
Feed.js에서 props로 받아온 데이터를 map()함수를 사용하여 출력
--------
```
const FeedList = ({user}) => {
    {user && user.map((v, i)=>(
        ....
    ))}
}
```
