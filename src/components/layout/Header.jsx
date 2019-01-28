import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCurrentPath } from '../../actions/';
import './Header.css';

class Header extends Component {
  state = {}

  render() {

    const { currentPath } = this.props;

    return (

      <nav className="blue-gradient animated fadeIn fast header-background mb-1 navbar navbar-expand-lg navbar-dark info-color">
        <span className="navbar-brand">Dashboard</span>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-4"
          aria-controls="navbarSupportedContent-4" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent-4">
          <ul className="navbar-nav ml-auto">
            <li className={`${(currentPath === '/firstTab') ? 'nav-item active' : 'nav-item'}`}>
              <span className="nav-link">
                <Link to="/firstTab"><span style={{ color: 'white ' }}>FirstTab</span></Link>
                <span className="sr-only">(current)</span>
              </span>
            </li>
            <li className={`${(currentPath === '/secondTab') ? 'nav-item active' : 'nav-item'}`}>
              <span className="nav-link">
                <Link to="/secondTab"><span style={{ color: 'white ' }}>SecondTab</span></Link>
                <span className="sr-only">(current)</span>
              </span>
            </li>
            <li className={`${(currentPath === '/thirdTab') ? 'nav-item active' : 'nav-item'}`}>
              <span className="nav-link">
                <Link to="/thirdTab"><span style={{ color: 'white ' }}>ThirdTab</span></Link>
                <span className="sr-only">(current)</span>
              </span>
            </li>
          </ul>
        </div>
      </nav>

    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    currentPath: state.currentPath,
  }
}

const mapDispatchToProps = {
  updateCurrentPath: updateCurrentPath,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
