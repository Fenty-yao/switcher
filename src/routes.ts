import { createBrowserRouter, redirect } from "react-router-dom";
import ProductList from "./modules/product-list/product-list";
import Me from "./modules/me/me";
import Login from "./modules/login/login";
import ProductDetail from "./modules/product-detail/product-detail";
import CommunitySearch from "./modules/community-search/community-search";
import MessageList from "./modules/message/message";
import Register from "./modules/register/register";
import ResetPassword from "./modules/reset-password/reset-password";
import { login } from "./modules/login/login-api";
import { selectCommunity } from "./modules/community-search/community-search-api";

export default createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/login"),
  },
  {
    path: "/product-list",
    Component: ProductList,
  },
  {
    path: "/product-detail",
    Component: ProductDetail,
  },
  {
    path: "/me",
    Component: Me,
  },
  {
    path: "/login",
    Component: Login,
    action: async ({ request }) => {
      const formData = await request.formData();
      const username = formData.get("username");
      const password = formData.get("password");
      if (!username || !password) {
        return { failed: "请输入用户名和密码" };
      }
      // Perform login
      // If login fails, redirect to login page
      // If login succeeds, redirect to product list or community search
      const userInfo = await login(username.toString(), password.toString());
      if (userInfo) {
        if (userInfo.communitySelected) {
          return redirect("/product-list");
        } else {
          return redirect("/community-search");
        }
      }
      return { failed: "登录失败" };
    },
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/reset-password",
    Component: ResetPassword,
  },
  {
    path: "/community-search",
    Component: CommunitySearch,
    action: async ({ request }) => {
      const data = await request.formData();
      const name = data.get("name");
      if (!name) {
        return;
      }

      const isSuccess = await selectCommunity(name.toString(), "");
      if (isSuccess) {
        return redirect("/product-list");
      }
    },
  },
  {
    path: "/messages",
    Component: MessageList,
  },
]);
