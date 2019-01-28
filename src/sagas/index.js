import { put, takeLatest, all } from 'redux-saga/effects/';
import ResourceService from '../services/api/resource';

function* getResource() {
  const response = yield ResourceService.getAll();
  console.log('response form axiso wareper : ', response);
  if (response.status === 200) {
    yield put({ type: 'RESOURCE_RECEIVED', resource: response.data.data });
  } else {
    yield put({ type: 'RESOURCE_RECEIVED_FAILED', resource: response.status });
  }
}

function* actionWatcher() {
  yield takeLatest('GET_RESOURCE', getResource);
}


export default function* rootSage() {
  yield all([
    actionWatcher(),
  ]);
}