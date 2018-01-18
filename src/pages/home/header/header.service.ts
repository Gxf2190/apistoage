import request from '../../../utils/request';
export async function viewApi(url) {
    return request(url.url, {
      method: 'VIEW',
    });
  }