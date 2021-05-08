import { Button, Container, Typography,Grid, Paper } from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles({
    buttons:{
        marginTop:10,

    }
})

const Test = () => {
    const classes = useStyles();
   return (
       <Container>
       <Typography variant="h5">Hello</Typography>
       <Button color="primary" variant="contained" disableElevation className={classes.buttons}>Click</Button>
       <Grid container>
           <Grid item xs={12} sm={6} md={3} >
             <Paper>1</Paper>
           </Grid>
           <Grid item xs={12}  sm={6} md={3} >
             <Paper>2</Paper>
           </Grid>
           <Grid item xs={12}  sm={6} md={3} >
             <Paper>3</Paper>
           </Grid>
           <Grid item xs={12}  sm={6} md={3} >
             <Paper>4</Paper>
           </Grid>
       </Grid>
       </Container>
   )
    
}

export default Test
