import types from "./types";


export const setCustomer = (customer) => {
    return { type: types.SET_CUSTOMER, customer };
};


export const requestPetshops = () => {
    return { type: types.REQUEST_PETSHOPS };
};


export const setPetshops = (petshops) => {
    return { type: types.SET_PETSHOPS, petshops };
};


export const setSelectedPetshop = (petshop) => { 
    return { type: types.SET_PETSHOP_MAP_SELECTED, petshop };
};


export const setMapCenter = (location) => {
    return { type: types.SET_MAP_CENTER, location };
};


export const requestPetshop = (id) => {
    return { type: types.REQUEST_PETSHOP, id };
};


export const setPetshop = (petshop) => {
    return { type: types.SET_PETSHOP, petshop };
};

export const toggleCartProduct = (product) => {
    return { type: types.TOGGLE_CART_PRODUCT, product }
}

export const setTransaction = (transaction) => {
    return { type: types.SET_TRANSACTION, transaction }
}

export const makePruchase = () => {
    return { type: types.MAKE_PURCHASE,  }
}