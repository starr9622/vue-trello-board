// import api from "../../api/localStorage";

const state = () => ({
  title: "To-Do App",
  color: "#3775a4",
});
const mutations = {
  setBgColor(state, payload) {
    state.color = payload;
  },
  setTitle(state, title) {
    state.title = title;
  },
};
const actions = {
  changeBackgroundColor({ commit }, color) {
    commit("setBgColor", color);
  },
  changeTitle({ commit }, title) {
    commit("setTitle", title);
  },
};
const getters = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
