import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './GoogleMap.scss';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
class SimpleMap extends Component {
    static defaultProps = {
      center: {
        lat: 40.114032,
        lng: -88.224240
      },
      zoom: 17
    };
  
    render() {
      return (
        // Important! Always set the container height explicitly
        <div className="map" style={{ height: '30vh', width: '850px', margin: 'auto', marginTop: '20px', textAlign: 'left'}}>
          <div className="title">Location</div>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyASMkSlWnEKbA2DkDR1PLbfHqWuJ65dQqQ" }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <AnyReactComponent
              lat={40.114032}
              lng={-88.224240}
              text="My Woking Place"
            />
          </GoogleMapReact>
        </div>
      );
    }
  }
  
  export default SimpleMap;