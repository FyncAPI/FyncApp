import AsyncStorage from "@react-native-async-storage/async-storage";
import { Contact, PhoneNumber } from "expo-contacts";
import { createContext, useEffect, useRef, useState } from "react";
interface SettingsContextInterface {
  carouselNumColumns: number;
  fyncOnlineEnabled: boolean;
  enableFyncOnline: () => void;
  disableFyncOnline: () => void;
  // setCarouselNumColumns: (num: number) => void;
  updateSettings: (settings: Partial<SettingsContextInterface>) => void;
}
export const SettingsContext = createContext({} as SettingsContextInterface);

export const SettingsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [carouselNumColumns, setCarouselNumColumns] = useState(4);
  const [fyncOnlineEnabled, setFyncOnlineEnabled] = useState(false);

  useEffect(() => {
    console.log(fyncOnlineEnabled, "fync online chgxx");
  }, [fyncOnlineEnabled]);

  useEffect(() => {
    getSettings().then((res) => {
      console.log(res, "res");
    });
  }, []);
  const getSettings = async () => {
    try {
      const settings = await AsyncStorage.getItem("settings");
      if (settings) {
        console.log(settings, "sett");
        const parsedSettings = JSON.parse(settings);
        setCarouselNumColumns(parsedSettings.carouselNumColumns);
        setFyncOnlineEnabled(parsedSettings.fyncOnlineEnabled);
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  const updateSettings = async (
    settings: Partial<SettingsContextInterface>
  ) => {
    // if (settings.carouselNumColumns) {
    //   setCarouselNumColumns(settings.carouselNumColumns);
    // }
    // if (settings.fyncOnlineEnabled) {
    //   setFyncOnlineEnabled(settings.fyncOnlineEnabled);
    // }
    try {
      await AsyncStorage.setItem(
        "settings",
        JSON.stringify({ carouselNumColumns, fyncOnlineEnabled, ...settings })
      );
      console.log(
        "helo",
        { carouselNumColumns, fyncOnlineEnabled, ...settings },
        "settings updated"
      );
      const res = getSettings();
      return res;
    } catch (e) {
      console.log(e, "error");
      return false;
    }
  };

  const enableFyncOnline = () => {
    console.log("enable fync online");
    const res = updateSettings({ fyncOnlineEnabled: true });
    console.log(res, "resx");
  };

  const disableFyncOnline = () => {
    console.log("disable fync online");
    const res = updateSettings({ fyncOnlineEnabled: false });
    console.log(res, "resx");
  };

  return (
    <SettingsContext.Provider
      value={{
        carouselNumColumns,
        fyncOnlineEnabled,
        updateSettings,
        enableFyncOnline,
        disableFyncOnline,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
