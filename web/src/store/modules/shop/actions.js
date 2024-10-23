import types from "./types";

const setCustomer = (customer) => {
    return { type: types.SET_CUSTOMER, customer };
};

export default setCustomer;
