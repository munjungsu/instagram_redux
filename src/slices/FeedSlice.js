import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const getFeed = createAsyncThunk("GET_FEED_LIST", async(payload, {rejectWithValue})=>{
    let result = null;
    try {
        result = await axios.get(`${process.env.PUBLIC_URL}/data/user.json`)
    }catch(err){
        result = rejectWithValue(err.response);
    }
    return result;
});

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

export default feedSlice.reducer;