import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { createCustomer } from '../../fetches';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 24,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

class CustomerForm extends React.Component {
  state = {
    name: '',
    picture: '',
    cod: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = () => {
    createCustomer(this.state);
    this.setState({
      name: '',
      picture: '',
      cod: '',
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off">
          <FormLabel component="legend">
            Cadastrar <strong>Cliente</strong>
          </FormLabel>
          <TextField
            id="name"
            label="Nome"
            fullWidth
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="picture"
            label="Foto"
            fullWidth
            className={classes.textField}
            value={this.state.picture}
            onChange={this.handleChange('picture')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="cod"
            label="Código"
            className={classes.textField}
            value={this.state.cod}
            onChange={this.handleChange('cod')}
            margin="normal"
            variant="outlined"
          />
        </form>
        <Button
          onClick={this.handleSubmit}
          variant="contained"
          color="primary"
          className={classes.button}
          style={{ marginLeft: 8 }}
        >
          Cadastrar
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(CustomerForm);
