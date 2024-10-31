import types from "./types";

// Define o cliente
export const setCustomer = (customer) => {
    return { type: types.SET_CUSTOMER, customer };
};

// Ação para solicitar petshops
export const requestPetshops = () => {
    return { type: types.REQUEST_PETSHOPS };
};

// Define a lista de petshops
export const setPetshops = (petshops) => {
    return { type: types.SET_PETSHOPS, petshops };
};

// Define o petshop selecionado no mapa
export const setSelectedPetshop = (petshop) => { 
    return { type: types.SET_PETSHOP_MAP_SELECTED, petshop };
};

// Define o centro do mapa
export const setMapCenter = (location) => {
    return { type: types.SET_MAP_CENTER, location };
};

// Ação para solicitar a request do petshop no plural
export const requestPetshop = (id) => {
    return { type: types.REQUEST_PETSHOP, id };
};

// Ação para solicitar petshop com tudo no plural
export const setPetshop = (petshop) => {
    return { type: types.SET_PETSHOP, petshop };
};

export const toogleCartProduct = (product) => {
    return { type: types.TOGGLE_CART_PRODUCT, product }
}