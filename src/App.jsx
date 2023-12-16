// openAccount, deposit, withdraw, request loan , payLoan, closeAccount

import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
  deposit: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "openAccount":
      return { ...state, balance: 500, isActive: true };
    case "deposit":
      return { ...state, balance: state.balance + 150 };
    case "withdraw":
      return { ...state, balance: state.balance - 50 };

    case "requestLoan":
      if (state.isActive && state.loan === 0) {
        const updatedLoan = state.loan + 5000;
        return {
          ...state,
          loan: updatedLoan,
          balance: state.balance + updatedLoan,
        };
      }
      break;
    case "payLoan":
      if (state.isActive && state.loan > 0)
        return {
          ...state,
          balance: state.balance - state.loan,
          loan: state.loan - 5000,
        };
      break;
    case "closeAccount":
      if (state.isActive && state.loan === 0) return { ...initialState };
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  //handle open account
  const openAcc = () => {
    dispatch({ type: "openAccount" });
  };

  //handle deposit
  const depositCash = () => {
    dispatch({ type: "deposit" });
  };

  //handle withdraw
  const withdraw = () => {
    dispatch({ type: "withdraw" });
  };

  //request loan
  const reqLoan = () => {
    dispatch({ type: "requestLoan" });
  };

  //pay loan
  const payLoan = () => {
    dispatch({ type: "payLoan" });
  };

  //close
  const closeAccount = () => {
    dispatch({ type: "closeAccount" });
  };
  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {state.balance}</p>
      <p>Loan: {state.loan}</p>

      <p>
        <button
          onClick={() => {
            openAcc();
          }}
          disabled={state.isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            depositCash();
          }}
          disabled={!state.isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            withdraw();
          }}
          disabled={!state.isActive || state.balance <= 0}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            reqLoan();
          }}
          disabled={!state.isActive || state.loan > 0}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            payLoan();
          }}
          disabled={!state.isActive || state.loan === 0}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            closeAccount();
          }}
          disabled={!state.isActive || state.loan > 0}
        >
          Close account
        </button>
      </p>
    </div>
  );
}

export default App;
