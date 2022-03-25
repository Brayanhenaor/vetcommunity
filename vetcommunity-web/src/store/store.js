import { createStore } from 'redux'
import { storeReducer } from '../reducers/storeReducer'

export const store = createStore(
    storeReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)