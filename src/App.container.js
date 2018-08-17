import { connect } from 'react-redux';
import App from './App.component';
import { 
  updateCounter,
  setTime,
	setNumberDiff,
	clearState
} from './App.actions';

const mapStateToProps = (state) => ({
  counter: state.counter,
	startTime: state.startTime,
	endTime: state.endTime,
	numberDifference: state.numberDifference
});

const mapDispatchToProps = {
  updateCounter,
  setTime,
	setNumberDiff,
	clearState
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
