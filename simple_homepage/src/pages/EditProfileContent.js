import React, {Component} from 'react';
import Modal from './Modal.js';
import './EditProfileContent.scss';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ReactHtmlParser from 'react-html-parser';
import draftToHtml from 'draftjs-to-html';

const hashConfig = {
  trigger: '#',
  separator: ' ',
}

class EditorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { };
    const initalState = this.props.editorState;
    console.log("initalState: "+initalState);
    if (initalState) {
      this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(initalState)));
    } else {
      this.state.editorState = EditorState.createEmpty();
    }

    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  onEditorStateChange(editorState){
    this.setState({
      editorState,
    });
  };

  handleSave() {
    const contentState = this.state.editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const newEditorState = JSON.stringify(rawContentState);
    let newHTML = draftToHtml(rawContentState, hashConfig, true);
    console.log(newHTML);
    this.props.handleUpdateComponentContent(this.props.component_id, newHTML, newEditorState);
    this.props.handleModalClose();
  }

  render() {
    const { editorState } = this.state;
    return (
      <div className="item-content">
        <div className="editor">
        <Editor
          ref="editor"
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
        </div>
        <button className="saveButton" onClick={this.handleSave}>save</button>
      </div>
    );
  }
}

export default class EditProfileContent extends Component {
  constructor(props) {
    super(props);
    this.state={
      modalShow: false,
      componentID: "",
      currTitle: "",
      currHTML: "",
      currEditorState: "",
    }
    this.handleModalShow = this.handleModalShow.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleModalClose() {
    this.setState({
      modalShow: false
    });
  }

  handleModalShow(component_id, title, html, editorState) {
    console.log("handleModalShow: " + component_id);
    console.log("handleModalShow: " + title);
    console.log("handleModalShow: " + editorState);
    this.setState({
      componentID: component_id,
      currTitle: title,
      currHTML: html,
      currEditorState: editorState,
      modalShow: true,
    });
  }

  render() {
    var curr = this;
    return (
      <div className="content">
        {this.props.listContent.map(function(item) {
          return(
            <div className="item" key={item._id} onDoubleClick={()=>curr.handleModalShow(item._id, item.title, item.innerHTML, item.editorState)}>
              <div className="title">{item.title}</div>
              <div className="componentContent">
                <div className={curr.state.modalShow?"none":""}>{ReactHtmlParser(item.innerHTML)}</div>
              </div>
            </div>
          );
        })}
        <div className="item">
          <div className="title">{"Location"}</div>
          <a target="_blank" rel="noopener noreferrer" href={"https://www.google.com/maps/dir/?api=1&destination="+this.props.latitude+","+this.props.longitude}>
            <img alt="map" id="map" src={"https://maps.googleapis.com/maps/api/staticmap?&size=800x400&zoom=15&scale=2&markers=color:red%7C"+this.props.latitude+","+this.props.longitude+"&key=AIzaSyASMkSlWnEKbA2DkDR1PLbfHqWuJ65dQqQ"}/>
          </a>
        </div>
        <Modal
          show={this.state.modalShow}
          handleModalClose={this.handleModalClose}
          disableClose={true}
        >
            {this.state.modalShow?<div><EditorComponent
              component_id={this.state.componentID}
              editorState={this.state.currEditorState}
              handleUpdateComponentContent={this.props.handleUpdateComponentContent}
              handleModalClose={this.handleModalClose}
            /></div>:<div></div>}

        </Modal>
      </div>

    );
  }
}
