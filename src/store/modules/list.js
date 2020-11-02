const state = () => ({
  all: [],
});
const mutations = {
  PUSH(state, payload) {
    state.all.push(payload);
  },
  REMOVE(state, { id }) {
    state.all = state.all.filter((list) => list.id !== id);
  },
  CHANGE(state, { id, title }) {
    let list = state.all.find((list) => list.id === id);
    list.title = title;
  },
};
const actions = {
  pushList({ commit }) {
    commit("PUSH", { id: new Date().getTime(), title: "new List !" });
  },
  removeList({ commit }, listId) {
    commit("REMOVE", { id: listId });
  },
  titleChange({ commit }, list) {
    commit("CHANGE", { id: list.id, title: list.title });
  },
};
const getters = {
  buttonMessage: function(state) {
    return state.all.length ? "Add another list" : "Add a list";
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
