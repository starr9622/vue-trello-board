const state = () => ({
  all: [],
});
const getters = {
  listCardFilter: (state) => (id) =>
    state.all
      .filter((card) => card.list === id)
      .sort((a, b) => a.order - b.order),
};

const mutations = {
  PUSH(state, payload) {
    state.all.push(payload);
  },
  REMOVE(state, payload) {
    state.all = state.all.filter((card) => card.id !== payload.id);
  },
  CHANGE(state, payload) {
    let card = state.all.find((card) => card.id === payload.id);
    card.list = payload.list;
    card.message = payload.message;
  },
};

const actions = {
  pushCardToList({ state, commit }, listId) {
    commit({
      id: new Date().getTime(),
      message: "",
      list: listId,
      order: state.getter.listCardFilter(listId).length,
    });
  },
  // removeCard({ state, commit }, card) {},
  // changeCard({ state, commit }, card) {},
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
