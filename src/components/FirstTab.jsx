import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCurrentPath } from '../actions/';
import './FirstTab.css'; 

class FirstTab extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  // static defaultProps = {
  //   center: {
  //     lat: 59.95,
  //     lng: 30.33
  //   },
  //   zoom: 11
  // };

  componentDidMount() {
    this.renderMap();
    this.props.updateCurrentPath(this.props.match.path);
  }

  // Embade the google maps script to html DOM and attache the callback to the window object.
  renderMap = () => {
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDzlczruooLb_Y0ek5e8VY8Z_sPxva3ofQ&callback=initMap');
    window.initMap = this.initMap
  }

  initMap = () => {

    // Creat map instance for Gurugram, provided lat lng.
    const map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: {lat: 28.4228859, lng: 76.8496963},
    });

    // Load geojson data for Gurgram + Haryana from this url.
    const loadGeoJsonData = 'https://nominatim.openstreetmap.org/search.php?q=Gurugram+Haryana&polygon_geojson=1&format=geojson';

    // Provided by the client.
    const bound = {
      north: 28.543048,
      south: 28.343115132,
      east: 77.14079,
      west: 76.8536989,
    }

    // Define the LatLng coordinates for the outer path.
    const outerCoords = [
      {lat: 28.543048, lng: 76.8536989}, // north west
      {lat: 28.343115132, lng: 76.8536989}, // south west
      {lat: 28.343115132, lng: 77.14079}, // south east
      {lat: 28.543048, lng: 77.14079},  // north east
    ];

    const grids = [];
    // Create grid, in the case 16*16 grid.
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

    createGrids(16, bound);
    
    // // Define the LatLng coordinates for an inner path.
    // var innerCoords1 = [
    //   {lat: -33.364, lng: 154.207},
    //   {lat: -34.364, lng: 154.207},
    //   {lat: -34.364, lng: 155.207},
    //   {lat: -33.364, lng: 155.207}
    // ];

    // map.data.add({geometry: new window.google.maps.Data.Polygon([outerCoords, ...grids])})
    map.data.loadGeoJson(loadGeoJsonData);
    map.data.setStyle({
      // fillColor: 'green',
      // strokeWeight: 1
    });

    // Draw polygon for Gurugram place on map using map instance and provided bound.
    new window.google.maps.Polygon({
      map: map,
      paths: outerCoords,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,  
      // fillColor: '#FF0000',
      fillOpacity: 0.35,
      // draggable: true,
      editable: true,
      geodesic: true
    });

    map.data.add({geometry: new window.google.maps.Data.Polygon([outerCoords, ...grids])})
    
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
  var index  = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
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
