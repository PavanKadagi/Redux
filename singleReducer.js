const redux = require("redux");
const createStore = redux.legacy_createStore;
const bindActionCreators =  redux.bindActionCreators; 

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOKED = "CAKE_RESTOKED";
const ICECREAM_OREDERD = 'ICECREAM_OREDERD'
const ICECREAM_RESTOKED = 'ICECREAM_RESTOKED'

const orderCake = (qty=1)=>{
    return {
        type:CAKE_ORDERED,
        payload:qty
    }
}

const restokeCake =(qty=1)=>{
    return {
        type:CAKE_RESTOKED,
        payload:qty
    }
} 

const orderIceCream = (qty=1)=>{
    return{
        type:ICECREAM_OREDERD,
        payload:qty
    }
}

const restokeIcecream = (qty=1)=>{
    return {
        type:ICECREAM_RESTOKED,
        payload:qty
    }
}

// const reducer = (previousState,action)=>newState

const initialState = {
    numOfCake:10,
    numOfIceCream:20
}



const reducer = (state=initialState,action)=>{
    switch(action.type){
       case CAKE_ORDERED :
        return {
            ...state,
            numOfCake:state.numOfCake - action.payload
        }
        case CAKE_RESTOKED :
            return{
                ...state,
                numOfCake:state.numOfCake + action.payload
            }
        case ICECREAM_OREDERD:
            return{
                ...state,
                numOfIceCream:state.numOfIceCream - action.payload
            }
        case ICECREAM_RESTOKED:
            return{
                ...state,
                numOfIceCream : state.numOfIceCream + action.payload
            }
        default :
        return state
    }
}


const store = createStore(reducer);
console.log("initial state",store.getState())

const unsubscribe = store.subscribe(()=>console.log("update state",store.getState()))

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restokeCake(3))

const actions = bindActionCreators({orderCake,restokeCake,orderIceCream,restokeIcecream},store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restokeCake(3)
actions.orderIceCream();
actions.orderIceCream();
actions.restokeIcecream(2);



unsubscribe();
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
