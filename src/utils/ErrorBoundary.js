import React, { Component } from 'react';
// import SomethingWentWrong from '../assets/something_went_wrong.png';
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path , style={{ height: '40rem' }}
      return (
        <div className="card text-center" style={{ width: '70rem', height: '35rem' }}>
          {/* <img src={SomethingWentWrong} alt="something went wrong" style={{ width: '70rem', height: '40rem' }} /> */}
          <h2 className="text-center" style={{ color: 'tomato', margin: '0 auto' }}>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;