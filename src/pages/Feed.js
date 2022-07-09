import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getFeed} from '../slices/FeedSlice';

import Top from '../components/Top';
import FeedList from '../components/FeedList';
import Loading from '../components/Loading';
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

export default Feed;