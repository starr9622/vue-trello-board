import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list: [],
    card: [],
    setting: {
      title: "To-Do App",
      color: "#3775a4",
    },
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
    setBgColor(state, color) {
      state.setting.color = color;
    },
    setTitle(state, title) {
      state.setting.title = title;
    },
  },
  actions: {},
  modules: {},
});
