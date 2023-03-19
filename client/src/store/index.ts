import {combineReducers} from "redux";
import playerReducers from './slices/player/player.slice'
import trackReducer from './slices/track/track.slice'
import {configureStore} from "@reduxjs/toolkit";
import {Context, createWrapper, HYDRATE, MakeStore} from 'next-redux-wrapper'

const rootReducer = combineReducers({
    player: playerReducers,
    track: trackReducer
})

export const masterReducer = (state, action) => {
    if (action.type === HYDRATE) {
        return {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        }
    } else {
        return rootReducer(state, action)
    }
}

const makeStore = (context: Context) =>
    configureStore({
        reducer: masterReducer,
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, {debug: true})