// import { createStore } from "redux" --->this is deprecated method to create "store" in redux.Instead of this "configureStore" is used from redux-tookit
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import updateSongListing from "../reducers/songListingReducer";
import updateSignUpDetails from "../reducers/signUpDetailsReducer";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
const rootReducer = {
    songListing: updateSongListing,
    signUpDetails: updateSignUpDetails,
}
const persistConfig = {
    key: 'persist-store',
    storage,
}
const persistedReducer = persistReducer(persistConfig,combineReducers(rootReducer) )

// store is just a plain javascript object.
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store)
store.subscribe(() => console.log("state updated", store.getState()))

export default store;
export {persistor};