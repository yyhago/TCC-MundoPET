import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import { setPetshops, setPetshop } from './actions';
import types from './types';
import api from '../../../services/api';
import Swal from 'sweetalert2';

// Função para buscar petshops
export function* requestPetshops() {
  try {
    const response = yield call(api.get, '/petshops');
    const petshops = response.data?.petshops || [];
    yield put(setPetshops(petshops));
  } catch (error) {
    console.error('Erro ao buscar petshops:', error);
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: 'Falha ao buscar petshops. Tente novamente.'
    });
  }
}

// Função para buscar um petshop específico
export function* requestPetshop({ id }) {
  try {
    const response = yield call(api.get, `/petshops/${id}`);
    const petshop = response.data?.petshop || {};
    yield put(setPetshop(petshop));
  } catch (error) {
    console.error('Erro ao buscar petshop:', error);
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: 'Falha ao buscar o petshop. Tente novamente.'
    });
  }
}

// Função para realizar uma compra
export function* makePurchase() {
  try {

    yield put({ type: 'SET_PROCESSING', payload: true });

    const { transaction } = yield select(state => state.shop);
    console.log('Transação:', transaction); // Log para depuração
    
    // Validações antes da requisição
    if (!transaction.items || transaction.items.length === 0) {
      throw new Error('O carrinho está vazio.');
    }
    
    if (!transaction.split_rules || transaction.split_rules.length === 0) {
      throw new Error('Regras de divisão não definidas.');
    }

    Swal.fire({
      title: 'Processando pagamento...',
      text: 'Aguarde enquanto processamos sua compra.',
      allowOutsideClick: false, 
      didOpen: () => {
        Swal.showLoading(); 
      },
      willClose: () => {
        Swal.hideLoading();
      }
    });
    
    // Chamada da API para processar a compra
    const response = yield call(api.post, '/purchase', transaction);
    const res = response.data;
    
    // Verifica o resultado da transação
    if (res.error || res.data.batch_status !== 'PENDING') {
      Swal.fire({
        icon: 'error',
        title: 'Erro no pagamento',
        text: res.message || 'Ocorreu um erro no processamento do pagamento.'
      });
      return;
    }
    
    // Exibe mensagem de sucesso
    Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: 'Sua compra foi realizada com sucesso!'
      }).then(() => {
        setTimeout(() => {
          
          window.location.assign('/');
        }, 1000);
      });
  } catch (error) {
    console.error('Erro na compra:', error);
    Swal.fire({
      icon: 'error',
      title: 'Erro na compra',
      text: error.message || 'Ocorreu um erro ao processar sua compra.'
    });
  } finally {
     yield put({ type: 'SET_PROCESSING', payload: false });
    }
}

// Exportação das sagas
export default all([
  takeLatest(types.REQUEST_PETSHOPS, requestPetshops),
  takeLatest(types.REQUEST_PETSHOP, requestPetshop),
  takeLatest(types.MAKE_PURCHASE, makePurchase)
]);