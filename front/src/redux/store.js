import { configureStore } from '@reduxjs/toolkit' //Pour créer mon store

// REDUCERS :
import Item from './reducers/item.reducer'
import User from './reducers/user.reducer'

export default configureStore({
    reducer: {
        itemReducer: Item,
        userReducer: User
    }
})

