const state = () => ({
  all: [],
  dragItem: {},
});
const getters = {
  listCardFilter: (state) => (id) =>
    state.all
      .filter((card) => card.list === id)
      .sort((a, b) => a.order - b.order),
  getCard: (state) => (id) => state.all.find((card) => card.id === id),
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
  ORDER(state, { list }) {
    let cardIds = state.all
      .filter((c) => c.list === list)
      .sort((a, b) => a.order - b.order)
      .map((f) => f.id);
    cardIds.forEach((id, index) => {
      let card = state.all.find((c) => c.id === id);
      card.order = index;
    });
  },
  DRAG(state, payload) {
    state.dragItem = payload;
  },
};

const actions = {
  pushCardToList({ getters, commit }, listId) {
    commit("PUSH", {
      id: new Date().getTime(),
      message: "",
      list: listId,
      order: getters.listCardFilter(listId).length,
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
  dropHandler({ commit, getters, state }, card) {
    let existInList = getters
      .listCardFilter(card.list)
      .find((card) => card.id === state.dragItem.id);
    if (card.order === -1 && existInList) return;

    let moveItem = getters.getCard(state.dragItem.id);
    let listIds = getters.listCardFilter(card.list).map((f) => f.id);
    if (moveItem.list !== card.list) {
      moveItem.list = card.list;
      moveItem.order = listIds.length - 1;
    }
    listIds.forEach((id) => {
      let orderItem = getters.getCard(id);
      let order =
        moveItem.order > card.order && orderItem.order >= card.order
          ? orderItem.order + 1
          : orderItem.order <= card.order
          ? orderItem.order - 1
          : orderItem.order;
      commit("CHANGE", {
        ...orderItem,
        order: order,
      });
    });
    moveItem.order = card.order;
    commit("CHANGE", {
      ...moveItem,
    });

    commit("ORDER", { list: card.list });
    commit("ORDER", { list: state.dragItem.list });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
