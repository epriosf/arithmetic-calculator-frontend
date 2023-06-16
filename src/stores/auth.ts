import { defineStore } from 'pinia'
import {useApi, useApiPrivate} from '@/composables/useApi'

export interface User {
  id: string
  username: string
  user_balance: string
}

export interface State {
  user: User
  accessToken: string
}

export interface LoginData {
  username: string
  password: string
}

export const useAuthStore = defineStore('auth', {
  state: (): State => {
    return {
      user: {} as User,
      accessToken: '' as string
    }
  },
  getters: {
    userDetail: (state: State) => state.user,
    isAuthenticated: (state: State) => (state.user?.username ? true : false)
  },
  actions: {
    async attempt(){
      try {
        await this.refresh();
        await this.getUser();
      }
      catch (error){
        return
      }
      return
    },

    async login(payload: LoginData) {
      try {
        const { data } = await useApi().post(`/api/auth/login`, payload);
        this.accessToken = data?.access_token
        await this.getUser();
        return data;

      } catch (error: Error | any) {
        throw error.response.data
      }
    },
    async register() {

    },
    async getUser() {
      try {
        const { data } = await useApiPrivate().get(`/api/auth/user`);
        this.user = data;
        return data;
      } catch (error: Error | any) {
        throw error.response.data;
      }
    },
    async logout() {
      try {
        const { data } = await useApiPrivate().post(`/api/auth/logout`);
        this.accessToken = '';
        this.user= {} as User;
        return data;
      } catch (error: Error | any) {
        throw error.response.data;
      }
    },
    async refresh() {
      try {
        const { data } = await useApi().post(`/api/auth/refresh`);
        this.accessToken = data?.access_token;
        return data;
      } catch (error: Error | any) {
        throw error.response.data;
      }
    }
  }
})
