import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
// import axios from 'axios';


class Logout extends Component {
    // constructor(props){
    //     super(props);
    // }

    componentWillMount() {
        localStorage.setItem('user_name', "");
        this.props.history.push('./login');
        console.log("history: "+this.props.history);
    }

    render(){
        return(
            <div>
                Logout
            </div>
        );
    }
}

export default withRouter(Logout);
