import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import Home from "./components/Home.jsx";
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path = "/" component = { LandingPage } />
        <Route path = "/home" component = { Home }/>
      </Switch>
      <h1>Henry Videogames</h1>
    </div>
    </BrowserRouter>
  );
}

export default App;
