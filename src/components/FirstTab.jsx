import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCurrentPath } from '../actions/';
import GoogleMapReact from 'google-map-react';

const MapComponent = ({ text }) => <div>{text}</div>;


class FirstTab extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  componentDidMount() {
    this.props.updateCurrentPath(this.props.match.path);
  }

  render() {
    return (
      <div className="card" style={{ width: '100%', height: '50rem' }}>
        <div style={{ height: '100%', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <MapComponent
              lat={28.4595}
              lng={77.0266}
              text={'Gurgaon'}
            />
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const currentPath = (ownProps.match.path);
  return {
    currentPath: currentPath,
  }
}

const mapDispatchToProps = {
  updateCurrentPath: updateCurrentPath,
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstTab);
