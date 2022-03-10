import React, { useEffect, useState } from "react";

import Expenses from "./component/Expenses";
import NewExpense from "./component/NewExpense";

// const DUMMY_EXPENSES = [
//     {
//         id: "e1",
//         title: "Toilet Paper",
//         amount: 94.12,
//         date: new Date(2020, 7, 14),
//     },
//     {
//         id: "e2",
//         title: "New TV",
//         amount: 799.49,
//         date: new Date(2021, 2, 12),
//     },
//     {
//         id: "e3",
//         title: "Car Insurance",
//         amount: 294.67,
//         date: new Date(2021, 2, 28),
//     },
//     {
//         id: "e4",
//         title: "New Desk (Wooden)",
//         amount: 450,
//         date: new Date(2021, 5, 12),
//     },
// ];
const App = () => {
    const [expenses, setExpenses] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    useEffect(() => {
        const fetchExpenses = async () => {
            const response = await fetch('https://expense-tracker-1fc6f-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json', {});
            const responseData = await response.json();

            let loadExpenses = [];
            for (const key in responseData) {
                loadExpenses.push({
                    id: key, //responseData[key].id,
                    title: responseData[key].title,
                    amount: responseData[key].amount,
                    date: new Date(responseData[key].date),
                });
            }
            console.log("new loadExpenses", loadExpenses);
            setExpenses(loadExpenses);
            setisLoading(false);
        };
        fetchExpenses().catch((error) => {
            setisLoading(false);
            console.log("error loadExpenses", error.message);
        });
    }, []);

    const addExpenseHandler = (expense) => {
        // console.log('App.js');
        // console.log(expense);
        setExpenses((prevExpenses) => {
            return [expense, ...prevExpenses];
        });
    };

    if (isLoading) {
        return (<p>isLoading</p>)
    }
    return (
        <div>
            <NewExpense onAddExpense={addExpenseHandler} />
            <Expenses items={expenses} />
        </div>
    );
}

export default App;
