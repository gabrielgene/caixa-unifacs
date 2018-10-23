import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>
  );
}

export default withStyles(styles)(Topbar);
