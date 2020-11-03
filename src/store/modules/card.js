const state = () => ({
  all: [],
  dragItem: {},
});
const getters = {
  listCardFilter: (state) => (id) =>
    state.all
      .filter((card) => card.list === id)
      .sort((a, b) => a.order - b.order),
  buttonMessage: (state) => (id) => {
    return state.all.filter((card) => card.list === id).length
      ? "Add another card"
      : "Add a card";
  },
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
    card.order = payload.order;
  },
  ORDER(state, payload) {
    state.all.filter((card) => card.list === payload.list);
  },
  DRAG(state, payload) {
    state.dragItem = payload;
  },
};

const actions = {
  pushCardToList({ state, commit }, listId) {
    commit("PUSH", {
      id: new Date().getTime(),
      message: "",
      list: listId,
      order: state.all.filter((card) => card.list === listId).length,
    });
  },
  removeCard({ commit }, card) {
    commit("REMOVE", { id: card.id });
  },
  changeCard({ commit }, card) {
    commit("CHANGE", {
      id: card.id,
      list: card.list,
      message: card.message,
      order: card.order,
    });
  },
  dragStartHandler({ commit }, card) {
    commit("DRAG", card);
  },
  dropHandler({ commit, state }, card) {
    commit("CHANGE", {
      id: state.dragItem.id,
      list: card.list,
      message: state.dragItem.message,
      order: card.order,
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
