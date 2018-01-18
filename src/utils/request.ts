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
export default function request(url: string, options: RequestInit = {}) {
  options.headers = {};
  const token = window.sessionStorage.getItem(environment.tokenName);
  const expiration = parseInt(window.sessionStorage.getItem(environment.expiration));
  // 需要授权访问的接口
  if (expiration && !url.match(/agent\/(login|register)/)) {
    const sessionOk = expiration - new Date().valueOf() > 0;
    if (!sessionOk) {
      return Promise.resolve({ state: 4, message: '会话已过期，请重新登录！！！' });
    } else {
      options.headers = { Authorization: token };
    }
  }
  if (!url.startsWith('http') && !url.endsWith('.json') && !url.startsWith('/api')) {
    url = `${environment.hostAPI}${url}`;
  }

  const m = (options.method || '').toLocaleLowerCase();
  if (m === 'post' || m === 'put' || m === 'patch') {
    options.headers['Content-Type'] = 'application/json';
  }

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
