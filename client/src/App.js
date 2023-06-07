import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage.jsx";
import Home from "./components/Home.jsx";
import CreateVideogame from "./components/CreateVideogame.jsx";
import Detail from "./components/Detail.jsx";
import './App.css';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path = "/" component = { LandingPage } />
        <Route path = "/home/:id" component = { Detail }/>
        <Route path = "/home" component = { Home }/>
        <Route path = "/videogame" component = { CreateVideogame }/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
