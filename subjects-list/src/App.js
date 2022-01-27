import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
/*the BrowserRouter component is the parent to all 
of your routes. React-router-dom uses a component within 
the BrowserRouter called Switch, Switch is basically the 
react-router equivalent to a JavaScript switch statement. 
Within the Switch component, Route and Redirect components are nested inside.*/ 
import './App.css';
import About from "./pages/About";
import AddEdit from "./pages/AddEdit";
import Home from "./pages/Home";
import View from "./pages/View";
import { ToastContainer } from 'react-toastify'; 
//The ToastContainer is just a simple component, which you can write text or even custom JSX elements in to customize the toast even more.
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
<Header/>
      <ToastContainer position="top-center"/>
    <Switch> 
      <Route exact path="/"component={Home} />
      <Route path="/add"component={AddEdit} />
      <Route path="/update/:id"component={AddEdit} />
      <Route path="/view/:id"component={View} />
      <Route path="/about"component={About} />
    </Switch>

    </div>
    </BrowserRouter>
  );
}

export default App;
