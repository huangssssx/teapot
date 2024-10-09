export function setStorage(key, value){
    uni.setStorageSync(key, value);
}

export function getStorage(key){
    return uni.getStorageSync(key);
}

export function setToken(token){
    setStorage("token", token);
}

export function getToken(){
    return getStorage("token");
}