import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'
import VuexPersist from "vuex-persist";
import {vuexfireMutations} from "vuexfire";

Vue.use(Vuex)

const vuexLocal = new VuexPersist({
  storage: window.localStorage,
});

export default new Vuex.Store
({
  state:
  {
  },
  mutations: 
  {
    ...vuexfireMutations
  },
  actions: 
  {
  },
  // Plugin, stores authentication data in local storage which is used in page reloads/changes to prevent repeated login entry.
  plugins: [vuexLocal.plugin],
  modules: 
  {
    user
  }
})
