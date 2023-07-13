export type RouteConfig = {
  [path: string]: {
    as: string;
    uses: () => void;
  };
};

export type QueryParams = { [key: string]: string | number | boolean };
export type PathParams = { [key: string]: string | number };
