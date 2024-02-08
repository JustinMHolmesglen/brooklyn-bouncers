import api from './api'

export async function post(data){
    
    return api.post('/feedback', 
        data
       
    )
}

export async function get(data){

    return api.get('/feedback',
        data
    )
}


const feedback = {
    get,
    post
    
}

export default feedback;