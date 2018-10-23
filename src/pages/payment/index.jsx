import React from 'react';
import classNames from 'classnames';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MoneyIcon from '@material-ui/icons/AttachMoneyOutlined';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1
  },
  formControl: {
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    minWidth: 120,
  },
  formControlMedium: {
    minWidth: 350,
  },
  formControlInline: {
    marginRight: 16,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  icon: {
    marginLeft: 8,
    marginRight: 8
  }
});

const clientes = [
  {},
  {
    image: 'https://avatars1.githubusercontent.com/u/26730826?s=460&v=4',
    name: 'Peu'
  },
  {
    image: 'https://avatars3.githubusercontent.com/u/19671668?s=460&v=4',
    name: 'Genê'
  },
  {
    image: 'https://avatars0.githubusercontent.com/u/22510441?s=460&v=4',
    name: 'Ravi'
  }
];

class Payment extends React.Component {
  state = {
    paymentMode: '',
    cod: '',
    labelWidth: 0,
    payedValue: 0,
    change: 0,
    cardNumber: '',
    cardCvv: '',
    isConfirming: false,
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    });
  }

  handleChange = event => {
    const { name, value } = event.target;
    if (name === 'paymentMode') {
      this.setState({
        cardNumber: '',
        cardCvv: '',
        payedValue: value === 10 ? this.props.location.state.value : 0,
      });
    }
    this.setState({ [name]: value });
  };

  dialogClose = () => {
    this.setState({
      isConfirming: false,
    })
  }

  dialogOpen = () => {
    this.setState({
      isConfirming: true,
    })
  }


  clean = () => {
    this.setState({
      paymentMode: '',
      cod: '',
      labelWidth: 0,
      payedValue: 0,
      change: 0,
      cardNumber: '',
      cardCvv: '',
      isConfirming: false,
    })

    this.dialogClose()
  }

  render() {
    const { classes, location, history } = this.props;
    const { cod, paymentMode, cardCvv, cardNumber, payedValue } = this.state;

    const user = cod > 0 && cod < 4 ? cod : false;
    if (!location.state) {
      history.push('/caixa');
    }

    const change = payedValue - location.state.value

    const buttonDisabled = !((!!cardNumber && !!cardCvv) || !!payedValue)

    console.log(this.state);

    return (
      <div>
        <AppBar position="static" style={{ boxShadow: 'none' }}>
          <Toolbar>
            <MoneyIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Pagamento
            </Typography>
            <Button
              style={{ position: 'absolute', right: 24 }}
              variant="contained"
              color="secondary"
              onClick={() => history.push('/caixa')}
            >
              Cancelar Compra
            </Button>
          </Toolbar>
        </AppBar>
        <div style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: 8 }}>
            <img
              style={{ width: 100, borderRadius: 60, padding: 8 }}
              alt="cliente"
              src={
                user
                  ? clientes[cod].image
                  : 'https://i0.wp.com/azizilife.com/wp-content/uploads/2016/09/placeholder.jpg?ssl=1'
              }
            />
            <div>
              <Typography
                variant="h5"
                gutterBottom
                style={{ fontWeight: 800, marginBottom: 8 }}
              >
                {user ? clientes[cod].name : ''}
              </Typography>
              <Typography
                variant="caption"
                gutterBottom
                className={classes.caption}
              >
                {user ? `Código: ${cod}` : ''}
              </Typography>
            </div>
          </div>
          <FormControl
            fullWidth
            variant="outlined"
            className={classes.formControl}
          >
            <TextField
              onChange={this.handleChange}
              name="cod"
              value={cod}
              id="outlined-name"
              label="Código do cliente"
              variant="outlined"
            />
          </FormControl>

          <form className={classes.root} autoComplete="off">
            <FormControl
              fullWidth
              variant="outlined"
              className={classes.formControl}
            >
              <InputLabel
                ref={ref => {
                  this.InputLabelRef = ref;
                }}
                htmlFor="outlined-age-simple"
              >
                Forma de pagamento
              </InputLabel>
              <Select
                value={paymentMode}
                onChange={this.handleChange}
                disabled={!user}
                input={
                  <OutlinedInput
                    labelWidth={this.state.labelWidth}
                    name="paymentMode"
                    id="outlined-age-simple"
                  />
                }
              >
                <MenuItem value={10}>Cartão</MenuItem>
                <MenuItem value={20}>A vista</MenuItem>
                <MenuItem value={30}>Fiado</MenuItem>
              </Select>
            </FormControl>
            {paymentMode === 10 && (
              <div>
                <FormControl
                  variant="outlined"
                  className={
                    classNames(classes.formControl, classes.formControlInline, classes.formControlMedium)
                  }
                >
                  <TextField
                    onChange={this.handleChange}
                    name="cardNumber"
                    value={cardNumber}
                    id="outlined-number-card"
                    label="Numero do cartão"
                    variant="outlined"
                  />
                </FormControl>
                <FormControl
                  variant="outlined"
                  className={classNames(classes.formControl, classes.formControlInline)}
                >
                  <TextField
                    onChange={this.handleChange}
                    name="cardCvv"
                    value={cardCvv}
                    id="outlined-number-cvv"
                    label="Cvv"
                    variant="outlined"
                  />
                </FormControl>
              </div>
            )}
            {paymentMode === 20 && (
              <div>
                <FormControl
                  variant="outlined"
                  className={
                    classNames(classes.formControl, classes.formControlInline, classes.formControlMedium)
                  }
                >
                  <TextField
                    onChange={this.handleChange}
                    name="payedValue"
                    value={this.state.payedValue}
                    id="outlined-payed-value"
                    label="Valor pago"
                    variant="outlined"
                  />
                </FormControl>
              </div>
            )}
          </form>
          <h3>Total da compra R$ {location.state.value}</h3>
          <h3>Valor pago R$ {this.state.payedValue}</h3>
          <h3>Troco R$ {change > 0 ? change : 0}</h3>
          {/* {location.state.items.map(p => (
            <div>
              <img src={p.image} style={{ width: 100 }} alt="produto" />
              <h3>{p.name}</h3>
              <h3>{`R$ ${p.prodValue}`}</h3>
              <h3>{`Quantidade: ${p.qtd}`}</h3>
            </div>
          ))} */}
          <Button
            style={{ position: 'absolute', right: 24 }}
            variant="contained"
            color="secondary"
            disabled={buttonDisabled}
            onClick={this.dialogOpen}
          >

            {paymentMode === 30 ? 'Só amanhã' : 'Fechar Compra'}
          </Button>

          <Dialog
            open={this.state.isConfirming}
            onClose={this.dialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Deseja finalizar compra?"}</DialogTitle>
            <DialogActions>
              <Button onClick={this.dialogClose} color="primary">
              Voltar
            </Button>
              <Button onClick={this.clean} color="primary" autoFocus>
              Finalizar
            </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Payment);
