# 企业合规

## 依赖安装

先绑定[内源镜像](https://yong9ai.yuque.com/rkgaz6/uw4gzu/pu6xd7). yarn 方式

Install `node_modules`:

```bash
yarn
```

## 项目启动

```bash
有mock方式启动 npm start
无mock方式启动 npm run dev
```

## 本地联调

```
本地联调建议用npm run dev启动，否则会走一些前端的代理，联调哪个接口需要把哪个接口注释掉；当然如果你熟练掌握前端mock最好是使用npm start启动；
```

```
需要绑定域名 cookie 会种在这个域下 .yong9ai.work 所以暂时需要绑定这个域名
```

```
127.0.0.1 localhost.yong9ai.work
```

```
项目启动后访问 localhost.yong9ai.work:8000 需要先到线上登录 http://app.yong9ai.work/
```

```
修改配置文件，按照如下规则修改几个完成访问 /config/proxy.ts
```

```JSON
{
  "local": {
    "/api/": {
      "target": "http://app.yong9ai.work/",
      "changeOrigin": true
    }
  }
}

```
