import { createApp } from "vue";
import App from "./App.vue";
import { createRouter } from "./router";
import { createAuth0 } from "@auth0/auth0-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLink, faUser, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import authConfig from "../auth_config.json";
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import "highlight.js/styles/github.css";
import vuetify from "./plugins/vuetify"; // 👈 Aquí importas Vuetify
import '@mdi/font/css/materialdesignicons.css';

hljs.registerLanguage("json", json);

const app = createApp(App);

library.add(faLink, faUser, faPowerOff);

app
  .use(vuetify)
  .use(hljsVuePlugin)
  .use(createRouter(app))
  .use(
    createAuth0({
      domain: authConfig.domain,
      clientId: authConfig.clientId,
      authorizationParams: {
        redirect_uri: window.location.origin,
        /* audience: authConfig.audience,  */
      },
      
    })
  )
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
