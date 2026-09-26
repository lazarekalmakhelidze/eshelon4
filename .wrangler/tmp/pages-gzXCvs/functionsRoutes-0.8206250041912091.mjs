import { onRequestPost as __api_admin_check_js_onRequestPost } from "/home/claude/eshelon4/functions/api/admin/check.js"
import { onRequestPost as __api_admin_save_js_onRequestPost } from "/home/claude/eshelon4/functions/api/admin/save.js"
import { onRequestPost as __api_admin_upload_js_onRequestPost } from "/home/claude/eshelon4/functions/api/admin/upload.js"
import { onRequestGet as __api_content_js_onRequestGet } from "/home/claude/eshelon4/functions/api/content.js"
import { onRequestGet as __img__name__js_onRequestGet } from "/home/claude/eshelon4/functions/img/[name].js"

export const routes = [
    {
      routePath: "/api/admin/check",
      mountPath: "/api/admin",
      method: "POST",
      middlewares: [],
      modules: [__api_admin_check_js_onRequestPost],
    },
  {
      routePath: "/api/admin/save",
      mountPath: "/api/admin",
      method: "POST",
      middlewares: [],
      modules: [__api_admin_save_js_onRequestPost],
    },
  {
      routePath: "/api/admin/upload",
      mountPath: "/api/admin",
      method: "POST",
      middlewares: [],
      modules: [__api_admin_upload_js_onRequestPost],
    },
  {
      routePath: "/api/content",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_content_js_onRequestGet],
    },
  {
      routePath: "/img/:name",
      mountPath: "/img",
      method: "GET",
      middlewares: [],
      modules: [__img__name__js_onRequestGet],
    },
  ]