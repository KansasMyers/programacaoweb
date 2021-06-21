import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import initDb from "./database/database";
import Chat from 'vue-beautiful-chat';

Vue.config.productionTip = false;

Vue.prototype.$app = {
  name: "Scientia Collab",
};

initDb();

Vue.use(Chat);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
  watch: {
    $route: {
        immediate: true,
        handler(to) {
            document.title = to.meta.title || '';
        }
    },
  }
}).$mount("#app");
