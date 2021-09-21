import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import { PostCode } from "./types";
import "./App.css";
import "./vendor/Skeleton-2.0.4/css/normalize.css";
import "./vendor/Skeleton-2.0.4/css/skeleton.css";
import NearestPostCodesContainer from "./containers/NearestPostCodesContainer";
import PostCodeInfoContainer from "./containers/PostCodeInfoContainer";
import SearchForm from "./components/SearchForm";

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
  return (
    <div id="app" className="container">
      <div className="row">
        <SearchForm />
      </div>
    </div>
  );
}

function PostCodePage() {
  const params = useParams<{ postcode: string }>();
  const postcode = PostCode.create(params.postcode);
  return (
    <div id="app" className="container">
      <div className="row">
        <SearchForm />
      </div>
      <div className="row">
        <PostCodeInfoContainer postcode={postcode} />
      </div>
      <div className="row">
        <NearestPostCodesContainer postcode={postcode} />
      </div>
    </div>
  );
}


export default App;
