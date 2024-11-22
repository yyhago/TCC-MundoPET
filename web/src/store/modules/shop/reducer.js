import { produce } from "immer";
import types from "./types";

const INITIAL_STATE = {
    petshops: [],
    petshop: {},
    petshopMapSelected: null,
    mapCenter: {
        lat: -22.8722787, 
        lng: -47.2102212 
    },
    cart: [],
    transactionFee: 0.1,
    defaultRecipient: {
        recipient_id: 'sb-qucx433316704@personal.example.com',
        percentage: 10,
        liable: true, 
    },
    transaction: {
        amount: 0,
        card_number: '',
        card_cvv: '',
        card_expiration_date: '',
        card_holder_name: '',
        customer: {},
        billing:{
            name: 'MundoPet LTDA',
            address: {
                country: 'br',
                state: 'sp',
                city: 'Hortolândia',
                neighborhood: 'Campinas',
                street: 'Rua Matrix',
                street_number: '13185512',
                zipcode: '12',
            },
        },
        isProcessing: false,
        shipping: {},
        items: [],
        split_rules: []
    }
};

function shop(state = INITIAL_STATE, action) {
    switch(action.type) {
        case types.SET_CUSTOMER: {
            return produce(state, (draft) => {
                draft.transaction.customer = action.customer;
            });
        }

        case types.SET_PETSHOPS: {
            return produce(state, (draft) => {
                draft.petshops = action.petshops;
            });
        }

        case types.SET_PETSHOP_MAP_SELECTED: {
            return produce(state, (draft) => {
                draft.petshopMapSelected = action.petshop;
            });
        }

        case types.SET_MAP_CENTER: {
            return produce(state, (draft) => {
                draft.mapCenter = action.location;
            });
        }

        case types.SET_PETSHOP: {
            return produce(state, (draft) => {
                draft.petshop = action.petshop;
            });
        }

        case types.TOGGLE_CART_PRODUCT: {
            return produce(state, (draft) => {
                const index = draft.cart.findIndex((p) => p._id === action.product._id);
                if (index !== -1) {
                    draft.cart = draft.cart.filter((_, i) => i !== index);
                } else {
                    draft.cart.push(action.product);
                }
            });
        }

        case types.SET_TRANSACTION: {
            return produce(state, (draft) => {
                draft.transaction = { ...draft.transaction, ...action.transaction }
            });
        }

        case 'SET_PROCESSING':
        return {
            ...state,
            isProcessing: action.payload,
        };

        default:
            return state;
    }
}

export default shop;
