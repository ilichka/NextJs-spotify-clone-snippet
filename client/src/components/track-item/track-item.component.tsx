import React, {FC} from 'react';
import {TrackItemProps} from "@/components/track-item/track-item.interface";
import styles from './../../styles/track-item.module.scss'
import {Card, Grid, IconButton} from "@mui/material";
import {Delete, PauseCircle, PlayCircle} from "@mui/icons-material";
import {useRouter} from "next/router";
import {useAppDispatch} from "@/store/hooks/hook";
import {playTrack, setActive} from "@/store/slices/player/player.slice";

const TrackItem: FC<TrackItemProps> = ({track, active= false}) => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const play = (e) => {
        e.stopPropagation()
        dispatch(setActive(track))
        dispatch(playTrack())
    }

    return (
        <Card className={styles.track} onClick={()=>router.push(`/tracks/${track?._id}`)}>
            <IconButton onClick={play}>
                {active ? <PauseCircle/> : <PlayCircle />}
            </IconButton>
            <img width={70} height={70} src={'http://localhost:5000/' + track?.picture}/>
            <Grid container direction='column' style={{maxWidth: '200px'}}>
                <div>{track?.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{track?.artist}</div>
            </Grid>
            {active && <div> 123 /123 </div>}
            <IconButton style={{marginLeft: 'auto'}} onClick={e => e.stopPropagation()}>
                <Delete/>
            </IconButton>
        </Card>
    );
};

export default TrackItem;