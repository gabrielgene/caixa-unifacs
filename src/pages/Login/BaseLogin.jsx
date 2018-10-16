import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: theme.spacing.unit * 3,
  },
  formWrapper: {
    width: 400,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 2,
  },
  button: {
    marginTop: theme.spacing.unit * 2,
  },
});

class BaseLogin extends Component {
  state = {
    user: '',
    pass: '',
    hasError: false,
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onSubmit = () => {
    const { user, pass } = this.state;

    if (this.props.type === 'admin') {
      if (user === 'admin' && pass === 'admin') {
        this.props.history.push('/cadastro')
      } else {
        this.setState({ hasError: true })
      }
    } else {
      if (user === 'caixa' && pass === '123') {
        this.props.history.push('/caixa')
      } else {
        this.setState({ hasError: true })
      }
    }
  }

  render() {
    const { classes, type } = this.props;
    const isAdmin = type === 'admin'

    return (
      <div className={classes.root}>
        <div className={classes.formWrapper}>
          <Typography
            color={isAdmin ? 'primary' : 'secondary'}
            className={classes.title}
            variant="h3"
          >
            {isAdmin ? 'Cadastro' : 'Caixa'}
          </Typography>
          <TextField
            id="user"
            label="Usuário"
            autoComplete="off"
            placeholder="Ex: John Doe"
            InputLabelProps={{
              shrink: true,
            }}
            value={this.state.user}
            onChange={this.handleChange('user')}
            margin="normal"
          />
          <TextField
            id="pass"
            label="Senha"
            autoComplete="off"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Ex: ********"
            type="password"
            value={this.state.pass}
            onChange={this.handleChange('pass')}
            margin="normal"
          />
          {this.state.hasError &&
            <Typography
              color='error'
              variant="subtitle1"
            >
              usuario errado
            </Typography>
          }
          <Button
            className={classes.button}
            variant="contained"
            color={isAdmin ? 'primary' : 'secondary'}
            onClick={this.onSubmit}
          >
            Entrar
          </Button>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(BaseLogin);
