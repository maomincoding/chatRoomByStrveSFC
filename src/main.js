import { compilerTemplate, createApp } from "@/@strve-sfc";
import App from "@/App.strve";
import { data } from "@/app.js";

createApp(compilerTemplate(App, data, "app")).mount("#app");
