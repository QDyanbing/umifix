const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');

fs.writeFileSync(
  path.resolve(__dirname, '../deploy/prod/Dockerfile'),
  `# FROM nginx:1.21.5
FROM yong9ai-default-registry.cn-hangzhou.cr.aliyuncs.com/public/public_images:nginx-1.21.5
RUN rm -rf /usr/share/nginx/html/
RUN rm -f /etc/nginx/nginx.conf
RUN rm -rf /etc/nginx/conf.d/default.conf
ADD http://yong9ai-front-prod.oss-cn-shanghai.aliyuncs.com/${pkg.name}/${pkg.version}/index.html /usr/share/nginx/html/
RUN chmod -R 777 /usr/share/nginx/*
COPY ./nginx.conf /etc/nginx/nginx.conf`,
);
