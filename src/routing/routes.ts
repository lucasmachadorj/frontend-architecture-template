export type RouteId = "loginLink" | "homeLink" | "loadingSpinner";

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
