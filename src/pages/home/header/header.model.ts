import { Action } from 'redux';
export interface DvaAction extends Action {
    payload: any;
}
import {viewApi } from './header.service'
const HeaderModel = {
    namespace: 'headers',
    state: {
        'title': {}
    },
    effects: {
        *getViews ({ payload }: DvaAction, { call, put, select })
        {
            const result = yield call(viewApi, payload);
            debugger
        }
    },
    reducers: {
        getview:(state: Views, { payload }: DvaAction) => {
            return { ...state, ...payload }
          },
    }
  }
  
  export default HeaderModel;
  
  export interface Views {
    title: object;
  }
  