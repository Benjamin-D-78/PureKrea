import { configureStore } from '@reduxjs/toolkit' //Pour créer mon store

// REDUCERS :
import Item from './reducers/item.reducer'

export default configureStore({
    reducer: {
        itemReducer: Item
    }
})

