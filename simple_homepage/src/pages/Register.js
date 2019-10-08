import React, { Component } from 'react';
import './Register.scss';
import Header from './Header';
import axios from 'axios';
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";
import { Redirect } from 'react-router';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { withStyles, MuiThemeProvider, createMuiTheme  } from '@material-ui/core/styles';

axios.defaults.baseURL = 'http://localhost:4000'
const username_regex = "^[a-z0-9]{2,15}$";
const email_regex = "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";

const styles = theme => ({
  input: {
    color: "#DDEFF3",
    width: 400
  },

  textField: {
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 100,
  },
  cssLabels: {
    color: "#DDEFF3"
  },
  helperText: {
    color: "#efe8b3",
    fontWeight: 'bold'
  },
  button: {
    color: "#ffffff",
  }
});


class Register extends Component {
  state = {
  email : '',
  username: '',
  password: '',
  confmPassword: '',

  email_errorText: '',
  username_errorText: '',
  password_errorText: '',
  confmPassword_errorText: '',
  showPassword: false,
  error: false,
  login: false
}

handleChange = (name) => async (event) => {
  this.setState({[name]: event.target.value});
  this.setState({error: false});
  var input = event.target.value;
  switch (name) {
    case "email":
      if(input.match(email_regex)) {
        var isValid = await this.checkDuplicate("email", input);
        if(!isValid) {
          this.setState({email_errorText: "Registered Email."});
        } else {
          this.setState({email_errorText: ""});
        }
      } else {
        this.setState({ email_errorText: "Invalid Email Format." });
      }
      break;
    case "username":
      if(input.match(username_regex)) {
        var isValid = await this.checkDuplicate("name", input);
        if(!isValid) {
          this.setState({username_errorText: "Registered Username."});
        } else {
          this.setState({username_errorText: ""});
        }
      } else {
        this.setState({ username_errorText: "Length 2-15 & Only Alphanumeric Characters." });
      }
      break;
    case "password":
      if(input.length >= 6) {
        this.setState({password_errorText: ""});
      } else {
        this.setState({ password_errorText: "Password at least 6 Characters." });
      }
      break;
    case "confmPassword":
      this.setState({confmPassword_errorText: ""});
      break;
    default:
      break;
  }
};

handleClickShowPassword = () => {
  this.setState(state => ({showPassword: !state.showPassword}));
}

handleRegister = async () => {
  if (this.state.password != this.state.confmPassword) {
    this.setState({confmPassword_errorText: "Comfirm Password and Password do not match."});
    this.setState({error: true});
  }
  if (this.state.email_errorText||this.state.username_errorText||this.state.password_errorText) {
    this.setState({error: true});
  }
  else {
    var isSuccess = await this.registerUser();
    console.log(isSuccess);
    if(isSuccess) {
      var user_name = this.state.username;
      localStorage.setItem('user_name', user_name);
      this.setState({login: true});
    } else {
      this.setState({error: true});
    }
  }
}

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     user_name:"",
  //     email: "",
  //     pw: "",
  //     c_pw: "",
  //     isNameValid: true,
  //     isEmailValid: true,
  //     isPwValid: true,
  //     isPwMatch: true,
  //     isSuccess: false,
  //   }
  //   this.handleChange = this.handleChange.bind(this);
  //   this.checkDuplicate = this.checkDuplicate.bind(this);
  //   this.checkEmailValid = this.checkEmailValid.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  //   this.registerUser = this.registerUser.bind(this);
  //   this.checkNameValid = this.checkNameValid.bind(this);
  // }
  //
  registerUser() {
    var curr = this;
    return new Promise(function(resolve, reject) {
      axios.post('./register', {
        "user_name": curr.state.username,
        "email": curr.state.email,
        "password": curr.state.password})
           .then(function(res) {
             console.log(true)
             resolve(true);
           })
           .catch(function(err) {
             console.log(false);
             resolve(false);
           })
    });
  }
  //
  //
  // handleSubmit() {
  //   if (this.state.pw !== this.state.c_pw) {
  //     this.setState({
  //       isPwMatch: false
  //     });
  //   } else {
  //     this.setState({
  //       isPwMatch: true
  //     }, async function() {
  //       console.log(1);
  //       if(this.state.user_name!=="" && this.state.email!=="" && this.state.pw!=="") {
  //         console.log(2);
  //         if(this.state.isNameValid && this.state.isEmailValid && this.state.isPwValid) {
  //           console.log(3);
  //           var isSuccess = await this.registerUser();
  //           console.log(isSuccess);
  //           if(isSuccess) {
  //             var user_name = this.state.user_name;
  //             this.props.history.push("./editprofiles/" + user_name);
  //             localStorage.setItem('user_name', user_name);
  //           }
  //         }
  //       }
  //     });
  //   }
  // }
  //
  checkDuplicate(type, key) {
    switch(type) {
      case "name":
        return new Promise(function(resolve, reject) {
          axios.post('/user_name', {"user_name": key})
               .then(function(res) {
                 resolve(res.data.message==="ok");
               })
               .catch(function(err) {
                 console.log(err);
                 reject(err);
               })
        });
      case "email":
        return new Promise(function(resolve, reject) {
          axios.post('/email', {"email": key})
               .then(function(res) {
                 console.log(res.data);
                 resolve(res.data.message==="ok");
               })
               .catch(function(err) {
                 console.log(err);
                 reject(err);
               })
        });
      default:
        break;
    };
  }
  //
  // checkEmailValid(email) {
  //   if (email === "") {
  //     return false;
  //   }
  //   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return re.test(String(email).toLowerCase());
  // }
  //
  // checkNameValid(name) {
  //   if (name === "") {
  //     return false;
  //   }
  //   if (name.includes(" ") || name.includes("/") || name.includes(" ") || name.includes("?") || name.includes(".") || name.includes("[") || name.includes("]") || name.includes("{") || name.includes("}")) {
  //     return false;
  //   }
  //   return true;
  // }
  //
  // handleChange(type, event) {
  //   switch(type) {
  //     case "name":
  //       this.setState({user_name: event.target.value}, async function() {
  //         var isValid = false;
  //         if(this.checkNameValid(this.state.user_name)){
  //           isValid = await this.checkDuplicate("name", this.state.user_name);
  //         }
  //         this.setState({
  //           isNameValid: isValid
  //         });
  //       });
  //       break;
  //     case "email":
  //       this.setState({email: event.target.value}, async function() {
  //         var isValid = false;
  //         if(this.checkEmailValid(this.state.email)){
  //           isValid = await this.checkDuplicate("email", this.state.email);
  //         }
  //         this.setState({
  //           isEmailValid: isValid
  //         });
  //       });
  //       break;
  //     case "pw":
  //       this.setState({pw: event.target.value}, function() {
  //         this.setState({
  //           isPwValid: (this.state.pw.length >= 6)
  //         });
  //       });
  //       break;
  //     case "c_pw":
  //       this.setState({c_pw: event.target.value});
  //       break;
  //     default:
  //       break;
  //   }
  // }

  render() {
    if(this.state.login) {
      return (
        <Redirect to={"/editprofiles/"+this.state.username} />
      );
    }
    const { classes, children, className, ...other } = this.props;

    return (
      <div className="Register">
        <Header />
        <div id="register-form">
          <TextField
            id="input-username"
            label="Username"
            type="text"
            error={this.state.error}
            helperText={this.state.username_errorText}
            className={classes.textField}
            value={this.state.username}
            onChange={this.handleChange('username')}
            margin="normal"
            InputProps={{
              className: classes.input
            }}
            InputLabelProps={{
              className: classes.cssLabels
            }}
            FormHelperTextProps={{
              className: classes.helperText
            }}
            />
          <TextField
            id="input-email"
            label="Email"
            type="email"
            error={this.state.error}
            helperText={this.state.email_errorText}
            className={classes.textField}
            value={this.state.email}
            onChange={this.handleChange('email')}
            margin="normal"
            InputProps={{
              className: classes.input
            }}
            InputLabelProps={{
              className: classes.cssLabels
            }}
            FormHelperTextProps={{
              className: classes.helperText
            }}
            />
          <TextField
            id="input-password"
            label="Password"
            error={this.state.error}
            helperText={this.state.password_errorText}
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
            FormHelperTextProps={{
              className: classes.helperText
            }}
            />
            <TextField
              id="input-confm-password"
              label="Confirm Password"
              error={this.state.error}
              helperText={this.state.confmPassword_errorText}
              type={this.state.showPassword? 'text' :'password'}
              className={classes.textField}
              value={this.state.confmPassword}
              onChange={this.handleChange('confmPassword')}
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
              FormHelperTextProps={{
                className: classes.helperText
              }}
              />
          <Button
            variant="outlined"
            size="small"
            color="#eff3f4"
            onClick={this.handleRegister}
            className={classes.button}
            >
            Register
          </Button>
        </div>

      </div>
    );
  }
}

export default withStyles(styles)(Register);
