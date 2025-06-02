import {call, put, takeLatest} from 'redux-saga/effects';
import {database} from '../database';
import {mockFileData} from '../utils/mockFile';
import Item from '../model/Item';
import {
  LOAD_FILE_FAILURE,
  LOAD_FILE_REQUEST,
  LOAD_FILE_SUCCESS,
} from './actions';

function* loadFileSaga() {
  try {
    const itemCollection = database.get<Item>('items');
    yield call([database, database.write], async () => {
      for (let item of mockFileData) {
        await itemCollection.create(record => {
          record.name = item.name;
          record.value = item.value;
        });
      }
    });
    yield put({type: LOAD_FILE_SUCCESS});
  } catch (e) {
    console.error('Load File Error:', e);
    yield put({type: LOAD_FILE_FAILURE, error: e});
  }
}

export function* rootSaga() {
  yield takeLatest(LOAD_FILE_REQUEST, loadFileSaga);
}
