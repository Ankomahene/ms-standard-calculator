import { ACTION } from './const';

export const calcReducer = (state, { type, payload }) => {
	switch (type) {
		case ACTION.ADD_DIGIT:
			if (!state.operation) {
				return addDigit(state, 'previousOperand', payload);
			} else {
				return addDigit(state, 'currentOperand', payload);
			}
		case ACTION.TOGGLE_POSITIVE_NEGATIVE:
			if (!!state.previousOperand && !state.current && !state.operation) {
				return {
					...state,
					previousOperand: state.previousOperand.includes('-')
						? state.previousOperand.replace('-', '')
						: `-${state.previousOperand}`
				};
			}
			return state;
		case ACTION.DELETE:
			if (state.overwrite) {
				return { ...state, previousOperand: '0', operation: null, currentOperand: null, overwrite: false };
			}
			if (!state.previousOperand && !state.operation && !state.currentOperand) {
				return state;
			}
			if (!!state.currentOperand) {
				return { ...state, currentOperand: state.currentOperand.slice(0, -1) };
			}
			if (!!state.operation) {
				return { ...state, operation: state.operation.slice(0, -1) };
			}
			return { ...state, previousOperand: state.previousOperand.slice(0, -1) };
		case ACTION.CLEAR:
			return { ...state, previousOperand: '', operation: '', currentOperand: '' };
		case ACTION.CLEAR_ALL:
			return { ...state, previousOperand: '', operation: '', currentOperand: '' };
		case ACTION.SELECT_BASIC_OPERATION:
			if (!!state.previousOperand && !state.currentOperand) {
				return { ...state, operation: payload.operation };
			}

			if (!!state.previousOperand && !!state.currentOperand) {
				return {
					...state,
					previousOperand: evaluateBasicOperation(state),
					currentOperand: null,
					operation: payload.operation,
					overwrite: true,
					history: [ ...state.history, getHistory({ ...state, type: 'basic' }) ]
				};
			}

			return state;
		case ACTION.SELECT_ADVANCED_OPERATION:
			if (!!state.previousOperand && !state.currentOperand) {
				state = { ...state, operation: payload.operation };
				return {
					...state,
					previousOperand: evaluateAdvancedOperation(state),
					currentOperand: null,
					operation: null,
					overwrite: true,
					history: [
						getHistory({
							...state,
							type: 'advanced'
						}),
						...state.history
					]
				};
			}

			if (!!state.previousOperand && !!state.currentOperand) {
				state = {
					...state,
					previousOperand: evaluateBasicOperation(state),
					operation: payload.operation,
					currentOperand: null
				};

				return {
					...state,
					previousOperand: evaluateAdvancedOperation(state),
					currentOperand: null,
					operation: null,
					overwrite: true,
					history: [
						getHistory({
							...state,
							type: 'advanced'
						}),
						...state.history
					]
				};
			}

			return state;
		case ACTION.EVALUATE:
			if (!!state.previousOperand && !!state.currentOperand) {
				return {
					...state,
					previousOperand: evaluateBasicOperation(state),
					currentOperand: null,
					operation: null,
					history: [ getHistory({ ...state, type: 'basic' }), ...state.history ],
					overwrite: true
				};
			}
			return state;
		case ACTION.CLEAR_HISTORY:
			return { ...state, history: [] };
		default:
			return state;
	}
};

const addDigit = (state, operand, payload) => {
	if (
		(!state[operand] && payload.digit === '.') ||
		(payload.digit === '0' && state[operand] === '0') ||
		(payload.digit === '.' && state[operand].includes('.'))
	) {
		return state;
	}
	if (payload.digit !== '0' && payload.digit !== '.' && state.previousOperand === '0') {
		return { ...state, [operand]: payload.digit };
	}
	if (state.overwrite && !state.operation && payload.digit !== '.') {
		return { ...state, previousOperand: payload.digit, operation: null, currentOperand: null, overwrite: false };
	}
	return { ...state, [operand]: `${state[operand] || ''}${payload.digit}` };
};

const evaluateBasicOperation = ({ previousOperand, operation, currentOperand }) => {
	const prev = parseFloat(previousOperand);
	const current = parseFloat(currentOperand);
	if (isNaN(prev) || isNaN(current)) {
		return '';
	}
	let result = '';

	switch (operation) {
		case '+':
			result = `${prev + current}`;
			break;
		case '-':
			result = `${prev - current}`;
			break;
		case 'x':
			result = `${prev * current}`;
			break;
		case '÷':
			result = current === 0 ? '' : `${prev / current}`;
			break;
		default:
			result = '';
	}
	return result;
};

const evaluateAdvancedOperation = ({ previousOperand, operation }) => {
	const prev = parseFloat(previousOperand);
	if (isNaN(prev)) {
		return '';
	}
	let result = '';
	switch (operation) {
		case '%':
			result = `${previousOperand / 100}`;
			break;
		case 'x²':
			result = `${previousOperand * previousOperand}`;
			break;
		case '√':
			result = `${Math.sqrt(previousOperand)}`;
			break;
		case '1/x':
			result = `${1 / previousOperand}`;
			break;
		default:
			result = '';
	}
	return result;
};

const getHistory = ({ previousOperand, operation, currentOperand, type }) => {
	return {
		previousOperand: type === 'basic' ? previousOperand : `${operation}(${previousOperand})`,
		operation: type === 'basic' ? operation : '',
		currentOperand: type === 'basic' ? currentOperand : '',
		type,
		result:
			type === 'basic'
				? evaluateBasicOperation({ previousOperand, operation, currentOperand })
				: evaluateAdvancedOperation({ previousOperand, operation })
	};
};
