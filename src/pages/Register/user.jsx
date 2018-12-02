import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { createUser } from '../../fetches';

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

const accountTypes = [
  {
    value: 'admin',
    label: 'Administrador',
  },
  {
    value: 'operator',
    label: 'Operador de caixa',
  },
];

class UserForm extends React.Component {
  state = {
    name: '',
    type: '',
    user: '',
    pass: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = () => {
    createUser(this.state);
    this.setState({
      name: '',
      type: '',
      user: '',
      pass: '',
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off">
          <FormLabel style={{ marginLeft: 8 }} component="legend">
            Cadastrar <strong>Usuário</strong>
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
            id="description"
            label="Usuário"
            value={this.state.user}
            onChange={this.handleChange('user')}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="age"
            label="Senha"
            value={this.state.pass}
            onChange={this.handleChange('pass')}
            type="password"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="type"
            select
            label="Select"
            className={classes.textField}
            value={this.state.type}
            onChange={this.handleChange('type')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Selecione o tipo de usuário"
            margin="normal"
            variant="outlined"
          >
            {accountTypes.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
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

export default withStyles(styles)(UserForm);
