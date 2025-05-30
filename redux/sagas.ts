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
    yield call(() =>
      database.action(async () => {
        console.log('inside database.action');
        for (let item of mockFileData) {
          console.log('Creating', item);
          await itemCollection.create(record => {
            record.name = item.name;
            record.value = item.value;
          });
        }
      }),
    );

    yield put({type: LOAD_FILE_SUCCESS});
  } catch (error) {
    yield put({type: LOAD_FILE_FAILURE});
  }
}

export function* rootSaga() {
  yield takeLatest(LOAD_FILE_REQUEST, loadFileSaga);
}
