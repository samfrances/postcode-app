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
  }, [postcode])

  return postCodeInfo;
}

function PostCodeContainer() {
  const { postcode } = useParams<{ postcode: string }>();
  const postCodeInfo = usePostCodeApi(PostCode.create(postcode));
  return (
    <PostCodeView {...{postCodeInfo }} />
  );
}

function PostCodeView(postcode_info: any) {
  return (
    <div>
      <h2>Postcode {JSON.stringify(postcode_info)}</h2>
    </div>
  );
}

export default App;
