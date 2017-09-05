import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducers'
import App from './app'

const enhancer = process.env.NODE_ENV === 'development' ?
  (window.__REDUX_DEVTOOLS_EXTENSION__ ?
    compose(
      applyMiddleware(thunk, createLogger()),
      window.__REDUX_DEVTOOLS_EXTENSION__()
    ) : compose(
      applyMiddleware(thunk, createLogger())
    )
  ) :
  compose(
    applyMiddleware(thunk)
  )

const store = createStore(reducer, enhancer)

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
