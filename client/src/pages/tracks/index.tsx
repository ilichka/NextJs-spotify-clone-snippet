import React, {useEffect, useState} from 'react';
import MainLayout from "@/layouts/main-layout/main-layout.component";
import {Box, Button, Card, Grid, TextField} from "@mui/material";
import {useRouter} from "next/router";
import TrackList from "@/components/track-list/track-list.component";
import {useAppDispatch, useAppSelector} from "@/store/hooks/hook";
import {wrapper} from "@/store";
import {fetchTracks, searchTracks} from "@/store/slices/track/track.slice";

const Index = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [query, setQuery] = useState('')
    const [timer, setTimer] = useState<null | NodeJS.Timeout>(null)

    const {tracks, error} = useAppSelector(state => state.track)

    const search = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        if(timer) {
            clearTimeout(timer)
        }
        setTimer(()=>setTimeout(()=>{
            dispatch(searchTracks(e.target.value))
        },500))
    }

    useEffect(()=>{
        console.log('TRACKS',tracks)
    }, [tracks])


    if(error) {
        return <h1>{error}</h1>
    }

    return (
        <MainLayout title={"Список треков - музыкальная площадка"}>
            <Grid container justifyContent='center'>
                <Card style={{minWidth: '900px'}}>
                    <Box p={3}>
                        <Grid container justifyContent='space-between'>
                            <h1>Tracks list</h1>
                            <Button onClick={()=>router.push('tracks/create')}>Upload</Button>
                        </Grid>
                    </Box>
                    <TextField
                        fullWidth
                        value={query}
                        onChange={search}
                    />
                    <TrackList tracks={tracks} />
                </Card>
            </Grid>
        </MainLayout>
    );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({})=>{
    await store.dispatch(fetchTracks())
    return {
        props: {}
    }
})