import React, {useState} from 'react';
import MainLayout from "@/layouts/main-layout/main-layout.component";
import {Button, Grid, TextField} from "@mui/material";
import {useRouter} from "next/router";
import axios from "axios";
import {GetServerSideProps} from "next";
import {useInput} from "@/useInput";

const TrackPage = ({serverTrack}) => {
    const [track, setTrack] = useState(serverTrack)
    const router = useRouter()

    const username = useInput('')
    const text = useInput('')

    const addComment = async () => {
        try {
            const response = await axios.post('http://localhost:5000/track/comment', {
                username: username.value,
                text: text.value,
                trackId: track._id
            })
            setTrack({...track, comments: [...track.comments, response.data]})
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <MainLayout>
            <Button onClick={()=>router.push('/tracks')}>
                To list
            </Button>
            <Grid container style={{margin: '20px 0'}}>
                <img src={'http://localhost:5000/' + track.picture} width={200} height={200}/>
                <div style={{margin: '20px 0'}}>
                    <h1>Track name - {track.name}</h1>
                    <h1>Artist - {track.artist}</h1>
                    <h1>Listens count - {track.listens}</h1>
                </div>
            </Grid>
            <h1>Text</h1>
           <p>{track.text}</p>
            <h1>Comments</h1>
            <Grid container>
                <TextField
                    label='Your name'
                    fullWidth
                    {...username}
                />
                <TextField
                    label='Comment'
                    {...text}
                    fullWidth
                    multiline
                    rows={4}
                />
                <Button onClick={addComment}>Send</Button>
            </Grid>
            <div>
                {track.comments.map((comment)=> <div>
                    <div>Author - {comment.username}</div>
                    <div>Comment - {comment.text}</div>
                </div>)}
            </div>
        </MainLayout>
    );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {params} = context
    const response = await axios.get(`http://localhost:5000/track/${params?.id}`)

    return {
        props: {
            serverTrack: response.data
        }
    }
}