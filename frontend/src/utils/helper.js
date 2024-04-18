const fetchJSON = async (url, method, body=null, token=null) => {
    let options = {
        method,
        headers:{
            'Content-Type': 'application/json'
        }
    }
    options.headers['Access-Control-Allow-Origin'] = '*';
    options.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
    options.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization';
    if (token){
        options.headers['Authorization'] =  `Bearer ${token}`;
    }

    if (body){
        options.body = body
    }

    console.log(options)
    const response = await fetch(url, options)

    return response
}

const fetchJSONMultiPart = async (url, method, body=null, token=null) => {
    let options = {
        method,
        headers:{
        }
    }
    if (token){
        options.headers['Authorization'] =  `Bearer ${token}`;
    }

    if (body){
        options.body = body
    }

    const response = await fetch(url,options)

    return response
}

export const fetchJSONGET = async (url, token=null) => fetchJSON (url,"GET",null, token)
export const fetchJSONPUT = async (url,body, token=null) => fetchJSON (url,"PUT",body,token)
export const fetchJSONPATCH = async (url,body, token=null) => fetchJSON (url,"PATCH",body,token)
export const fetchJSONDELETE = async (url,token=null) => fetchJSON (url,"DELETE",null,token)
export const fetchJSONPOST = async (url, body, token=null) => fetchJSON (url,"POST",body,token)
export const fetchJSONPOSTMultipart = async (url, body, token=null) => fetchJSONMultiPart(url,"POST",body,token)
export const fetchJSONPATCHMultipart = async (url, body, token=null) => fetchJSONMultiPart(url,"PATCH",body,token)

export const downloadFilesFromS3 = async ( URLS ) => {
    
}