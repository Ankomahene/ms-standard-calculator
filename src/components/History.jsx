import React from 'react';

export const History = ({ history }) => {
	const { previousOperand, operation, currentOperand, result } = history;

	return (
		<div className="history-item">
			<span> {previousOperand} </span>
			<span> {operation} </span>
			<span> {currentOperand} </span>
			<span> = {result} </span>
		</div>
	);
};
