import request from '../../../utils/request';
export async function viewApi(api) {
    return request(api.api, {
      method: 'VIEW',
    });
  }