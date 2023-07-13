import { HomeComponent } from "./home/home.component";

export const renderedComponents = () => {
  return [
    {
      id: "homeLink",
      component: <HomeComponent key="homePage" />,
    },
    {
      id: "root",
      component: <HomeComponent key="homePage" />,
    },
  ];
};
