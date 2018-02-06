import { Action } from 'redux';
export interface DvaAction extends Action {
    payload: any;
}
import {viewApi } from './header.service';
import { EffectsCommandMap } from 'dva';
const HeaderModel = {
    namespace: 'headers',
    state: {
        'title': {}
    },
    effects: {
        *getViews ({ payload }: DvaAction, { call, put, select }:EffectsCommandMap)
        {
            const result = yield call(viewApi, payload);
            console.log(result);
        }
    },
    reducers: {
       
    }
  }
  
  export default HeaderModel;
  
  export interface Views {
    title: object;
  }
  