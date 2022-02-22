import { useReducer } from 'react';
import './App.css';
import { ACTION } from '../const';
import { DigitButton } from './DigitButton';
import { History } from './History';
import { OperationButton } from '../OperationButton';
import { calcReducer } from '../reducer';

function App() {
	const [ { previousOperand, operation, currentOperand, history }, dispatch ] = useReducer(calcReducer, {
		history: []
	});

	return (
		<div className="App">
			<div className="calc">
				<h3 className="header">Standard Calculator</h3>
				<div className="main">
					<div className="calc-grid">
						<div className="output">
							{previousOperand}
							{operation}
							{currentOperand}
						</div>
						<DigitButton digit="7" dispatch={dispatch} />
						<DigitButton digit="8" dispatch={dispatch} />
						<DigitButton digit="9" dispatch={dispatch} />
						<button onClick={() => dispatch({ type: ACTION.DELETE })}>⌫</button>
						<OperationButton
							operationType={ACTION.SELECT_BASIC_OPERATION}
							operation="÷"
							dispatch={dispatch}
						/>

						<DigitButton digit="4" dispatch={dispatch} />
						<DigitButton digit="5" dispatch={dispatch} />
						<DigitButton digit="6" dispatch={dispatch} />
						<button onClick={() => dispatch({ type: ACTION.CLEAR_ALL })}>C</button>
						<OperationButton
							operationType={ACTION.SELECT_BASIC_OPERATION}
							operation="x"
							dispatch={dispatch}
						/>

						<DigitButton digit="3" dispatch={dispatch} />
						<DigitButton digit="2" dispatch={dispatch} />
						<DigitButton digit="1" dispatch={dispatch} />
						<button onClick={() => dispatch({ type: ACTION.CLEAR })}>CE</button>
						<OperationButton
							operationType={ACTION.SELECT_BASIC_OPERATION}
							operation="-"
							dispatch={dispatch}
						/>

						<button onClick={() => dispatch({ type: ACTION.TOGGLE_POSITIVE_NEGATIVE })}>+/-</button>
						<DigitButton digit="0" dispatch={dispatch} />
						<DigitButton digit="." dispatch={dispatch} />
						<OperationButton
							operationType={ACTION.SELECT_ADVANCED_OPERATION}
							operation="%"
							dispatch={dispatch}
						/>
						<OperationButton
							operationType={ACTION.SELECT_BASIC_OPERATION}
							operation="+"
							dispatch={dispatch}
						/>

						<OperationButton
							operationType={ACTION.SELECT_ADVANCED_OPERATION}
							operation="1/x"
							dispatch={dispatch}
						/>
						<OperationButton
							operationType={ACTION.SELECT_ADVANCED_OPERATION}
							operation="x²"
							dispatch={dispatch}
						/>
						<OperationButton
							operationType={ACTION.SELECT_ADVANCED_OPERATION}
							operation="√"
							dispatch={dispatch}
						/>
						<button onClick={() => dispatch({ type: ACTION.EVALUATE })} className="equal-btn">
							=
						</button>
					</div>
					<div className="history">
						<div className="header">History</div>
						<div className="history-list">
							{history.map((history, index) => <History key={index} history={history} />)}
							<button onClick={() => dispatch({ type: ACTION.CLEAR_HISTORY })}>
								<i class="fa fa-trash" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
