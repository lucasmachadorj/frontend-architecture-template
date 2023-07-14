import { UserManagerSettings, WebStorageStateStore } from "oidc-client-ts";
import { authClientId, authClientSecret } from "./config";
import { authority } from "./config";

export const credentials: UserManagerSettings = {
  authority,
  client_id: authClientId,
  client_secret: authClientSecret,
  scope: "openid email profile offline_access",
  response_type: "code",
  response_mode: "query",
  includeIdTokenInSilentRenew: true,
  redirect_uri: `${location.origin}/signed-in`,

  metadataSeed: {
    end_session_endpoint: `${authority}/v2/logout?client_id=${authClientId}&returnTo=${location.origin}/signed-out`,
  },
  userStore: new WebStorageStateStore({ store: localStorage }),
};
