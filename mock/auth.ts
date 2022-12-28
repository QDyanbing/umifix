import { Request, Response } from 'express';

export default {
  'POST /api/app/iam/permission/getUserPermission.json': (
    req: Request,
    res: Response,
  ) => {
    setTimeout(() => {
      res.send({
        success: true,
        data: [{ code: 'TEST' }],
      });
    }, 0);
  },
};
