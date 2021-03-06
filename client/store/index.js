import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import symbols from './symbols'
import trade from './trade'
import portfolio from './portfolio'
import stock from './stock'

const reducer = combineReducers({user, symbols, trade, portfolio, stock})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './symbols'
export * from './trade'
export * from './portfolio'
export * from './stock'