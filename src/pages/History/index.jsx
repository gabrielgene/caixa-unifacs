import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import HistoryIcon from '@material-ui/icons/History';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getHistory } from '../../fetches';

const styles = theme => ({
  icon: {
    marginLeft: 8,
    marginRight: 8,
  },
  grow: {
    flexGrow: 1,
  },
});

const Product = ({ product }) => (
  <div style={{ display: 'flex', margin: 8 }}>
    <div>
      <img src={product.picture} style={{ width: 50 }} alt="produto" />
    </div>
    <div style={{ marginLeft: 16 }}>
      <div style={{ marginBottom: 4 }}>{product.name}</div>
      <Typography variant="body1" gutterBottom style={{ marginBottom: 4 }}>
        {`Quantidade: ${product.qtd}`}
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        style={{ fontWeight: 800, color: 'rgba(0, 0, 0, 0.8)' }}
      >
        {`Preço: R$ ${product.prodValue}`}
      </Typography>
    </div>
  </div>
);

const Profile = ({ user, value, change }) => (
  <div style={{ display: 'flex', margin: 8 }}>
    <div>
      <img
        src={user.picture}
        style={{ width: 50, borderRadius: 60 }}
        alt="produto"
      />
    </div>
    <div style={{ marginLeft: 16 }}>
      <div style={{ marginBottom: 4 }}>{user.name}</div>
      <Typography variant="body1" gutterBottom style={{ marginBottom: 4 }}>
        {`Total pago: R$ ${parseInt(value) + parseInt(change)}`}
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        style={{ fontWeight: 800, color: 'rgba(0, 0, 0, 0.8)' }}
      >
        {`Troco: R$ ${parseInt(change)}`}
      </Typography>
    </div>
  </div>
);

class History extends React.Component {
  state = {
    histories: [],
    load: true,
  };
  async componentDidMount() {
    const histories = await getHistory();
    this.setState({ histories, load: false });
  }

  render() {
    const { classes, history } = this.props;
    return (
      <div>
        <AppBar position="static" style={{ boxShadow: 'none' }}>
          <Toolbar>
            <HistoryIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Historico
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => history.push('/caixa')}
            >
              Caixa
            </Button>
          </Toolbar>
        </AppBar>
        <div style={{ padding: 24, paddingLeft: 80, paddingRight: 80 }}>
          {this.state.histories.reverse().map(h => (
            <div key={h._id}>
              <Card
                key={h._id}
                style={{
                  boxShadow: 'none',
                  border: '1px solid #ececec',
                  padding: 16,
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}
              >
                <div style={{ width: '100%' }}>
                  <div>
                    <Profile {...h} />
                  </div>
                  <div style={{ width: '100%' }}>
                    {h.products.map(p => (
                      <React.Fragment key={p._id}>
                        <Divider />
                        <Product product={p} />
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(History);
