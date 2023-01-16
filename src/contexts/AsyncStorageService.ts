import AsyncStorage from "@react-native-async-storage/async-storage";

const saveValueAS = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@" + key, jsonValue);
    // console.log("value saved", value);
  } catch (e) {
    // saving error
    console.log("error saving value", e);
  }
};

const getValueAS = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(`@${key}`);
    console.log(value, "value");

    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading Value
    console.log("error getting value", e);
    return null;
  }
};

export const clearAllStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
    console.log("error clearing storage", e);
  }

  console.log("Done.");
};

export const saveUserDataAS = async (userData: any) => {
  try {
    const jsonValue = JSON.stringify(userData);
    await AsyncStorage.setItem("@user", jsonValue);
    // console.log("value saved", value);
  } catch (e) {
    // saving error
    console.log("error saving value", e);
  }
};

export const getUserDataAS = async () => {
  try {
    const value = await AsyncStorage.getItem("@userData");
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading Value
    console.log("error getting value", e);
    return null;
  }
};

export const getFriendsDataAS = async () => {
  const friends = await getFriendsAS();
  const recentCalls = await getRecentCallsAS();

  if (!friends || !recentCalls) return null;
  if (friends === "[]" || recentCalls === "[]") return null;

  const friendsData = {
    friends: JSON.parse(friends),
    recentCalls: JSON.parse(recentCalls),
  };
  return friendsData;
};

export const getFriendsAS = async () => {
  try {
    const value = await AsyncStorage.getItem("@friends");
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading Value
    console.log("error getting value", e);
    return null;
  }
};

export const saveFriendsAS = async (friends: any) => {
  try {
    const jsonValue = JSON.stringify(friends);
    await AsyncStorage.setItem("@friends", jsonValue);
    // console.log("value saved", value);
  } catch (e) {
    // saving error
    console.log("error saving value", e);
  }
};

export const getRecentCallsAS = async () => {
  try {
    const value = await AsyncStorage.getItem("@recentCalls");
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading Value
    console.log("error getting value", e);
    return null;
  }
};

export const saveRecentCallsAS = async (recentCalls: any) => {
  try {
    const jsonValue = JSON.stringify(recentCalls);
    await AsyncStorage.setItem("@recentCalls", jsonValue);
    // console.log("value saved", value);
  } catch (e) {
    // saving error
    console.log("error saving value", e);
  }
};
