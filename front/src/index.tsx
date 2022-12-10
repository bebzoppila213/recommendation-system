import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import './style/plugins.css'
import './style/style.css'
import './style/customStyle.css'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './state/state'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
  </BrowserRouter>
);
