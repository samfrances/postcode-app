import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { PostcodeClient } from "./apiClient";
import { PostCode } from './types';

// TODO: remove temporary test-run code
(async function testrun() {
  const client = new PostcodeClient(fetch.bind(window));
  const data = await client.getPostCodeInfo(PostCode.create("CB4 0GF"));
  console.log(data);

  const baddata = await client.getPostCodeInfo(PostCode.create("foo"));
  console.log(baddata);
})();


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

