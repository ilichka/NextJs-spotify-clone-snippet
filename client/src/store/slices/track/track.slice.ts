import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {HYDRATE} from "next-redux-wrapper";


interface TrackState {
    tracks: any[]
    error: string
}

const initialState: TrackState = {
    tracks: [],
    error: ''
}

export const fetchTracks = createAsyncThunk('track/fetchTracks', async (_, thunkAPI)=>{
    try {
        const response = await axios.get('http://localhost:5000/track')
        console.log('ADDADADAD', response.data)
        return response.data
    } catch (e) {
        console.log('errrrrrrrrrrrrrrrrRR')
        return thunkAPI.rejectWithValue('ERROR WHILE LOADING')
    }
})

export const searchTracks = createAsyncThunk('track/searchTracks', async (query: string, thunkAPI)=>{
    try {
        const response = await axios.get(`http://localhost:5000/track/search?query=${query}`)
        console.log('ADDADADAD', response.data)
        return response.data
    } catch (e) {
        console.log('errrrrrrrrrrrrrrrrRR')
        return thunkAPI.rejectWithValue('ERROR WHILE LOADING')
    }
})

const trackSlice = createSlice({
    name: 'track',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(fetchTracks.fulfilled.type,(state, action: PayloadAction<any>)=>{
            state.tracks = action.payload
        })
        builder.addCase(searchTracks.fulfilled.type,(state, action: PayloadAction<any>)=>{
            state.tracks = action.payload
        })
    }
})

export default trackSlice.reducer