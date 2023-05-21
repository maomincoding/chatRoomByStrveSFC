import { compilerTemplate, createApp } from "@/@strve-sfc/index.js";
import App from "@/App.strve";
import { data } from "@/app.js";

createApp(compilerTemplate(App, data, "app")).mount("#app");
