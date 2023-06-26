const redux = require('redux');
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');
const createStore = redux.legacy_createStore;
const applyMiddleware = redux.applyMiddleware;


const initialState={
    loading:false,
    data:[],
    error:''
}

const FETCH_USER_REQUIESTED = 'FETCH_USER_REQUIESTED'
const FETCH_USER_SUCCEEDED = 'FETCH_USER_SUCCEEDED'
const FETCH_USER_FAILED = 'FETCH_USER_FAILED'

const fetchUserRequest = ()=>{
    return{
        type:FETCH_USER_REQUIESTED
    }
}

const fetchUserSuccess = (users)=>{
    return{
        type:FETCH_USER_SUCCEEDED,
        payload:users
    }
}

const fetchUserFailure = (error)=>{
    return{
        type:FETCH_USER_FAILED,
        payload:error
    }
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case FETCH_USER_REQUIESTED :
            return{
                ...state,
                loading:true
            }
        case FETCH_USER_SUCCEEDED :
            return {
                loading:false,
                users:action.payload,
                error:''
            }
        case FETCH_USER_FAILED :
             return {
                loading:false,
                users:[],
                error:action.payload
             }
        default :
        return state
    }
}

const fetchUsers = ()=>{
    return function (dispatch){
        dispatch(fetchUserRequest())
        axios.get('https://jsonplaceholder.typicode.com/users').then(res=>{
            //res.data is the users
            const users = res.data.map((user)=>user.id)
            dispatch(fetchUserSuccess(users))
        }).catch(err=>{
            //err.message is the error message 
            dispatch(fetchUserFailure(err.message))
        })
    }
}


const store = createStore(reducer,applyMiddleware(thunkMiddleware)) 
const unsubscribe = store.subscribe(()=>console.log(store.getState()))
store.dispatch(fetchUsers());


