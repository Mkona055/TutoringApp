import { fetchJSONDELETE, fetchJSONGET, fetchJSONPOST, fetchJSONPUT } from "./helper";

export const SERVER_BASE_URL="http://localhost:8080";


export async function fetchPostsWithParams(params, token, role){
    let url = `${SERVER_BASE_URL}/feed`;
    if (role === "TUTOR"){
        url += '/requests/filtered'
    }else if (role ==="STUDENT"){
        url += '/offers/filtered'
    }else{
        url += '/filtered'
    }
    let res;
    if (params && params.length > 0){
        res = await fetchJSONGET(`${url + params}`, token);

    }else{
        res = await fetchJSONGET(`${url}`, token);
    }
    if (res.ok){
        const data = await res.json();
        return data;
    }     
}
export async function fetchPostsFromUser(userID, token){
    const res = await fetchJSONGET(`${SERVER_BASE_URL}/feed/user/${userID}/posts`, token);
    if (res.ok){
        const data = await res.json();
        return data;
    }
}     

export async function fetchPostById(postID, token){
    const res = await fetchJSONGET(`${SERVER_BASE_URL}/feed/post/${postID}`, token);
    if (res.ok){
        const data = await res.json();
        return data;
    }
}  


export async function fetchTags(token){
    const res = await fetchJSONGET(`${SERVER_BASE_URL}/feed/tags`, token);
    if (res.ok){
        const data = await res.json();
        return data;
    }     
}

export async function getUserDataFromId(id, token){
    if(!id){return null;}
    const res = await fetchJSONGET(`${SERVER_BASE_URL}/users/user/${id}`, token);
    if (res.ok){
        const data = await res.json();
        console.log(data);
        return data;
    }        
}

export async function loginUser(body){
    body = JSON.stringify(body);

    const res = await fetchJSONPOST(`${SERVER_BASE_URL}/api/authenticate`, body);
    if (res.ok){
        const data = await res.json();
        return data;
    }
}

export async function registerUser(body){
    body = JSON.stringify(body);
    const res = await fetchJSONPOST(`${SERVER_BASE_URL}/api/register`, body);
    if (res.ok){
        const data = await res.json();
        return data;
    }
}
export async function deleteUserById(userId, token) {
    const res = await fetchJSONDELETE(`${SERVER_BASE_URL}/users/user/${userId}`, token);
    if (res.ok){
        return true;
    }else{
        return false;
    }
}

export async function deletePostById(postId, token) {
    const res = await fetchJSONDELETE(`${SERVER_BASE_URL}/feed/post/${postId}/delete`, token);
    if (res.status !== 404){
        return true;
    }else{
        return false;
    }
}

export async function updatePostById(id, body, token) {
    body = JSON.stringify(body);
    const res = await fetchJSONPUT(`${SERVER_BASE_URL}/feed/post/${id}/update`, body, token);
    if (res.ok){
        const data = await res.json();        
        return data;
    }
}

export async function createPost(body, token) {
    body = JSON.stringify(body);
    const res = await fetchJSONPOST(`${SERVER_BASE_URL}/feed/newpost`, body, token);
    if (res.ok){
        const data = await res.json();        
        return data;
    }
}