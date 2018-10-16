import React from 'react';
import { withStyles } from '@material-ui/core/styles';
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
});

class ProductForm extends React.Component {
  state = {
    name: '',
    qtd: '',
    description: '',
    productCode: '',
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
        <FormLabel component="legend">Cadastrar <strong>Produto</strong></FormLabel>
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
          id="productCode"
          label="Código do produto"
          value={this.state.productCode}
          onChange={this.handleChange('productCode')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="qtd"
          label="quantidade em estoque"
          value={this.state.qtd}
          onChange={this.handleChange('qtd')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          variant="outlined"
        />
      </form>
    );
  }
}

export default withStyles(styles)(ProductForm);
