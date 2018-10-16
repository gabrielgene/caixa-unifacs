import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';

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
    age: '',
    description: '',
    type: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <FormLabel component="legend">Cadastrar <strong>Usuário</strong></FormLabel>
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
          label="Descrição"
          multiline
          rowsMax="4"
          value={this.state.multiline}
          onChange={this.handleChange('description')}
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="age"
          label="Idade"
          value={this.state.age}
          onChange={this.handleChange('age')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
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
    );
  }
}

export default withStyles(styles)(UserForm);
