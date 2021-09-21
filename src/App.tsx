import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import ApiClient from "./apiClient";
import { PostCode } from "./types";
import './App.css';
import { PostCodeResponse } from './apiClient/types';
import PostCodeView from './components/PostCodeView';

function App() {
  return (
  <Router>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/postcode/:postcode">
        <PostCodeContainer />
      </Route>
    </Switch>
  </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

const client = new ApiClient();

function usePostCodeApi(postcode: PostCode) {
  const [postCodeInfo, setPostCodeInfo] = useState<null|PostCodeResponse>(null)
  useEffect(() => {
    (async () => {
      const result = await client.getPostCodeInfo(postcode);
      setPostCodeInfo(result);
    })()
  }, [postcode.value])

  return postCodeInfo;
}

function PostCodeContainer() {
  const params = useParams<{ postcode: string }>();
  const postcode = PostCode.create(params.postcode)
  const data = usePostCodeApi(postcode);
  return (
    <PostCodeView {...{postcode, data }} />
  );
}


export default App;
