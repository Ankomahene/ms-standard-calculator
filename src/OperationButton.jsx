import React from 'react';
import { ACTION } from './const.js';

export const OperationButton = ({ operationType, operation, dispatch }) => {
	return (
		<button
			onClick={() => dispatch({ type: operationType, payload: { operation } })}
			className={operationType === ACTION.SELECT_BASIC_OPERATION ? 'basic-operation-btn' : ''}
		>
			{operation}
		</button>
	);
};
