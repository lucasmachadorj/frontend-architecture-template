export type RouteId = "root" | "loginLink" | "homeLink" | "loadingSpinner";

export type RouteDef = {
  path: string;
  isSecure: boolean;
};

export type Route = {
  routeId: RouteId;
  routeDef: RouteDef;
  onEnter?: () => void;
  onLeave?: () => void;
};

export const getRoutes = (): Route[] => {
  return [
    {
      routeId: "root",
      routeDef: {
        path: "/",
        isSecure: false,
      },
    },
    {
      routeId: "loginLink",
      routeDef: {
        path: "/app/login",
        isSecure: false,
      },
    },
    {
      routeId: "homeLink",
      routeDef: {
        path: "/app/home",
        isSecure: true,
      },
    },
  ];
};