import { Outlet, useModel, useRouteData } from "umi";

const AuthMap = new Map([["/test", { redirectUrl: "/", authCode: ["TEST"] }]]);

export default () => {
  const { route } = useRouteData();
  const { auth } = useModel("@@initialState", (model) => ({
    auth: model?.initialState?.auth || [],
  }));

  const { authCode, redirect } = AuthMap.get(route.path || "") || {};

  const noAuth = !auth.find((item) => (authCode || []).includes(item.code));

  if (noAuth && redirect) return history.push(redirect);

  if (noAuth) return location.replace("/product");

  return <Outlet />;
};
