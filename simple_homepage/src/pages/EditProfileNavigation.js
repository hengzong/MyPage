import React, { Component } from 'react';
import Modal from './Modal';
import './EditProfileNavigation.scss';

const floating_point_regex = /^[-+]?([0-9]+(\.[0-9]+)?|\.[0-9]+)$/;

class NaviBar extends Component {
  constructor(props) {
    super(props);
    this.state={
      modalShow: false,
      modalType: "",
      componentID: "",
      newTitle: "",
      newLa: this.props.latitude,
      newLo: this.props.longitude,
      Error: ""
    };
    this.handleDelteComponentPrep = this.handleDelteComponentPrep.bind(this);
    this.handleAddComponentPrep = this.handleAddComponentPrep.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleModalShow = this.handleModalShow.bind(this);
    this.handleLocationChangePrep = this.handleLocationChangePrep.bind(this);
    this.handleTitleChangePrep = this.handleTitleChangePrep.bind(this);
  }

  handleModalClose() {
    this.setState({
      modalShow: false
    });
  }

  handleModalShow(component_id, type) {
    this.setState({
      modalShow: true,
      componentID: component_id,
      modalType: type
    });
  }

  handleDelteComponentPrep() {
    this.handleModalClose();
    this.props.handleDeleteComponent(this.state.componentID);
  }

  handleInputChange(event, type) {
    var input = event.target.value;
    this.setState({[type]: input});
    switch(type){
      case("newLa"):
      case("newLo"):
        if(floating_point_regex.test(input)) {
          this.setState({Error: ""});
        } else {
          this.setState({Error: "Input value must be valid numbers."});
        }
        break;
      case("newTitle"):
        console.log(input);
        if(input.length!==0) {
          this.setState({Error: ""});
        } else {
          this.setState({Error: "Title can not be empty."})
        }
        break;
      default:
        break;
    }
  }

  handleAddComponentPrep() {
    this.handleModalClose();
    this.props.handleAddComponent(this.state.newTitle);
  }

  handleLocationChangePrep(){
    if(this.state.Error.length === 0) {
      this.props.handleLocationChange(this.state.newLa, this.state.newLo);
      this.handleModalClose();
    }
  }

  handleTitleChangePrep() {
    if(this.state.Error.length === 0) {
      this.props.handleUpdateComponentTitle(this.state.componentID, this.state.newTitle);
      this.handleModalClose();
    }
  }

  render() {
    var curr = this;
    var modalChild;
    switch(this.state.modalType){
      case("delete"):
        modalChild = (
          <div className="modalContent">
            <div className="modalTitle">{"Delete this Component?"}</div>
            <button className="modalButton" onClick={this.handleDelteComponentPrep}>Delete</button>
            <button className="modalButton" onClick={this.handleModalClose}>Cancle</button>
          </div>
        );
        break;
      case("add"):
        modalChild = (
          <div className="modalContent">
            <div className="modalTitle">{"Add New Component:"}</div>
            <input className="modalInput" value={this.state.newTitle} placeholder="new title" onChange={(event)=>{;this.handleInputChange(event, "newTitle")}}/>
            <div><button className="modalButton" onClick={this.handleAddComponentPrep}>Submit</button></div>
          </div>
        );
        break;
      case("map"):
        modalChild = (
          <div className="modalContent">
            <div>
              <div className="modalTitle">{"Latitude & Longitude_"}<a target="_blank" rel="noopener noreferrer" href="https://support.google.com/maps/answer/18539?co=GENIE.Platform%3DDesktop&hl=en"><i className="far fa-question-circle"></i></a></div>
              <div><input className="modalInput" value={this.state.newLa} placeholder="new latitude" onChange={(event)=>{this.handleInputChange(event, "newLa")}}/></div>
              <div><input className="modalInput" value={this.state.newLo} placeholder="new longitude" onChange={(event)=>{this.handleInputChange(event, "newLo")}}/></div>
              <button className="modalButton" onClick={this.handleLocationChangePrep}>submit</button>
            </div>
            <label>{this.state.Error}</label>
          </div>
        );
        break;
      case("changeTitle"):
        modalChild = (
          <div className="modalContent">
            <div>
              <div className="modalTitle">{"New Title:"}</div>
              <div><input className="modalInput" value={this.state.newTitle} placeholder="newTitle" onChange={(event)=>{this.handleInputChange(event, "newTitle")}}/></div>
              <button className="modalButton" onClick={this.handleTitleChangePrep}>submit</button>
            </div>
            <label>{this.state.Error}</label>
          </div>
        );
        break;
      default:
        modalChild = (<div></div>);
    }
    return (
      <div className="naviBar">
        <div className="naviBarList">
        {this.props.listContent.map(function(item) {
          return(
            <div className="naviBarItem" key={item._id}>
              <span className="barTitle" onClick={()=>{curr.setState({"newTitle":item.title});curr.handleModalShow(item._id, "changeTitle")}}>{item.title}</span>
              <span className="deleteBar" onClick={()=>curr.handleModalShow(item._id, "delete")}>
                <i className="far fa-trash-alt"></i>
              </span>
            </div>
          );
        })}
        <div className="naviBarItem" onClick={()=>curr.handleModalShow("", "map")}>
          <span className="barTitle">Location</span>
        </div>
        </div>
        <Modal
          show={this.state.modalShow}
          handleModalClose={this.handleModalClose}
          size="small"
        >
          {modalChild}
        </Modal>
        <div onClick={()=>{this.setState({"newTitle":""});this.handleModalShow("","add")}} className="naviBarItem">
          <span className="barTitle addButton">Add More</span>
          <span className="deleteBar">
            <i className="fas fa-plus-circle"></i>
          </span>
        </div>
      </div>
    );
  }
}

export default class EditProfileNavigation extends Component {
  constructor(props) {
    super(props);
    this.state={
      first_name_temp: this.props.first_name,
      last_name_temp: this.props.last_name,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(type, event) {
    switch(type){
      case "first_name":
        this.setState({
          first_name_temp: event.target.value
        });
        break;
      case "last_name":
        this.setState({
          last_name_temp: event.target.value
        });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className="navigation">
        <div><img alt="avatar img" onClick={()=>this.props.handleModalShow("avatar")} className="avatar" src= {this.props.avatar_url}/></div>
        {this.props.nameEditable?(
          <div className="name">
            <span><input className="firstName" placeholder={"FirstName"} value={this.state.first_name_temp} onChange={(event)=>this.handleChange("first_name", event)}/></span>
            <span><input className="lastName" placeholder={"LastName"} value={this.state.last_name_temp} onChange={(event)=>this.handleChange("last_name", event)}/></span>
            {this.props.nameEditable?(<span><i className="fas fa-save" onClick={()=>this.props.handleNameEditFalse(this.state.first_name_temp, this.state.last_name_temp)}></i></span>):(<span><i className="far fa-edit" onClick={this.props.handleNameEditTrue}></i></span>)}
          </div>
        ):(
          <div className="name">
            <span><input className="firstName" placeholder={"FirstName"} value={this.props.first_name} readOnly/></span>
            <span><input className="lastName" placeholder={"LastName"} value={this.props.last_name} readOnly/></span>
            {this.props.nameEditable?(<span><i className="fas fa-save" onClick={this.props.handleNameEditFalse}></i></span>):(<span><i className="far fa-edit" onClick={this.props.handleNameEditTrue}></i></span>)}
          </div>
        )}
        <NaviBar
          listOrder={this.props.listOrder}
          listContent={this.props.listContent}
          handleDeleteComponent={this.props.handleDeleteComponent}
          handleAddComponent={this.props.handleAddComponent}
          latitude={this.props.latitude}
          longitude={this.props.longitude}
          handleLocationChange={this.props.handleLocationChange}
          handleUpdateComponentTitle={this.props.handleUpdateComponentTitle}
        />
        <div className="outerLinks">
          <div className="facebook logo" onClick={()=>{this.props.handleModalShow("facebook")}}><i className="fab fa-facebook-f"></i></div>
          <div className="twitter logo" onClick={()=>{this.props.handleModalShow("twitter")}}><i className="fab fa-twitter"></i></div>
          <div className="linkedin logo" onClick={()=>{this.props.handleModalShow("linkedin")}}><i className="fab fa-linkedin-in"></i></div>
          <div className="instgram logo" onClick={()=>{this.props.handleModalShow("instgram")}}><i className="fab fa-instagram"></i></div>
          <div className="github logo" onClick={()=>{this.props.handleModalShow("github")}}><i className="fab fa-github"></i></div>
        </div>
      </div>
    );
  }
}
