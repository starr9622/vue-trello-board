import Vue from "vue";
import Vuex from "vuex";
import { setting, card, list } from "./modules";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    setting,
    card,
    list,
  },
});
