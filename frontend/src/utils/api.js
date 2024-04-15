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
    return fetch(`${SERVER_BASE_URL}/users?id=${id}`)
            .then((res) => {return res.json()[0]});      
}