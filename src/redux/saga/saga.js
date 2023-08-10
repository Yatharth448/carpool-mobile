import { put, takeEvery, all } from 'redux-saga/effects';
import { getProfileDataSuccess, getProfileDataFailure } from '../actions/actions';
import axios from 'axios';
import { hitApiToGetProfile } from '../../Screens/profile/ProfileModal';

function* fetchDataSaga() {
  try {
    const response = yield hitApiToGetProfile();
    yield put(getProfileDataSuccess(response.data));
  } catch (error) {
    yield put(getProfileDataFailure(error.message));
  }
}

function* watchFetchData() {
  yield takeEvery('GET_PROFILE_DATA_REQUEST', fetchDataSaga);
}

export default function* rootSaga() {
  yield all([watchFetchData()]);
}