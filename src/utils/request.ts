import fetch from 'isomorphic-fetch';
import environment from './environment';
import { Modal, Button } from 'antd';
import { debounce } from 'lodash';
import relogin from './relogin';
import React from 'react';

function info() {
  Modal.info({
    content: React.createElement(relogin),
    onOk() {},
  });
}
const debounceInfo = debounce(info);

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url: string, options) {
  console.log(typeof url)
  
  options.headers = {};
  

  const m = (options.method || '').toLocaleLowerCase();
  if (m === 'post' || m === 'put' || m === 'patch' || m === 'view') {
    options.headers = {emulateJson: true, headers: {"Content-Type": "application/json",'X-Request-Uri':'/'}};
    

  }
  debugger
  return fetch(url, options)
    .then(response => {
      if (response.status == 401) {
        debounceInfo();
      }
      let jsonObj = Promise.resolve(response);
      try {
        jsonObj = response.json();

      } catch (err) {}
      return jsonObj;
    })
    .then(response => response)
    .catch(err => ({
      status: err && err.status,
      state: 4,
      message: err && err.message,
    }));
}
