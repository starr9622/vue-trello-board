import Vue from "vue";
import App from "./App";
import store from "./store";

Vue.config.productionTip = false;
Vue.filter("message", (length, msg) => {
  return length ? `Add another ${msg}` : `Add a ${msg}`;
});
new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
