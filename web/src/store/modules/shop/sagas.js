import { takeLatest, all, call, put } from 'redux-saga/effects';
import types from './types';
import api from '../../../services/api';
import { setPetshops, setPetshop } from './actions';

export function* requestPetshops() {
    try {
        const response = yield call(api.get, '/petshops');
        
        const petshops = response.data?.petshops || [];
        
        yield put(setPetshops(petshops));
    } catch (error) {
        console.error('Erro ao buscar petshops:', error);
    }
}

export function* requestPetshop({ id }) {
    try {
        const response = yield call(api.get, `/petshops/${id}`);
        
        
        const petshop = response.data?.petshop || {};
        
        yield put(setPetshop(petshop));
    } catch (error) {
        console.error('Erro ao buscar petshop:', error);
    }
}


export default all([
    takeLatest(types.REQUEST_PETSHOPS, requestPetshops),
    takeLatest(types.REQUEST_PETSHOP, requestPetshop)
]);
