import React from 'react';
import { ACTION } from '../const';

export const DigitButton = ({ digit, dispatch }) => {
	return <button onClick={() => dispatch({ type: ACTION.ADD_DIGIT, payload: { digit } })}> {digit} </button>;
};
