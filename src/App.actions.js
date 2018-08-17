import * as types from './App.actionTypes';

export const updateCounter = counter => 
  ({ type: types.UPDATE_COUNTER, counter });
export const setTime = ({ startTime, endTime}) =>
	({ type: types.SET_TIME, startTime, endTime });
export const setNumberDiff = numberDiff => 
	({ type: types.SET_NUMBER_DIFF, numberDiff })
export const clearState = () =>
	({ type: types.CLEAR_STATE })
