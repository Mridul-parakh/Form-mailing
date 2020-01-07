import axios from 'axios';
import {GET_ERROR,CLEAR_ERROR} from './types'



export const registeruser=(userData,history)=>dispatch=>{
    
    axios.post('/api/user/register',userData)
        .then(res => history.push('/thanks'))
        .catch(err => dispatch({
            type:GET_ERROR,
            payload:err.response.data
        }))
}

export const clearError=()=>{
    return{
        type:CLEAR_ERROR
    }
}