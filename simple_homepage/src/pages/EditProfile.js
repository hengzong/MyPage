import React, { Component } from 'react';
import { Redirect } from 'react-router';
import EditProfileNavigation from './EditProfileNavigation.js';
import EditProfileContent from './EditProfileContent';
import Header from './Header';
import Modal from './Modal';
import './EditProfile.scss';
import axios from 'axios';

axios.default.baseURL="http://localhost:4000";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user_name:"",
      modal_show: false,
      modal_content: "",
      avatar_url: "",
      url_temp: "",
      first_name: "",
      last_name: "",
      nameEditable: false,
      facebook_url: "",
      twitter_url: "",
      linkedin_url: "",
      instgram_url: "",
      github_url: "",
      refreshed: false,
      listOrder: [],
      listContent: [],
      latitude: "",
      longitude: ""
    }

    this.handleModalShow = this.handleModalShow.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleURLChange = this.handleURLChange.bind(this);
    this.handleURLSubmit = this.handleURLSubmit.bind(this);
    this.handleNameEditTrue = this.handleNameEditTrue.bind(this);
    this.handleNameEditFalse = this.handleNameEditFalse.bind(this);
    this.handleUserUpdate = this.handleUserUpdate.bind(this);
    this.handleDeleteComponent = this.handleDeleteComponent.bind(this);
    this.handleAddComponent = this.handleAddComponent.bind(this);
    this.handleUpdateComponentContent = this.handleUpdateComponentContent.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleUpdateComponentTitle = this.handleUpdateComponentTitle.bind(this);
  }

  async componentDidMount() {
    var curr = this;
    var user = await new Promise(function(resolve, reject) {
      axios.get('/api/users/'+curr.props.match.params.user_name)
           .then(function(res) {
             var user = res.data.data;
             resolve(user);
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
      user_name: user.user_name,
      avatar_url: user.avatar_url,
      url_temp: "",
      first_name: user.first_name,
      last_name: user.last_name,
      facebook_url: user.outerLinks.facebook,
      twitter_url: user.outerLinks.twitter,
      linkedin_url: user.outerLinks.linkedin,
      instgram_url: user.outerLinks.instgram,
      github_url: user.outerLinks.github,
      listOrder: user.componentList,
      listContent: list,
      latitude: user.latitude,
      longitude: user.longitude,
      isLoading: false,
    }, function() {
    });
  }

  handleModalShow(type) {
    this.setState({
      modal_show: true,
      modal_content: type
    });
    switch(type){
      case "avatar":
        this.setState({
          url_temp: this.state.avatar_url
        });
        break;
      case "facebook":
        this.setState({
          url_temp: this.state.facebook_url
        });
        break;
      case "twitter":
        this.setState({
          url_temp: this.state.twitter_url
        });
        break;
      case "linkedin":
        this.setState({
          url_temp: this.state.linkedin_url
        });
        break;
      case "instgram":
        this.setState({
          url_temp: this.state.instgram_url
        });
        break;
      case "github":
        this.setState({
          url_temp: this.state.github_url
        });
        break;
      default:
        break;
    }
  }

  handleModalClose() {
    this.setState({
      modal_show: false,
      url_temp: this.state.avatar_url
    });
  }

  handleNameEditTrue() {
    this.setState({ nameEditable: true});
  }

  async handleNameEditFalse(first, last) {
    this.setState({
      nameEditable: false,
      first_name: first,
      last_name: last
    });
    await this.handleUserUpdate({"first_name": first, "last_name": last});
  }

  async handleLocationChange(newLatitude, newLongitude) {
    this.setState({
      latitude: newLatitude,
      longitude: newLongitude
    });
    await this.handleUserUpdate({"latitude": newLatitude, "longitude": newLongitude});
  }

  handleURLChange(event) {
    this.setState({
      url_temp: event.target.value
    });
  }

  handleUserUpdate(info) {
    var curr = this;
    return new Promise(function(resovle, reject) {
      axios.put('/api/users/'+curr.props.match.params.user_name, info)
           .then(function(res) {
             resovle(res);
           })
           .catch(function(err){
             reject(err);
           })
    });
  }

  async handleUpdateComponentTitle(component_id, newTitle) {
    var info = {
      "title": newTitle
    }
    await new Promise((resolve, reject) => {
      axios.put('/api/components/'+component_id, info)
           .then((res) => {
             resolve(res);
           })
           .catch((err) => {
             reject(err);
           })
    });
    var newListContent = this.state.listContent;
    for (var i = 0; i < newListContent.length; i++) {
      if(newListContent[i]._id === component_id) {
        newListContent[i].title = newTitle;
        break;
      }
    }
    this.setState({
      listContent: newListContent
    });
  }

  async handleUpdateComponentContent(component_id, newHTML, newEditorState) {
    var info = {
      "innerHTML": newHTML,
      "editorState": newEditorState
    };
    await new Promise((resolve, reject) => {
      axios.put('/api/components/'+component_id, info)
           .then((res) => {
             resolve(res);
           })
           .catch((err) => {
             reject(err)
           })
    });
    var newListContent = this.state.listContent;
    for (var i = 0; i < newListContent.length; i++) {
      if(newListContent[i]._id === component_id) {
        newListContent[i].innerHTML = newHTML;
        newListContent[i].editorState = newEditorState;
        break;
      }
    }
    this.setState({
      listContent: newListContent
    });
  }

  async handleDeleteComponent(component_id) {
    await new Promise((resolve, reject) => {
      axios.delete("/api/components/"+component_id)
           .then((res) => {
             resolve(res);
           })
           .catch((err) => {
             reject(err)
           })
    });
    var newListOrder = this.state.listOrder;
    for (var i = 0; i < newListOrder.length; i++) {
      if (newListOrder[i] === component_id) {
          newListOrder.splice(i, 1);
          i--;
      }
    }
    var newListContent = this.state.listContent;
    for (i = 0; i < newListContent.length; i++) {
      if (newListContent[i]._id === component_id) {
          newListContent.splice(i, 1);
          i--;
      }
    }
    this.setState({
      listOrder: newListOrder,
      listContent: newListContent
    });
  }

  async handleAddComponent(newTitle) {
    var newComponent = await new Promise((resovle, reject) => {
      axios.post("/api/components", {
        "user_name": this.state.user_name,
        "title": newTitle
      })
      .then((res)=>{
        resovle(res.data.data);
      })
      .catch((err)=>{
        reject(err);
      })
    });

    var newListOrder = this.state.listOrder;
    newListOrder.push(newComponent._id);
    var newListContent = this.state.listContent;
    newListContent.push(newComponent);
    this.setState({
      listOrder: newListOrder,
      listContent: newListContent
    });
  }

  async handleURLSubmit() {
    switch(this.state.modal_content){
      case "avatar":
        this.setState({
          modal_show:false,
          avatar_url: this.state.url_temp
        });
        await this.handleUserUpdate({"avatar_url": this.state.url_temp});
        break;
      case "facebook":
        this.setState({
          modal_show:false,
          facebook_url: this.state.url_temp
        });
        await this.handleUserUpdate({"outerLinks":{"facebook":this.state.url_temp, "instgram":this.state.instgram_url, "linkedin":this.state.linkedin_url, "twitter":this.state.twitter_url, "github":this.state.github_url}});
        break;
      case "twitter":
        this.setState({
          modal_show:false,
          twitter_url: this.state.url_temp
        });
        await this.handleUserUpdate({"outerLinks":{"facebook":this.state.facebook_url, "instgram":this.state.instgram_url, "linkedin":this.state.linkedin_url, "twitter":this.state.url_temp, "github":this.state.github_url}});
        break;
      case "linkedin":
        this.setState({
          modal_show:false,
          linkedin_url: this.state.url_temp
        });
        await this.handleUserUpdate({"outerLinks":{"facebook":this.state.facebook_url, "instgram":this.state.instgram_url, "linkedin":this.state.url_temp, "twitter":this.state.twitter_url, "github":this.state.github_url}});
        break;
      case "instgram":
        this.setState({
          modal_show:false,
          instgram_url: this.state.url_temp
        });
        await this.handleUserUpdate({"outerLinks":{"facebook":this.state.facebook_url, "instgram":this.state.url_temp, "linkedin":this.state.linkedin_url, "twitter":this.state.twitter_url, "github":this.state.github_url}});
        break;
      case "github":
        this.setState({
          modal_show:false,
          github_url: this.state.url_temp
        });
        await this.handleUserUpdate({"outerLinks":{"facebook":this.state.facebook_url, "instgram":this.state.instgram_url, "linkedin":this.state.linkedin_url, "twitter":this.state.twitter_url, "github":this.state.url_temp}});
        break;
      default:
        break;
    }
  }

  render() {
    if(!localStorage.getItem('user_name')){
      return (
        <Redirect to="/login"/>
      );
    }

    if(this.state.isLoading) {
      return (
        <div>
          <Header user_name={this.state.user_name}/>
          <div>Loading...</div>
        </div>
      );
    }

    return (
      <div>
      <Header user_name={this.state.user_name} page="editprofile"/>
      <div className="main">
        <EditProfileNavigation className="navigation"
          handleModalShow={this.handleModalShow}
          handleNameEditFalse={this.handleNameEditFalse}
          handleNameEditTrue={this.handleNameEditTrue}
          avatar_url={this.state.avatar_url}
          nameEditable={this.state.nameEditable}
          first_name={this.state.first_name}
          last_name={this.state.last_name}
          listOrder={this.state.listOrder}
          listContent={this.state.listContent}
          handleDeleteComponent={this.handleDeleteComponent}
          handleAddComponent={this.handleAddComponent}
          latitude={this.state.latitude}
          longitude={this.state.longitude}
          handleLocationChange={this.handleLocationChange}
          handleUpdateComponentTitle={this.handleUpdateComponentTitle}
        />
        <Modal show={this.state.modal_show} handleModalClose={this.handleModalClose} size="small">
          <div className="modalContent">
            <div className="modalTitle">{"New URL:"}</div>
            <div><input  className="url_input" value={this.state.url_temp} onChange={this.handleURLChange} placeholder="new URL"/></div>
            <div><button className="modalButton" onClick={this.handleURLSubmit}>submit</button></div>
          </div>
        </Modal>
        <EditProfileContent className="content"
          listContent={this.state.listContent}
          handleUpdateComponentContent={this.handleUpdateComponentContent}
          latitude={this.state.latitude}
          longitude={this.state.longitude}
        />
      </div>
      </div>
    );
  }
}
