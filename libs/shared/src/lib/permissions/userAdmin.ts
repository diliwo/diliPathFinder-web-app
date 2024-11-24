import { JwtHelper } from "@cpas/authentication-ng-lib";
import { Roles } from "@frontend/api-interface";

export function isUserAppiAdmin() {
  const access_token = localStorage.getItem("cpas_access_token") || undefined;
  const currentUserDecodedToken = Roles.fromJS(new JwtHelper().decodeToken(access_token)).lists;

  if (currentUserDecodedToken?.find(r => r === "AppiAdmin"))
    return true;
  else
    return false;
}

