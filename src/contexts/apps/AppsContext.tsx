import React, { useContext } from "react";
import { App } from "../../features/Apps/apps.type";
import { SettingsContext } from "../settings/SettingsContext";

interface AppsContextInterface {
  apps: App[];
}

export const AppsContext = React.createContext<AppsContextInterface>(
  {} as AppsContextInterface
);

export function AppsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [apps, setApps] = React.useState<App[]>([]);
  const { fyncOnlineEnabled, updateSettings } = useContext(SettingsContext);

  const enableFyncOnline = () => {
    console.log("enable fync online");
  };

  return (
    <AppsContext.Provider
      value={{
        apps,
      }}
    >
      {children}
    </AppsContext.Provider>
  );
}
