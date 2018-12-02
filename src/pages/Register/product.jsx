import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { createProduct } from '../../fetches';

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
});

class ProductForm extends React.Component {
  state = {
    name: '',
    picture: '',
    cod: '',
    price: 0,
    amount: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = () => {
    createProduct(this.state);
    this.setState({
      name: '',
      picture: '',
      cod: '',
      price: 0,
      amount: '',
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off">
          <FormLabel component="legend">
            Cadastrar <strong>Produto</strong>
          </FormLabel>
          <TextField
            id="name"
            label="Nome do produto"
            fullWidth
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="picture"
            label="Imagem"
            value={this.state.picture}
            onChange={this.handleChange('picture')}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="price"
            label="Preço"
            type="number"
            value={this.state.price}
            onChange={this.handleChange('price')}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="productCode"
            label="Código do produto"
            value={this.state.cod}
            onChange={this.handleChange('cod')}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="amount"
            label="Quantidade em estoque"
            value={this.state.amount}
            onChange={this.handleChange('amount')}
            type="number"
            className={classes.textField}
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

export default withStyles(styles)(ProductForm);
