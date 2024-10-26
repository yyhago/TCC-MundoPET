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
