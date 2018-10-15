import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  content: {
    display: 'flex'
  },
  sideView: {
    width: '30%',
    marginLeft: 2
  },
  demo: {
    overflow: 'auto',
    borderRight: '1px solid #dddddd',
    marginTop: 2,
    height: 356,
    backgroundColor: theme.palette.background.paper
  }
});

function generate(element) {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

class Store extends React.Component {
  state = {
    empty: false
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Caixa
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          <div className={classes.sideView}>
            <Card>
              <CardContent>
                <Typography component="h3" variant="h3">
                  R$ 20,00
                </Typography>
              </CardContent>
            </Card>
            <div className={classes.demo}>
              <List dense>
                {generate(
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Single-line item"
                      secondary="Secondary text"
                    />
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                )}
              </List>
            </div>
            <Card>
              <CardContent>
                <Typography component="h3" variant="h3">
                  Itens: 3
                </Typography>
              </CardContent>
            </Card>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              size="large"
              onClick={() => this.setState({ empty: true })}
            >
              Cancelar Venda
            </Button>
          </div>
          <div>
            <h1>Info</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Store);
