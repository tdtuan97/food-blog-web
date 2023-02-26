const initialState = {
    meta: {
        data   : {},
        loading: false,
    },
    list: {
        data   : [],
        loading: false,
    },

    create: {
        errors : {},
        data   : {},
        loading: false,
    },

    detail: {
        errors : {},
        data   : {},
        loading: false,
    },

    update: {
        errors : {},
        data   : {},
        loading: false,
    },

    delete: {
        data   : {},
        errors : {},
        loading: false,
    },
};

export default initialState;
