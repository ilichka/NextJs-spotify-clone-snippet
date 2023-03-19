import React, {FC} from 'react';
import {TrackListProps} from "@/components/track-list/track-list.interface";
import {Box, Grid} from "@mui/material";
import TrackItem from "@/components/track-item/track-item.component";

const TrackList: FC<TrackListProps> = ({tracks}) => {
    return (
        <Grid container direction='column'>
            <Box p={2}>
                {tracks.map(track=><TrackItem track={track} key={track._id}></TrackItem>)}
            </Box>
        </Grid>
    );
};

export default TrackList;