import ExpenseForm from "./ExpenseForm";
import useHttp from '../hooks/use-http';
import { useDispatch, useSelector } from "react-redux";

import './NewExpense.css';
import { counterActions } from "./store/counter";

const NewExpense = (props) => {
    const dispatch = useDispatch();
    const counter = useSelector(state => state.counter.counter)
    const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

    const createTask = (taskText, taskData) => {
        const generatedId = taskData.name; //firebase
        // const expenseData = { id: generatedId, text: taskText };

        const expenseData = {
            ...taskData,
            id: generatedId
        };
        console.log("expenseData", expenseData, taskText, taskData);
        props.onAddExpense(expenseData);
    };

    const receivedNewExpenseDataHandler = (receivedExpenseData) => {
        // const expenseData = {
        //     ...receivedExpenseData,
        //     id: Math.random.toString()
        // };
        // props.onAddExpense(expenseData);
        // console.log(receivedExpenseData);
        sendTaskRequest(
            {
                url: 'https://expense-tracker-1fc6f-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: { ...receivedExpenseData }
            },
            createTask.bind(null, receivedExpenseData)
        );
    }

    const incrementHandler = () => {
        dispatch(counterActions.increment());
    }
    const decrementHandler = () => {
        dispatch(counterActions.descrement());
    }
    if (error) {
        return <p>ERORR</p>
    }
    return (
        <div className="new-expense">
            {isLoading && <p>Loading...Wait!</p>}            
            <div>Counter: {counter}</div>
            <button onClick={incrementHandler}>increment</button>
            <button onClick={decrementHandler}>Decrement</button>
            <hr/>
            <ExpenseForm onReceivedNewExpenseData={receivedNewExpenseDataHandler} />
        </div>
    );
};

export default NewExpense;
/**
 * No direct connection between the sibling componets
 * We have to go parent to chile - child to parent
 */