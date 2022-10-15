import { Api } from "./api.js";

export { UserApi, Credentials, SignCredentials, VerifyCredentials, UserData }

class UserApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/users${ slug ? `/${slug}` : ""}`;
    }

    static async login(credentials, controller) {
        return await Api.post(UserApi.getUrl('login'), true, credentials, controller);
    }

    static async signUp(credentials, controller){
        return await Api.post(UserApi.getUrl(), false, credentials, controller);
    }

    static async verify(credentials, controller){
        return await Api.post(UserApi.getUrl('verify_email'), false, credentials, controller);
    }
    
    static async resendVerify(email, controller){
        return await Api.post(UserApi.getUrl('resend_verification'), false, email, controller);
    }   

    static async logout(controller) {
        return await Api.post(UserApi.getUrl('logout'), true, controller);
    }

    static async get(controller) {
        return Api.get(UserApi.getUrl('current'), true, controller);
    }
    static async modifyUser(credentials, controller){
        return await Api.put(UserApi.getUrl('current'),true,credentials, controller)
    }
    static async deleteAccount(controller){
        return await Api.delete(UserApi.getUrl('current'),true, controller)
    }
}

class Credentials {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

class SignCredentials {
    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email=email;
    }
}

class VerifyCredentials {
    constructor(email, code) {
        this.email=email;
        this.code=code;
    }
}

class UserData {
    constructor(firstName, lastName, gender, avatarUrl) {
        if (firstName)
            this.firstName=firstName;
        if (lastName)
            this.lastName=lastName;
        if (gender)
            this.gender=gender;
        if (avatarUrl)
            this.avatarUrl=avatarUrl;
    }
}