import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";
import './Header.scss';

class Header extends Component {
    constructor(props){
      super(props);
      this.state = {
          isLoggedin: false,
          user_name: props.user_name
      }
    }

    componentWillMount() {
        var user_name = localStorage.getItem('user_name');
        if (user_name){
            this.setState({
                isLoggedin: true,
                user_name: user_name
            }, function() {
                // console.log(this.state.isLoggedin);
            });
        }
    }

    render() {
        const isLoggedin = this.state.isLoggedin;
        const className = this.props.page==="editprofile" ? "header-small" : "header";
        console.log(className);
        console.log(this.props.page);
        console.log(this.props.page==="editprofile");
        var shownName = "";
        if(isLoggedin) {
          shownName = this.state.user_name;
          shownName = shownName.length>10? shownName.substring(0, 10)+"..." : shownName;
        }
        return (
              <div>
                {isLoggedin?(
                  <div className={className}>
                    <Link to='/' className="menu zero"><i className="far fa-file-alt"></i><span>{"_myPage"}</span></Link>
                    <Link to={'/editprofiles/'+this.state.user_name} className="menu first">{shownName}</Link>
                    <Link to={'/profiles/'+this.state.user_name} className="menu second">View</Link>
                    <Link to='/logout' className="menu third">Logout</Link>
                  </div>
                ):(
                  <div className={className}>
                    <Link to='/' className="menu zero"><i className="far fa-file-alt"></i><span>{"_myPage"}</span></Link>
                    <Link to='/login' className="menu first">Login</Link>
                    <Link to='/register' className="menu second">Register</Link>
                  </div>
                )}
            </div>
        );
    }
}

export default withRouter(Header);
