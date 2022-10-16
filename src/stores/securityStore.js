import { defineStore } from "pinia";
import { UserApi } from "@/api/user";
import { Api } from "@/api/api";

const SECURITY_TOKEN_KEY = "security-token";

export const useSecurityStore = defineStore("security", {
  state: () => ({
    token: null,
    user: null,
  }),
  getters: {
    isLoggedIn() {
      return this.token != null;
    },
    getUser() {
      return this.user;
    },
  },
  actions: {
    initialize() {
      let token = localStorage.getItem(SECURITY_TOKEN_KEY);
      if (token) {
        this.setToken(token);
        return;
      }
      token = sessionStorage.getItem(SECURITY_TOKEN_KEY);
      if (token) {
        this.setToken(token);
        return;
      }
    },
    setUser(user) {
      this.user = user;
    },
    setToken(token) {
      this.token = token;
      Api.token = token;
    },
    updateToken(token, rememberMe) {
      if (rememberMe) localStorage.setItem(SECURITY_TOKEN_KEY, token);
      else {
        sessionStorage.setItem(SECURITY_TOKEN_KEY, token);
      }
      this.setToken(token);
    },
    removeToken() {
      localStorage.removeItem(SECURITY_TOKEN_KEY);
      this.setToken(null);
    },
    async login(credentials, rememberMe) {
      const result = await UserApi.login(credentials);
      const user = await this.getCurrentUser();
      this.updateToken(result.token, rememberMe);
      this.setUser(user);
    },
    async signUp(credentials) {
      await UserApi.signUp(credentials);
    },
    async verify(credentials) {
      return await UserApi.verify(credentials);
    },
    async resendVerify(email) {
      return await UserApi.resendVerify(email);
    },
    async logout() {
      await UserApi.logout();
      this.removeToken();
      this.setUser(null);
    },
    async getCurrentUser() {
      const result = await UserApi.get();
      this.setUser(result);
      return result;
    },
    async modifyUser(data) {
      const result = await UserApi.modifyUser(data);
      this.setUser(result);
    },
    async deleteAccount() {
      await UserApi.deleteAccount();
    },
    async getCurrentUserRoutines() {
      return await UserApi.getCurrentUserRoutines();
    },
  },
});
