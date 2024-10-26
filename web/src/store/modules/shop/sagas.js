import { takeLatest, all, call, put } from 'redux-saga/effects';
import types from './types';
import api from '../../../services/api';
import { setPetshops } from './actions';

export function* requestPetshops() {
    try {
        const response = yield call(api.get, '/petshops');
        
        const petshops = response.data?.petshops || [];
        
        yield put(setPetshops(petshops));
    } catch (error) {
        console.error('Erro ao buscar petshops:', error);
    }
}

export default all([takeLatest(types.REQUEST_PETSHOPS, requestPetshops)]);
