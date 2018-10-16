import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const products = {
  1: {
    id: 1,
    name: 'Arroz',
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
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  content: {
    display: 'flex'
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
      value: value + prodValue
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
    const { classes } = this.props;
    const { img, value, prodValue, prodName, cod, qtd, items } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Caixa
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          <div className={classes.sideView}>
            <Card>
              <CardContent>
                <Typography component="h3" variant="h3">
                  R$ {value}
                </Typography>
              </CardContent>
            </Card>
            <div className={classes.demo}>
              <List dense>
                {items.map((p, idx) => (
                  <ListItem key={p.id}>
                    {idx + 1}
                    <ListItemAvatar>
                      <Avatar src={p.image} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={p.name}
                      secondary={`Quantidade: ${p.qtd} - Valor: R$ ${
                        p.prodValue
                      }`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        aria-label="Delete"
                        onClick={() => this.onDelete(idx)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </div>
            <Card>
              <CardContent>
                <Typography component="h3" variant="h3">
                  Itens: {items.length}
                </Typography>
              </CardContent>
            </Card>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={() => this.setState({ empty: true })}
            >
              Concluir Compra
            </Button>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              size="large"
              onClick={() => this.setState({ ...defaultState })}
            >
              Cancelar Venda
            </Button>
          </div>
          <div>
            <div className={classes.info}>
              <TextField
                title="Temos produtos do codigo 1 até o 10"
                id="outlined-name"
                label="Codigo do produto"
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
                label="Valor"
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
            <Button
              variant="contained"
              color="secondary"
              size="large"
              fullWidth
              disabled={!cod}
              onClick={this.onAddItem}
            >
              Adicionar
            </Button>
            <div>
              {img && <img src={img} style={{ width: 300 }} alt="produto" />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Store);
