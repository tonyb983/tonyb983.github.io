import React from 'react';
import { repeat } from 'lodash';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(
      `${repeat('=', 15)}\nError Boundary Catch:\nerror: ${error}\nerrorInfo: ${JSON.stringify(
        errorInfo,
        null,
        2,
      )}\n${repeat('=', 15)}`,
    );
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <React.Fragment>
          <h1>Something went wrong.</h1>
          <h4>Error: {JSON.stringify(this.state.error, null, '\t')}</h4>
        </React.Fragment>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
