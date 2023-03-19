import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface PlayerState {
    active: null | any
    volume: number
    duration: number
    currentTime: number
    pause: boolean
}

const initialState: PlayerState = {
    currentTime: 0,
    duration: 0,
    active: null,
    volume: 50,
    pause: true
}

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        pauseTrack: (state) => {
            state.pause = true
        },
        playTrack: (state) => {
            state.pause = false
        },
        setCurrentTime: (state, action: PayloadAction<number>) => {
            state.currentTime = action.payload
        },
        setVolume: (state, action: PayloadAction<number>) => {
            state.volume = action.payload
        },
        setDuration: (state, action: PayloadAction<number>) => {
            state.duration = action.payload
        },
        setActive: (state, action: PayloadAction<any | null>) => {
            state.active = action.payload
            state.duration = 0
            state.currentTime = 0
        }
    }
})

export const { setDuration, playTrack, setCurrentTime, setVolume, setActive, pauseTrack } = playerSlice.actions

export default playerSlice.reducer