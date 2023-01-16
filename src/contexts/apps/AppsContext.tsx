import React, { useContext } from "react";
import { App } from "../../features/Apps/type";
import { SettingsContext } from "../settings/SettingsContext";
import { AppType } from "../../../types";

interface AppsContextInterface {
  myApps: App[];
  newApps: App[];
  featuredApps: App[];
  popularApps: App[];
  getAppData: (id: string, type: AppType) => App | undefined;
}

export const AppsContext = React.createContext<AppsContextInterface>(
  {} as AppsContextInterface
);

export function AppsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [myApps, setMyApps] = React.useState<App[]>([
    {
      name: "App 1",
      image: "https://picsum.photos/200",
      _id: "1",
      description: "asdfasdf",
      url: "https://google.com",
      userCount: 200,
    },
  ]);
  const [newApps, setNewApps] = React.useState<App[]>([]);
  const [featuredApps, setFeaturedApps] = React.useState<App[]>([]);
  const [popularApps, setPopularApps] = React.useState<App[]>([]);

  const { fyncOnlineEnabled, updateSettings } = useContext(SettingsContext);

  const enableFyncOnline = () => {
    console.log("enable fync online");
  };

  const getAppData = (id: string, type: AppType) => {
    console.log(id, type, "x");
    switch (type) {
      case "myApps":
        return myApps.find((app) => app._id === id);
      case "newApps":
        return newApps.find((app) => app._id === id);
      case "featuredApps":
        return featuredApps.find((app) => app._id === id);
      case "popularApps":
        return popularApps.find((app) => app._id === id);
      default:
        //TODO find in server
        return undefined;
    }
  };

  return (
    <AppsContext.Provider
      value={{
        myApps,
        newApps,
        featuredApps,
        popularApps,
        getAppData,
      }}
    >
      {children}
    </AppsContext.Provider>
  );
}
