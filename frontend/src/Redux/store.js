import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import {
   persistStore,
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'



const persistConfig = {
   key: 'root',
   version: 1,
   storage,
}

const rootReducer = combineReducers({
   auth: authSlice,
   Job: jobSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)





// const store = configureStore({
//       reducer:{
//           auth: authSlice,
//           Job: jobSlice,
//       }
// })

const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }),
})

export default store;