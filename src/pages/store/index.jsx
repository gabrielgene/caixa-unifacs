import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ShopIcon from '@material-ui/icons/ShoppingCartOutlined';
import InputAdornment from '@material-ui/core/InputAdornment';
import { getProducts } from '../../fetches';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  content: {
    display: 'flex',
  },
  product: {
    width: '50%',
    padding: 16,
  },
  productList: {
    width: '30%',
    backgroundColor: '#fafafa',
  },
  productListHeader: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  productListContent: {
    height: 'calc(100vh - 148px)',
    overflow: 'auto',
    paddingLeft: 8,
    paddingRight: 8,
  },
  productResume: {
    width: '20%',
    backgroundColor: '#fafafa',
    display: 'flex',
    height: 'calc(100vh - 96px)',
    padding: 16,
    marginLeft: 8,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  sideView: {
    width: '40%',
    marginLeft: 2,
  },
  demo: {
    overflow: 'auto',
    borderRight: '1px solid #dddddd',
    marginTop: 2,
    height: 310,
    backgroundColor: theme.palette.background.paper,
  },
  info: {
    display: 'flex',
  },
  input: {
    margin: 16,
  },
  button: {
    marginTop: 24,
  },
  icon: {
    marginLeft: 8,
    marginRight: 8,
  },
  caption: {
    marginBottom: 12,
  },
});

const defaultState = {
  empty: false,
  cod: '',
  qtd: 1,
  value: 0,
  prodValue: 0,
  prodName: '',
  img: '',
  itemsAmount: 0,
  amount: 0,
  items: [],
  products: [],
};

class Store extends React.Component {
  state = {
    ...defaultState,
  };

  async componentDidMount() {
    const prod = await getProducts();
    this.setState({ products: prod });
  }

  handleChangeCod = event => {
    const { value } = event.target;
    const product = this.state.products.find(p => p.cod === value);
    this.setState({
      cod: value,
      img: product ? product.picture : '',
      prodName: product ? product.name : '',
      prodValue: product ? product.price : 0,
      amount: product ? product.amount : 0,
      qtd: 1,
    });
  };

  handleChangeAmount = event => {
    const { value } = event.target;
    const { cod, prodValue, products } = this.state;
    const product = products.find(p => p.cod === cod);
    this.setState({
      qtd: parseInt(value),
      prodValue: product ? product.price * value : prodValue * value,
    });
  };

  onAddItem = () => {
    const { cod, items, qtd, prodValue, value, products } = this.state;
    this.setState({
      items: [
        ...items,
        { ...products.find(p => p.cod === cod), qtd, prodValue },
      ],
      value: value + prodValue,
      cod: '',
    });
  };

  onDelete = index => {
    const { items, value } = this.state;
    const item = items.find((_, idx) => idx === index);
    this.setState({
      items: items.filter((_, idx) => idx !== index),
      value: value - item.prodValue,
    });
  };

  render() {
    const { classes, history } = this.props;
    const {
      img,
      value,
      prodValue,
      prodName,
      cod,
      qtd,
      items,
      amount,
    } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" style={{ boxShadow: 'none' }}>
          <Toolbar>
            <ShopIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Meu Caixa
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginRight: 8 }}
              onClick={() => history.push('/caixa/historico')}
            >
              Histórico
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => history.push('/')}
            >
              Sair
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          <div className={classes.product}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                id="outlined-name"
                label="Código do produto"
                className={classes.input}
                value={cod}
                onChange={this.handleChangeCod}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-name"
                label="Quantidade"
                className={classes.input}
                value={qtd}
                onChange={this.handleChangeAmount}
                margin="normal"
                type="number"
                variant="outlined"
              />
              <Button
                style={{ height: 56 }}
                variant="contained"
                color="primary"
                size="large"
                disabled={!(cod && amount >= qtd)}
                onClick={this.onAddItem}
              >
                Adicionar
              </Button>
            </div>
            <div>
              {cod && (
                <Card>
                  <CardContent>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <div>
                        <img src={img} style={{ width: 300 }} alt="produto" />
                      </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <TextField
                        id="outlined-name"
                        label="Descrição"
                        className={classes.input}
                        value={prodName}
                        margin="normal"
                        variant="outlined"
                        disabled
                      />
                      <TextField
                        id="outlined-name"
                        label="Estoque"
                        className={classes.input}
                        value={amount}
                        margin="normal"
                        variant="outlined"
                        disabled
                      />
                      <TextField
                        id="outlined-name"
                        label="Valor unitário"
                        className={classes.input}
                        value={Math.round(prodValue)}
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          ),
                        }}
                        disabled
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
          <div className={classes.productList}>
            <div className={classes.productListHeader}>
              <Typography
                variant="h5"
                gutterBottom
                style={{ fontWeight: 800, marginBottom: 8 }}
              >
                Produtos no carrinho
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                className={classes.caption}
              >
                {items.length} produtos
              </Typography>
            </div>
            <div className={classes.productListContent}>
              {items.map((p, idx) => (
                <Card
                  key={p._id}
                  style={{
                    boxShadow: 'none',
                    border: '1px solid #ececec',
                    padding: 16,
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 8,
                  }}
                >
                  <div style={{ display: 'flex' }}>
                    <div>
                      <img
                        src={p.picture}
                        style={{ width: 50 }}
                        alt="produto"
                      />
                    </div>
                    <div style={{ marginLeft: 16 }}>
                      <div style={{ marginBottom: 4 }}>{`${idx + 1} - ${
                        p.name
                      }`}</div>
                      <Typography
                        variant="body1"
                        gutterBottom
                        style={{ marginBottom: 4 }}
                      >
                        {`Quantidade: ${p.qtd}`}
                      </Typography>
                      <Typography
                        variant="body1"
                        gutterBottom
                        style={{ fontWeight: 800, color: 'rgba(0, 0, 0, 0.8)' }}
                      >
                        {`Preço: R$ ${p.prodValue}`}
                      </Typography>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={() => this.onDelete(idx)}>
                      <CloseIcon />
                    </IconButton>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          <div className={classes.productResume}>
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginBottom: 8 }}
            >
              Total
            </Typography>
            <Typography variant="h3" gutterBottom style={{ marginBottom: 8 }}>
              {`R$ ${value}`}
            </Typography>
            <div
              style={{
                display: 'flex',
                height: 30,
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                size="large"
                style={{ minWidth: 50 }}
                onClick={() => this.setState({ ...defaultState })}
              >
                X
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() =>
                  history.push({
                    pathname: '/caixa/pagamento',
                    state: this.state,
                  })
                }
              >
                Fechar Venda
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Store);
