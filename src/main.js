import { createApp, compilerTemplate } from "@/@strve-sfc";
import app from "@/template/app.strve";
import { data } from "@/template/app.js";

createApp(compilerTemplate(app, data, "app")).mount("#app");
