import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store, persistor } from './RTK/store.ts'
import { PersistGate } from 'redux-persist/integration/react'


const rootElement = document.getElementById("root")

createRoot(rootElement!).render(

  <Provider store={store}>
    <PersistGate persistor={persistor} loading={<>loading...</>}>
      <App />
    </PersistGate>
  </Provider>
)