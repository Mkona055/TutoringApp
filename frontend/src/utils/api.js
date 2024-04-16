export const SERVER_BASE_URL="http://localhost:4000";   


export async function fetchPostsWithParams(params){
    let res;
    if (params && params.length > 0){
        res = await fetch(`${SERVER_BASE_URL}/posts?${params}`);

    }else{
        res = await fetch(`${SERVER_BASE_URL}/posts`);
    }
    if (res.ok){
        const data = await res.json();
        return data;
    }     
}
export async function fetchPostsFrom(userID){
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