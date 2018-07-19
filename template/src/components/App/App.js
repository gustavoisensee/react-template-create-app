/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import consStatus from '../../constants/status';
import './app.scss';

const PageOne = () => (
  <div>Page 1</div>
);

const PageTwo = () => (
  <div>Page 2</div>
);

const Routes = {
  PAGE_ONE: '/',
  PAGE_TWO: '/page-two',
};

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
      <Router>
        <Fragment>
          {isLoading && <span>Loading ...</span>}
          {isLoaded &&
            <Fragment>
              <div>
                <ul>
                  <li>
                    <Link to={Routes.PAGE_ONE}>Page One</Link>
                  </li>
                  <li>
                    <Link to={Routes.PAGE_TWO}>Page Two</Link>
                  </li>
                </ul>
              </div>
              <hr />
              <div>
                <h1>Hello, world.</h1>
                <Route exact path={Routes.PAGE_ONE} component={PageOne} />
                <Route path={Routes.PAGE_TWO} component={PageTwo} />
              </div>
            </Fragment>
          }
        </Fragment>
      </Router>
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
