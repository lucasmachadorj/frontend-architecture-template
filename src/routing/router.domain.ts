export type State<T = any> = {
  data: T;
  title: string;
};

export type RouteConfig = {
  [key: string]: {
    as: string;
    uses: (state: any, queryString: string) => void;
  };
};

export type QueryParams = { [key: string]: string | number | boolean };
export type PathParams = { [key: string]: string | number };
