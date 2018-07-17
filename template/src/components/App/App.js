import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import consStatus from '../../constants/status';
import './app.scss';

class App extends PureComponent {
  componentWillMount() {
    this.props.pageInitialize();
  }

  componentDidMount() {
    setTimeout(this.props.pageLoaded, 1000);
  }

  render() {
    const { status } = this.props;
    const isLoading = status === consStatus.INITIALIZE;
    const isLoaded = status === consStatus.LOADED;
    return (
      <div>
        {isLoading && <span>Loading ...</span>}
        {isLoaded && <h1>Hello, world.</h1>}
      </div>
    );
  }
}

App.defaultProps = {
  status: null,
};

App.propTypes = {
  pageInitialize: PropTypes.func.isRequired,
  pageLoaded: PropTypes.func.isRequired,
  status: PropTypes.oneOf([
    consStatus.INITIALIZE,
    consStatus.LOADED,
  ]),
};

export default App;
