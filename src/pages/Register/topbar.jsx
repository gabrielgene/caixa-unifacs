import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';

const styles = {
  root: {
    display: 'flex',
  },
  back: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
};

function Topbar(props) {
  const { classes } = props;
  return (
      <AppBar position="static">
        <Toolbar>
          <div className={classes.root}>
            <div onClick={() => props.goBack()} className={classes.back}>
              <IconButton color="inherit" aria-label="Menu">
                <ArrowBack />
              </IconButton>
              <Typography variant="h6" color="inherit">
                voltar
              </Typography>
            </div>
          </div>
        </Toolbar>
      </AppBar>
  );
}

export default withStyles(styles)(Topbar);
