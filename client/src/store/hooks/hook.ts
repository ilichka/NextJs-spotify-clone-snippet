import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppState, AppStore} from "@/store";


export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector:TypedUseSelectorHook<AppState> = useSelector