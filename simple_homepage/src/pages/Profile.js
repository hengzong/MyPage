import React, { Component } from 'react';
import './Profile.scss';
import {ProfileNavigation, ProfileContent} from './ProfileHelper';
import axios from 'axios';
axios.default.baseURL="http://localhost:4000";

export default class Profile extends Component {
    state = {
      user: '',
      listContent: [],
      isLoading: true,
    }

    componentDidMount = async () => {
      var curr = this;
      var user = await new Promise((resolve, reject) => {
        axios.get('/api/users/'+curr.props.match.params.user_name)
             .then(function(res) {
               resolve(res.data.data);
             })
             .catch(function(error) {
               reject(error);
             })
      });
      var list = await new Promise(function(resolve, reject) {
        axios.get('/api/components?user_name='+user.user_name)
             .then(function(res) {
                resolve(res.data.data)
             })
             .catch(function(error) {
                reject(error);
             })
      });
      this.setState({
        user: user,
        listContent: list,
        isLoading: false,
      });
    }

    render() {
        if(this.state.isLoading) {
          return (
            <div>
              Loading...
            </div>
          );
        }

        const user = this.state.user;
        const listContent = this.state.listContent;
        return (
          <div className="main">
          <ProfileNavigation
            avatar_url={user.avatar_url}
            first_name={user.first_name}
            last_name={user.last_name}
            listContent={listContent}
            facebook_url={user.outerLinks.facebook}
            twitter_url={user.outerLinks.twitter}
            linkedin_url={user.outerLinks.linkedin}
            instgram_url={user.outerLinks.instgram}
            github_url={user.outerLinks.github}
          />
          <ProfileContent
            listContent={listContent}
            longitude={user.longitude}
            latitude={user.latitude}
          />
          </div>
        );
    }
}
