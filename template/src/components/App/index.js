import { connect } from 'react-redux';
import { pageInitialize, pageLoaded } from '../../actions/appActions';
import App from './App';

const mapStateToProps = state => ({
  status: state && state.app.status,
});

const mapDispatchToProps = {
  pageInitialize,
  pageLoaded,
};

const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default connected;

