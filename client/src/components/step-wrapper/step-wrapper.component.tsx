import React, {PropsWithChildren} from 'react';
import {Card, Container, Grid, Step, StepLabel, Stepper} from "@mui/material";
import {StepWrapperProps} from "@/components/step-wrapper/step-wrapper.interface";

const steps = ['Track info', 'Upload image', 'Upload audio']

const StepWrapper: React.FC<PropsWithChildren<StepWrapperProps>> = ({activeStep, children}) => {
    return (
        <Container>
            <Stepper activeStep={activeStep}>
                {steps.map((step, index) =>
                    <Step
                        key={index}
                        completed={activeStep > index}
                    >
                        <StepLabel>{step}</StepLabel>
                    </Step>
                )}
            </Stepper>
            <Grid container justifyContent="center" style={{margin: '70px 0 ', height: 270}}>
                <Card style={{width: 600}}>
                    {children}
                </Card>
            </Grid>
        </Container>
    );
};

export default StepWrapper;