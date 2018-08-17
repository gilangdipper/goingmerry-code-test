import * as types from './App.actionTypes';

const initialState = {
	counter: 'hh:mm:ss',
	startTime: '',
	endTime: '',
	numberDifference: 0
};

export default function currencies(state = initialState, payload) {
  switch (payload.type) {
    case types.UPDATE_COUNTER:
      return { ...state, counter: payload.counter }

    case types.SET_TIME:
			return { ...state, startTime: payload.startTime, endTime: payload.endTime }

		case types.SET_NUMBER_DIFF:
			return { ...state, numberDifference: payload.numberDiff }

		case types.CLEAR_STATE:
			return { ...initialState }

    default:
      return state
  }
};
