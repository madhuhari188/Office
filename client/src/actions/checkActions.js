import { CHECK_IN } from "../actions/types";


export const checkIn =(check) =>{
    localStorage.setItem("check",check)
    return{
        type: CHECK_IN,
        payload: check
    }
}