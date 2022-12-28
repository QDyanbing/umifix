import { Request } from '@y9/components';

// 获取用户权限标识列表
export function getAuth(productCode: string) {
  return Request.post<any, API.IResult<API.IAuth[]>>(
    '/api/app/iam/permission/getUserPermission.json',
    {
      productCode,
    },
  );
}
