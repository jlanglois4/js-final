import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userProfile: {},
    isAuthenticated: false
  },
  getters: {
  },
  mutations: {
    setUserProfile(state, val, authState) {
      state.isAuthenticated = !state.isAuthenticated
      state.userProfile = val
    }
  },
  actions: {
    // sign up new user
    async register({ dispatch }, form) {
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

      // create user profile
      await fb.usersCollection.doc(user.uid).set({
        name: form.name
      })

      // fetch user profile
      dispatch('fetchUserProfile', user)
    },

    // get user
    async fetchUserProfile({ commit }, user) {

      const userProfile = await fb.usersCollection.doc(user.uid).get()

      commit('setUserProfile', userProfile.data())

      router.push('/dashboard')
    },

    //sign in
    async login({dispatch}, form) {
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

      // fetch user prof

      dispatch('fetchUserProfile', user)
    },

    async logout({ commit }) {
      await fb.auth.signOut()
      commit('setUserProfile', {})
      router.push('/')
    }
  },
  modules: {
  }
})
