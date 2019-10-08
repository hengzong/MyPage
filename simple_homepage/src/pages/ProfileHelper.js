import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import './ProfileHelper.scss';


function NaviBar(props) {
  return (
    <div className="naviBar">
      <div className="naviBarList">
      {props.listContent.map(function(item) {
        return(
          <a href={'#'+item._id} key={item._id}>
            <div className="naviBarItem">
              <span className="barTitle">{item.title}</span>
            </div>
          </a>
        );
      })}
      <a href='#location'>
        <div className="naviBarItem">
          <span className="barTitle">Location</span>
        </div>
      </a>
      </div>
    </div>
  );
}

function ProfileNavigation(props) {
  return (
    <div className="navigation-profile">
      <div><img alt="avatar img" className="avatar" src= {props.avatar_url}/></div>
      <div>
        <span className="user-name">{props.first_name}</span>
        <span className="user-name">{props.last_name}</span>
      </div>
      <NaviBar
        listContent={props.listContent}
      />
      <div className="outerLinks">
        <div className={props.facebook_url?"facebook logo":"none"}><a target="_blank" rel="noopener noreferrer" href={props.facebook_url}><i className="fab fa-facebook-f"></i></a></div>
        <div className={props.twitter_url?"twitter logo":"none"}><a target="_blank" rel="noopener noreferrer" href={props.twitter_url}><i className="fab fa-twitter"></i></a></div>
        <div className={props.linkedin_url?"linkedin logo":"none"}><a target="_blank" rel="noopener noreferrer" href={props.linkedin_url}><i className="fab fa-linkedin-in"></i></a></div>
        <div className={props.instgram_url?"instgram logo":"none"}><a target="_blank" rel="noopener noreferrer" href={props.instgram_url}><i className="fab fa-instagram"></i></a></div>
        <div className={props.github_url?"github logo":"none"}><a target="_blank" rel="noopener noreferrer" href={props.github_url}><i className="fab fa-github"></i></a></div>
      </div>
    </div>
  );
}

function ProfileContent(props) {
  return (
    <div className="content-profile">
      {props.listContent.map(function(item) {
        return(
          <div className="item" key={item._id} id={item._id}>
            <div className="title">{item.title}</div>
            <div className="componentContent">
              <div>{ReactHtmlParser(item.innerHTML)}</div>
            </div>
          </div>
        );
      })}
      <div className="item">
        <div className="title" id="location">{"Location"}</div>
        <a target="_blank" rel="noopener noreferrer" href={"https://www.google.com/maps/dir/?api=1&destination="+props.latitude+","+props.longitude}>
          <img alt="map" id="map" src={"https://maps.googleapis.com/maps/api/staticmap?&size=800x400&zoom=15&scale=2&markers=color:red%7C"+props.latitude+","+props.longitude+"&key=AIzaSyASMkSlWnEKbA2DkDR1PLbfHqWuJ65dQqQ"}/>
        </a>
      </div>
    </div>
  );
}


export {ProfileNavigation, ProfileContent};
