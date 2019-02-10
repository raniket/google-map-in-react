import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCurrentPath } from '../actions/';
import './FirstTab.css'; 

class FirstTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const LOAD_GEO_JSON_DATA_URL = process.env.REACT_APP_LOAD_GEO_JSON_DATA_URL;
    fetch(LOAD_GEO_JSON_DATA_URL)
    .then(res => res.json())
    .then(data => data.features[0].geometry.coordinates[0])
    .then(coordinates => {
      coordinates = coordinates.map(item => ({lat: item[1], lng: item[0]}));
      this.setState({...this.state,  coordinates});
      this.renderMap();
      this.props.updateCurrentPath(this.props.match.path);
    });
  }

  // Embade the google maps script to html DOM and attache the callback to the window object.
  renderMap = () => {
    loadScript(`${process.env.REACT_APP_GOOGLE_MAPS_API}`);
    window.initMap = this.initMap;
  }

  initMap = () => {
    // Creat map instance for Gurugram, with provided lat lng.
    const map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: {lat: 28.4228859, lng: 76.8496963},
    });

    // Bound, provided by the client.
    const bound = {
      north: 28.543048,
      south: 28.343115132,
      east: 77.14079,
      west: 76.8536989,
    }

    // Define the LatLng coordinates for the outer rectangle.
    const outerCoords = [
      {lat: 28.543048, lng: 76.8536989}, // north west
      {lat: 28.343115132, lng: 76.8536989}, // south west
      {lat: 28.343115132, lng: 77.14079}, // south east
      {lat: 28.543048, lng: 77.14079},  // north east
    ];

    const grids = [];
    const createGrids = (dimentation, bound) => {
      const {north, south, east, west} = bound;
      const DIF_NS_16 = (north - south) / 16;
      const DIF_EW_16 = (east - west) / 16;
      for(let i = 0; i < dimentation; i++) {
        for(let j = 0; j < dimentation; j++) {
          let grid = [
            {lat: north - (i * DIF_NS_16), lng: west + (j * DIF_EW_16)},
            {lat: north - ((i+1) * DIF_NS_16), lng: west + (j * DIF_EW_16)},
            {lat: north - ((i+1) * DIF_NS_16), lng: west + ((j+1) * DIF_EW_16)},
            {lat: north - (i * DIF_NS_16), lng: west + ((j+1) * DIF_EW_16)},
          ]
          grids.push(grid);
        }
      }
    };

    // Create grids, in this case 16*16 grids.
    createGrids(16, bound);

    map.data.setStyle({
      strokeWeight: 1,
      strokeColor: 'DodgerBlue',
      strokeOpacity: 0.9,
    });

    // Draw outer ranctangle.
    new window.google.maps.Polygon({
      map: map,
      paths: outerCoords,
      strokeColor: '#000000',
      strokeOpacity: 0.8,
      strokeWeight: 2,  
      fillOpacity: 0.35,
      editable: true,
      geodesic: true
    });

    // Polygon for Gurugram.
    const gurugramPolygon = new window.google.maps.Polygon({
      map: map,
      paths:  this.state.coordinates
    });

    // Remove the grids which are not part of Gurugram.
    const visibleGrids = [];
    grids.forEach(grid => {
      grid.forEach(point => {
        if(window.google.maps.geometry.poly.containsLocation(new window.google.maps.LatLng(point.lat, point.lng), gurugramPolygon)) {
          visibleGrids.push(grid);
        }
      });
    });

    // Draw visible grids on the map.
    map.data.add({geometry: new window.google.maps.Data.Polygon([outerCoords, ...visibleGrids])})
    
  }

  render() {
    return (
      <div className="card" style={{ width: '100%', height: '50rem' }}>
        <div style={{ height: '100%', width: '100%' }}>
        <div id="map"></div>
        </div>
      </div>
    );
  }
}

// Embade the google mpas script tag to html DOM as first script tag.
function loadScript(url) {
  const index  = window.document.getElementsByTagName("script")[0]
  const script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
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
