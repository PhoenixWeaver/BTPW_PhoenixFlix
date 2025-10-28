/*
===============================================================================
🐦 ::: PhoenixFlix - Multi-Purpose Movies & Christian Streaming Platform :::
🔥 with dual database architecture, WebAuthn authentication, and family-friendly streaming experience.
===============================================================================
Author: Ben Tran (https://github.com/PhoenixWeaver)
Email: thephoenixflix@gmail.com
Website: https://bit.ly/thephoenixflix
===============================================================================
*/

const Store = {
    
    jwt: null,
    
    get loggedIn() {
        return this.jwt !== null
    }
}

if (localStorage.getItem("jwt")) {
    Store.jwt = localStorage.getItem("jwt");
}

const proxiedStore = new Proxy(Store, {
    
    set: (target, prop, value) => {
        if (prop=="jwt") {
            target[prop] = value;
            if (value==null) {
                localStorage.removeItem("jwt");
            } else {
                localStorage.setItem("jwt", value);
            }
        }
        return true;
    }
});

export default proxiedStore
