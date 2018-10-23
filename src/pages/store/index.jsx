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

const products = {
  1: {
    id: 1,
    name: 'Arroz Tio João',
    value: 7,
    image:
      'https://www.paodeacucar.com/img/uploads/1/678/510678.jpg?type=product'
  },
  2: {
    id: 2,
    name: 'Vinho',
    value: 70,
    image:
      'https://savegnago.vteximg.com.br/arquivos/ids/278721-1000-1000/VINHO-BRASILEIRO-CHALISE-750ML-SUAVE-TIN.jpg?v=636276558268370000'
  },
  3: {
    id: 3,
    name: 'Cerveja',
    value: 4,
    image:
      'https://superprix.vteximg.com.br/arquivos/ids/175068-600-600/Cerveja-Eisenbahn-Pilsen-600ml.png?v=636280351726700000'
  },
  4: {
    id: 4,
    name: 'Suco',
    value: 3,
    image:
      'https://araujo.vteximg.com.br/arquivos/ids/3765344-1000-1000/07894900660319.jpg?v=636386542513200000'
  },
  5: {
    id: 5,
    name: 'Biscoito',
    value: 2.5,
    image:
      'https://staples.vteximg.com.br/arquivos/ids/220791-1000-1000/Biscoito-Amanteigado-11-5-g-Bauducco-BSCBDBCCA.jpg?v=636111097174000000'
  },
  6: {
    id: 6,
    name: 'Salgadinho',
    value: 1,
    image:
      'https://www.deliveryextra.com.br/img/uploads/1/73/557073.png?type=product'
  },
  7: {
    id: 7,
    name: 'Coca-cola',
    value: 6,
    image:
      'https://static.carrefour.com.br/medias/sys_master/images/images/h3d/heb/h00/h00/12175673917470.jpg'
  },
  8: {
    id: 8,
    name: 'Whisky',
    value: 120,
    image:
      'https://www.paodeacucar.com/img/uploads/1/200/477200.jpg?type=product'
  },
  9: {
    id: 9,
    name: 'Fanta',
    value: 3,
    image:
      'https://www.deliveryextra.com.br/img/uploads/1/921/546921.jpg?type=product'
  },
  10: {
    id: 10,
    name: 'Carne Kg',
    value: 20,
    image:
      'https://png.pngtree.com/element_origin_min_pic/17/09/22/111a084f3a649a7c428e298040191c6c.jpg'
  }
};

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  content: {
    display: 'flex'
  },
  product: {
    width: '50%',
    padding: 16
  },
  productList: {
    width: '30%',
    backgroundColor: '#fafafa'
  },
  productListHeader: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16
  },
  productListContent: {
    height: 'calc(100vh - 148px)',
    overflow: 'auto',
    paddingLeft: 8,
    paddingRight: 8
  },
  productResume: {
    width: '20%',
    backgroundColor: '#fafafa',
    display: 'flex',
    height: 'calc(100vh - 96px)',
    padding: 16,
    marginLeft: 8,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  sideView: {
    width: '40%',
    marginLeft: 2
  },
  demo: {
    overflow: 'auto',
    borderRight: '1px solid #dddddd',
    marginTop: 2,
    height: 310,
    backgroundColor: theme.palette.background.paper
  },
  info: {
    display: 'flex'
  },
  input: {
    margin: 16
  },
  button: {
    marginTop: 24
  },
  icon: {
    marginLeft: 8,
    marginRight: 8
  },
  caption: {
    marginBottom: 12
  }
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
  items: []
};

class Store extends React.Component {
  state = {
    ...defaultState
  };

  handleChangeCod = event => {
    const { value } = event.target;
    const product = products[value];
    this.setState({
      cod: value,
      img: product ? product.image : '',
      prodName: product ? product.name : '',
      prodValue: product ? product.value : 0,
      qtd: 1
    });
  };

  handleChangeAmount = event => {
    const { value } = event.target;
    const { cod, prodValue } = this.state;
    const product = products[cod];
    this.setState({
      qtd: value,
      prodValue: product ? product.value * value : prodValue * value
    });
  };

  onAddItem = () => {
    const { cod, items, qtd, prodValue, value } = this.state;
    this.setState({
      items: [...items, { ...products[cod], qtd, prodValue }],
      value: value + prodValue,
      cod: ''
    });
  };

  onDelete = index => {
    const { items, value } = this.state;
    const item = items.find((_, idx) => idx === index);
    this.setState({
      items: items.filter((_, idx) => idx !== index),
      value: value - item.prodValue
    });
  };

  render() {
    const { classes, history } = this.props;
    const { img, value, prodValue, prodName, cod, qtd, items } = this.state;

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
                title="Temos produtos do codigo 1 até o 10"
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
                disabled={!cod}
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
                        label="Valor unitário"
                        className={classes.input}
                        value={Math.round(prodValue)}
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          )
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
                variant="caption"
                gutterBottom
                className={classes.caption}
              >
                {items.length} produtos
              </Typography>
            </div>
            <div className={classes.productListContent}>
              {items.map((p, idx) => (
                <Card
                  key={p.id}
                  style={{
                    boxShadow: 'none',
                    border: '1px solid #ececec',
                    padding: 16,
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 8
                  }}
                >
                  <div style={{ display: 'flex' }}>
                    <div>
                      <img src={p.image} style={{ width: 50 }} alt="produto" />
                    </div>
                    <div style={{ marginLeft: 16 }}>
                      <div style={{ marginBottom: 4 }}>{`${idx + 1} - ${
                        p.name
                      }`}</div>
                      <Typography
                        variant="caption"
                        gutterBottom
                        style={{ marginBottom: 4 }}
                      >
                        {`Quantidade: ${p.qtd}`}
                      </Typography>
                      <Typography
                        variant="caption"
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
              variant="subtitle2"
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
                width: '100%'
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
                    state: this.state
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
