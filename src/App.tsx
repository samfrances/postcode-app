import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import './App.css';

function App() {
  return (
  <Router>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/postcode/:postcode">
        <PostCode />
      </Route>
    </Switch>
  </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function PostCode() {
  const { postcode } = useParams<{ postcode: string }>();
  return (
    <div>
      <h2>Postcode {postcode}</h2>
    </div>
  );
}


export default App;
