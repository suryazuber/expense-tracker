import { configureStore } from "@reduxjs/toolkit";

import counterReducer from './counter';

const store = configureStore({
    reducer:{
        counter:counterReducer
    }
});
export default store;


// default way
// const counterReducer = (state = { counter: 0 }, action) => {
//     if (action.type === 'increment') {
//         return {
//             counter: state.counter + 1
//         }
//     }

//     if (action.type === 'decrement') {
//         return {
//             counter: state.counter - 1
//         } 
//     }

//     return state;
// };

// const store = createStore(counterReducer);

// export default store;