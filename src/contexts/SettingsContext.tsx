import AsyncStorage from "@react-native-async-storage/async-storage";
import { Contact, PhoneNumber } from "expo-contacts";
import { createContext, useEffect, useRef, useState } from "react";
interface SettingsContextInterface {
  carouselNumColumns: number;
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

  useEffect(() => {
    const getSettings = async () => {
      const settings = await AsyncStorage.getItem("settings");
      if (settings) {
        const parsedSettings = JSON.parse(settings);
        setCarouselNumColumns(parsedSettings.carouselNumColumns);
      }
    };
    getSettings();
  }, []);

  const updateSettings = async (
    settings: Partial<SettingsContextInterface>
  ) => {
    if (settings.carouselNumColumns) {
      setCarouselNumColumns(settings.carouselNumColumns);
    }
    await AsyncStorage.setItem("settings", JSON.stringify(settings));
  };

  return (
    <SettingsContext.Provider
      value={{
        carouselNumColumns,
        updateSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
