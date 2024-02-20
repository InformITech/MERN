import { createStore, combineReducers } from 'redux';

const initialState = {
    userDetails: {
        name: '',
        email: '',
        image: '',
        _id: '',
        username: '',
        gender: ''
    },
    error: null,
    adminDetails: {
        name: '',
        email: '',
        user: false
    },
    adminError: null
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_DETAILS':
            return {
                ...state,
                userDetails: action.payload,
                error: null,
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
                userDetails: {}
            };
        case 'SET_ADMIN_STATE':
            return {
                ...state,
                adminDetails: action.payload,
                adminError: null
            }
        case 'SET_ADMIN_ERROR':
            return {
                ...state,
                adminDetails: {},
                adminError: action.payload
            }
        case 'SET_PROFILE':
            console.log(action.payload);
            return {
                userDetails: {
                    ...state.userDetails,
                    name: action.payload.name,
                    username: action.payload.username,
                    gender: action.payload.gender
                }
            };

        default:
            return state;
    }
};

export const setUserDetails = (userDetails) => ({
    type: 'SET_USER_DETAILS',
    payload: userDetails,
});

export const setError = (error) => ({
    type: 'SET_ERROR',
    payload: error,
});


export const setAdminState = (details) => ({
    type: 'SET_ADMIN_STATE',
    payload: details
})

export const setAdminError = (error) => ({
    type: 'SET_ADMIN_ERROR',
    payload: error
})

export const setProfile = (data) => ({
    type: 'SET_PROFILE',
    payload: data
})

const rootReducer = combineReducers({
    reducer,
});

const store = createStore(rootReducer);

export default store;
