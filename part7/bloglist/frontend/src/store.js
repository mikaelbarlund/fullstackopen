import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import usersReducer from './reducers/usersReducer'
import loginReducer from './reducers/loginReducer'

const reducer = combineReducers({
  users: usersReducer,
  notification: notificationReducer,
  blogs: blogsReducer,
  login: loginReducer
})
const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)
export default store