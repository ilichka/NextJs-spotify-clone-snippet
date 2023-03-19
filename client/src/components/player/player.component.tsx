import React, {useEffect} from 'react';
import {Grid, IconButton} from "@mui/material";
import styles from '../../styles/Player.module.scss'
import TrackProgress from "@/components/track-progress/track-progress.component";
import {Pause, PlayArrow, VolumeUp} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "@/store/hooks/hook";
import {pauseTrack, playTrack, setCurrentTime, setDuration, setVolume,} from "@/store/slices/player/player.slice";

let audio: HTMLAudioElement;

const Player = () => {
    const {pause, volume, active, duration, currentTime} = useAppSelector(state => state.player)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!audio) {
            audio = new Audio()
        } else {
            setAudio()
            handlePlay()
        }
    }, [active])

    const setAudio = () => {
        if (active) {
            audio.src = 'http://localhost:5000/' + active.audio
            audio.volume = volume / 100
            audio.onloadedmetadata = () => {
                dispatch(setDuration(Math.ceil(audio.duration)))
            }
            audio.ontimeupdate = () => {
                dispatch(setCurrentTime(Math.ceil(audio.currentTime)))
            }
        }
    }

    const handlePlay = () => {
        if (pause) {
            dispatch(playTrack())
            audio.play()
        } else {
            dispatch(pauseTrack())
            audio.pause()
        }
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value) / 100
        dispatch(setVolume(Number(e.target.value)))
    }
    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value)
        dispatch(setCurrentTime(Number(e.target.value)))
    }

    if (!active) {
        return null
    }

    return (
        <div className={styles.player}>
            <IconButton onClick={handlePlay}>
                {pause
                    ? <PlayArrow/>
                    : <Pause/>
                }
            </IconButton>
            <Grid container direction="column" style={{width: 200, margin: '0 20px'}}>
                <div>{active.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{active.artist}</div>
            </Grid>
            <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime}/>
            <VolumeUp style={{marginLeft: 'auto'}}/>
            <TrackProgress left={volume} right={100} onChange={changeVolume}/>
        </div>
    );
};

export default Player;