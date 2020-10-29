import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list: [],
  },
  getters: {
    getList: function(state) {
      return state.list;
    },
  },
  mutations: {
    pushLists: function(state, payload) {
      state.list.push(payload.value);
    },
    popLists: function(state, payload) {
      state.list.splice(payload.value, 1);
    },
  },
  actions: {},
  modules: {},
});
