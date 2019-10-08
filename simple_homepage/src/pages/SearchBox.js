import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './SearchBox.scss';
import axios from 'axios';

axios.default.baseURL = 'http://localhost:4000'

class Item extends Component {
  render() {
    var user = this.props.user;
    return(
      <Link to={'/profiles/'+user.user_name} style={{ textDecoration: 'none' }}>
      <div className="itemBox">
        <div className="itemBox-left">
          <img className="avatar_url" src={user.avatar_url} alt="avatar img"/>
        </div>
        <div className="itemBox-right">
          <div className="itemBox-content">
            <span className="text note">{"Username: "}</span>
            <span className="text value">{user.user_name}</span>
          </div>
          <div className="itemBox-content">
            <span className="text note">{"First name: "}</span>
            <span className="text value">{user.first_name}</span>
          </div>
          <div className="itemBox-content">
            <span className="text note">{"Last name: "}</span>
            <span className="text value">{user.last_name}</span>
          </div>
        </div>
      </div>
      </Link>


    );
  }
}


class Results extends Component {
  render() {
    return(
      <div className="results">
      {this.props.data.map(function(user) {
        return (
          <Item key={user.user_name} user={user}/>
        );
      })}
      </div>
    );
  }
}


export default class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      data: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      key: event.target.value
    }, async ()=>{
      await this.handleSubmit();
    });
  }

  async handleSubmit() {
    var curr = this;
    if(this.state.key==="") {
      this.setState({
        data: []
      });
      return;
    }
    await new Promise(function(resolve, reject) {
      axios.post('/search', {
        key: curr.state.key
      }).then(function(res) {
        curr.setState({
          data: res.data.data
        });
        resolve(res.data.data);
      }).catch(function(err) {
        reject(err);
      });
    });
  }

  render () {
    return (
      <div className="searchbox">
        <input placeholder="Search..." className="inputbox" type="text" value={this.state.key} onChange={this.handleChange}/>
        <div className="searchPromp">{"Found "+this.state.data.length+" results..."}</div>
        <Results data={this.state.data}/>
      </div>
    );
  }
}
// <button onClick={this.handleSubmit}>Submit</button>
