import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect, useRef } from "react";

export const useReadProfile = () => {
  let data = null;
  let loading = true;

  const getData = async () => {
    loading = true;
    try {
      const jsonValue = await AsyncStorage.getItem("profile");
      data = jsonValue === null ? null : JSON.parse(jsonValue);
    } catch (error) {
      console.log(error);
    } finally {
      loading = false;
      return [data, loading];
    }
  };
  return getData;
};

export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}
