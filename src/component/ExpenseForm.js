import React, { useState } from 'react';

import './ExpenseForm.css';

const ExpenseForm = (props) => {

    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [enteredDate, setEnteredDate] = useState('');

    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
    }
    const amountChangeHandler = (event) => {
        setEnteredAmount(event.target.value);
    }
    const dateChangeHandler = (event) => {
        setEnteredDate(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const expenseData = {
            title: enteredTitle,
            amount: enteredAmount,
            date: new Date(enteredDate)
        }

        props.onReceivedNewExpenseData(expenseData);
        setEnteredAmount('');
        setEnteredTitle('');
        setEnteredDate('');
    }
    return (
        <form onSubmit={submitHandler}>
            <div className='new-expense__controls'>
                <div className='new-expense__control'>
                    <div>Title</div>
                    <div><input type='text' value={enteredTitle} onChange={titleChangeHandler} /></div>
                </div>
                <div className='new-expense__control'>
                    <div>Amount</div>
                    <div><input type='number' min='0.01'
                        step='0.01' value={enteredAmount} onChange={amountChangeHandler} /></div>
                </div>
                <div className='new-expense__control'>
                    <div>Date</div>
                    <div><input type='date' min='2019-01-01'
                        max='2022-12-31' value={enteredDate} onChange={dateChangeHandler} /></div>
                </div>
            </div>

            <div className='new-expense__actions'>
                <div><button type='submit' >Add Expense</button></div>
            </div>
        </form>
    );
}
export default ExpenseForm;