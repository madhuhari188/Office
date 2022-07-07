import {CHECK_IN} from '../actions/types'

const initialState = {
    isDisabled:false,
    checkIn:'',
}

export default function(state=initialState,action){
    switch(action.type){
        case CHECK_IN:
            return{
                ...state,
                isDisabled: true,
                checkIn:action.payload
            }
        default:
            return state    
    }
}
