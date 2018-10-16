import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

import UserForm from './user';
import CustomerForm from './customer';
import ProductForm from './product';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class RadioButtonsGroup extends React.Component {
  state = {
    value: 'user',
    key: 0,
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = () => {
    console.log('handle submit');
    this.setState({ key: this.state.key + 1 })
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Tipo</FormLabel>
          <RadioGroup
            aria-label="objectType"
            name="objectType"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel value="user" control={<Radio />} label="Usuário" />
            <FormControlLabel value="customer" control={<Radio />} label="Cliente" />
            <FormControlLabel value="product" control={<Radio />} label="Produto" />
          </RadioGroup>
        </FormControl>
        <div>
          {value === 'user' && <UserForm key={this.state.key} />}
          {value === 'customer' && <CustomerForm key={this.state.key + 5} />}
          {value === 'product' && <ProductForm key={this.state.key + 10} /> }
          <Button onClick={this.handleSubmit} variant="contained" color="primary" className={classes.button}>
            Cadastrar
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(RadioButtonsGroup);