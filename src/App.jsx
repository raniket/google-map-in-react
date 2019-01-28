import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import ErrorBoundary from './utils/ErrorBoundary';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import FirstTab from './components/FirstTab.jsx';
import SecondTab from './components/SecondTab.jsx';
import ThirdTab from './components/ThirdTab.jsx';
import { getResource } from './actions';

class App extends Component {
  componentDidMount() {
    // this.props.getResource();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <div className="container container-custom-css">
            <ErrorBoundary>
              <Switch>
                <Route exact path="/" render={() => (<Redirect to="/firstTab" />)} />
                <Route exact path="/firstTab" component={FirstTab} />
                <Route exact path="/secondTab" component={SecondTab} />
                <Route path="/thirdTab" component={ThirdTab} />
              </Switch>
            </ErrorBoundary>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = {
  getResource: getResource
};

export default connect(null, mapDispatchToProps)(App);
