import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import authReducer from "./state";
import { configureStore } from "@reduxjs/toolkit";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from "react-redux";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import { PersistGate } from 'redux-persist/integration/react';
import storage from "redux-persist/lib/storage";



const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
            <BrowserRouter>
                <GoogleOAuthProvider
                    clientId="471551003070-fac2f35e8qev0b7snj21vr9vatld99oa.apps.googleusercontent.com">
                    <App />
                </GoogleOAuthProvider>
            </BrowserRouter>
        </PersistGate>
    </Provider>
);

