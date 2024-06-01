import { makeAutoObservable } from "mobx";

export default class UserStorege {
    constructor() {
        this._user = false;
        this._isAdmin = false;
        this._email = "";
        makeAutoObservable(this);
    }

    setEmail(email) {
        this._email = email;
    }
    setIsAdmin(bool) {
        this._isAdmin = bool;
    }
    setUser(user) {
        this._user = user;
    }

    get email() { return this._email; }
    get isAdmin() {
        return this._isAdmin
    }
    get user() {
        return this._user
    }


}