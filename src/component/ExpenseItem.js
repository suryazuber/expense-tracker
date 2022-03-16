import React, { useState } from "react";
import ExpenseDate from "./ExpenseDate";
import Card from "./UI/Card";

import "./ExpenseItem.css";
const ExpenseItem = (props) => {
    //Use State for value and updatevalue function
    const [title, setTitle] = useState(props.title);

    const clickHandler = () => {
        //Update value using function
        setTitle("Click Called - Updated!");
        console.log("clickHandler Clicked!!!", title);
    };
    return (
        <Card className="expense-item">
            <ExpenseDate date={props.date}></ExpenseDate>
            <div className="expense-item__description">
                <h2>{title}</h2>
                <div className="expense-item__price">${props.amount}</div>
            </div>
            <button onClick={clickHandler}>Test Event</button>
        </Card>
    );
};

export default ExpenseItem;
