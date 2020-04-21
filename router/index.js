const Router = require('koa-router');
const routerData = require('./data');

const router = new Router();
Object.entries(routerData).map(([key, value]) => {
  const controller = require(`controllers/${value.module}`);
  const subRouter = new Router();

  Object.entries(value.paths).map(([path, data]) => {
    // TODO: Add acl support
    const [ method, controllerMethod ] = data;
    subRouter[method](path, controller[controllerMethod]);
  });

  router.use(key, subRouter.routes(), subRouter.allowedMethods());
});

module.exports = router;