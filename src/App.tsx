import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import { PostCode } from "./types";
import './App.css';
import NearestPostCodesContainer from './containers/NearestPostCodesContainer';
import PostCodeInfoContainer from './containers/PostCodeInfoContainer';

function App() {
  return (
  <Router>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/postcode/:postcode">
        <PostCodePage />
      </Route>
    </Switch>
  </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function PostCodePage() {
  const params = useParams<{ postcode: string }>();
  const postcode = PostCode.create(params.postcode)
  return (
    <div>
      <PostCodeInfoContainer postcode={postcode} />
      <NearestPostCodesContainer postcode={postcode} />
    </div>
  );
}


export default App;
