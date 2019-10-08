import React, { Component } from 'react';
import Header from './Header';
import axios from 'axios';
import { Redirect } from 'react-router';
import {Link} from "react-router-dom";
import './Login.scss';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { withStyles, MuiThemeProvider, createMuiTheme  } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import teal from '@material-ui/core/colors/green';

axios.default.baseURL="http://localhost:4000";

const styles = theme => ({
  input: {
    color: "#eff3f4",
    width: 400,
  },

  textField: {
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 100,
  },
  cssLabels: {
    color: "#eff3f4"
  },
  button: {
    color: "#ffffff",
  }

});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#eff3f4',
      text: {
        primary: '#ffffff'
      }
    }
  },

  typography: {
    useNextVariants: true,
  },
});

axios.defaults.baseURL = 'http://localhost:4000';

class Login extends Component {
  state = {
    userName : '',
    password: '',
    showPassword: false,
    error: false,
    login: false
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value});
  };

  handleClickShowPassword = () => {
    this.setState(state => ({showPassword: !state.showPassword}));
  }

  handleLogin = async () => {
    var res = await this.login();
    if (res !== "") {
      var user_name = res.user_name
      localStorage.setItem('user_name', user_name);
      this.setState({login: true});
    } else {
      this.setState({error: true});
    }
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     login:"",
  //     password: "",
  //     loginFirstTime: true,
  //     passwordFirstTime: true,
  //     toProfile: false,
  //   }
  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  //   this.login = this.login.bind(this);
  // }
  //
  login() {
    var curr = this;
    return new Promise(function(resolve, reject) {
      axios.post('./login', {
        "key": curr.state.userName,
        "password": curr.state.password
      }).then(function(res) {
        resolve(res.data.data);
      }).catch(function(err) {
        resolve("");
      })
    })
  }
  //
  // async handleSubmit(event) {
  //   if(this.state.login !== "" && this.state.password !== "") {
  //     var res = await this.login();
  //     if (res !== "") {
  //       var user_name = res.user_name
  //       this.props.history.push("./editprofiles/"+user_name);
  //       localStorage.setItem('user_name', user_name);
  //     }
  //   }
  // }
  //
  // handleChange(isLogin, event) {
  //   if(isLogin) {
  //     if(this.state.loginFirstTime) {
  //       this.setState({loginFirstTime: false}, function() {
  //           this.setState({login: ""});
  //       });
  //     } else {
  //       this.setState({login: event.target.value});
  //     }
  //   } else {
  //     if(this.state.passwordFirstTime) {
  //       this.setState({passwordFirstTime: false}, function() {
  //           this.setState({password: ""});
  //       });
  //     } else {
  //       let value = event.target.value;
  //       this.setState({password: value});
  //     }
  //   }
  // }

  render() {
    if(this.state.login) {
      return (
        <Redirect to={"/editprofiles/"+this.state.userName}/>
      );
    }
    const { classes, children, className, ...other } = this.props;
    return (
      <div className="Login">
        <Header />
        <div id="login-form">
          <label className={this.state.error?"reminder visible":"reminder invisible"}>{"userName / Password Incorrect"}</label>
          <TextField
            id="input-name"
            label="user name"
            type="text"
            error={this.state.error}
            className={classes.textField}
            value={this.state.userName}
            onChange={this.handleChange('userName')}
            margin="normal"
            InputProps={{
              className: classes.input
            }}
            InputLabelProps={{
              className: classes.cssLabels
            }}
            />
          <TextField
            id="input-password"
            label="Password"
            error={this.state.error}
            type={this.state.showPassword? 'text' :'password'}
            className={classes.textField}
            value={this.state.password}
            onChange={this.handleChange('password')}
            margin="normal"
            InputProps={{
              className: classes.input,
              endAdornment: <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
            }}
            InputLabelProps={{
              className: classes.cssLabels
            }}
            />
          <Button
            variant="outlined"
            size="small"
            color="#eff3f4"
            onClick={this.handleLogin}
            className={classes.button}
            >
            Login
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
