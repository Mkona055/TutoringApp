import useAuth from "../hooks/useAuth";
import { fetchJSONGET } from "./helper";

export const SERVER_BASE_URL="http://localhost:8080/api";


export async function fetchPostsWithParams(params, token){
    let res;
    if (params && params.length > 0){
        res = await fetchJSONGET(`${SERVER_BASE_URL}/posts?${params}`, token);

    }else{
        res = await fetch(`${SERVER_BASE_URL}/posts`);
    }
    if (res.ok){
        const data = await res.json();
        return data;
    }     
}
export async function fetchPostsFrom(userID, token){
    const res = await fetch(`${SERVER_BASE_URL}/posts`);
    if (res.ok){
        const data = await res.json();
        return data;
    }
}     

export async function fetchPostFromId(postID){
    const res = await fetch(`${SERVER_BASE_URL}/posts/${postID}`);
    if (res.ok){
        const data = await res.json();
        return data;
    }
}  


export async function fetchTags(){
    const res = await fetch(`${SERVER_BASE_URL}/tags`);
    if (res.ok){
        const data = await res.json();
        return data;
    }     
}
export async function getUserFromEmail(email){
    const res = await fetch(`${SERVER_BASE_URL}/users?email=${email}`);
    if (res.ok){
        const data = await res.json();
        return data[0];
    }     
}
export async function getUserDataFromId(id){
    const res = await fetch(`${SERVER_BASE_URL}/users?id=${id}`);
    if (res.ok){
        const data = await res.json();
        return data[0];
    }        
}