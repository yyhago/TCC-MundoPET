import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import { setPetshops, setPetshop } from './actions';
import types from './types';
import api from '../../../services/api';
import Swal from 'sweetalert2'


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

// Modificação no saga makePurchase
export function* makePurchase() {
    try {
      const { transaction } = yield select(state => state.shop);
      
      // Validar se há items no carrinho
      if (!transaction.items || transaction.items.length === 0) {
        throw new Error('Carrinho vazio');
      }
  
      // Validar se há regras de split
      if (!transaction.split_rules || transaction.split_rules.length === 0) {
        throw new Error('Regras de divisão não definidas');
      }
  
      const response = yield call(api.post, '/purchase', transaction);
      const res = response.data;
  
      if (res.error) {
        yield call(Swal.fire, {
          icon: 'error',
          title: 'Oops...',
          text: res.message
        });
        return false;
      }
  
      yield call(Swal.fire, {
        icon: 'success',
        title: 'Tudo ok!',
        text: 'Compra realizada com sucesso!'
      });
  
      return true;
    } catch (error) {
      yield call(Swal.fire, {
        icon: 'error',
        title: 'Erro na compra',
        text: error.message || 'Ocorreu um erro ao processar sua compra'
      });
      return false;
    }
  }


export default all([
    takeLatest(types.REQUEST_PETSHOPS, requestPetshops),
    takeLatest(types.REQUEST_PETSHOP, requestPetshop),
    takeLatest(types.MAKE_PURCHASE, makePurchase)
]);
