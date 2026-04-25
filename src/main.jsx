
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { Provider } from "react-redux";
import { CountStore } from "./Redux/CountStore";
import './I18n/i18n';
import './index.css' 
createRoot(document.getElementById('root')).render(
    <Provider store={CountStore}>
   <BrowserRouter >
       <App />
   </BrowserRouter>
  </Provider>

)
