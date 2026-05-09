import {
  View,
  Image,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";
import { debounce } from "lodash";
import * as Progress from "react-native-progress";

import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
} from "react-native-heroicons/outline";
import { fetchLocation, fetchWeatherForecast } from "../api/weather";
import { weatherImages } from "../constants";
import { getData, storeData } from "../utils/asyncStorage";

const { width, height } = Dimensions.get("screen");

export default function HomeScreen() {
  const [showSearch, toggleSearch] = useState(false);
  const [location, setLocation] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLocation = (loc) => {
    setLocation([]);
    toggleSearch(false);
    setLoading(true);
    fetchWeatherForecast({
      cityName: loc.name,
      days: "7",
    }).then((data) => {
      setWeather(data);
      setLoading(false);
      storeData("city", loc.name);
    });
  };

  const handleSearch = (value) => {
    if (value.length > 2) {
      fetchLocation({ cityName: value }).then((data) => {
        setLocation(data);
      });
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    setLoading(true);
    let mycity = await getData("city");
    let cityName = "New Delhi";
    if (mycity) {
      cityName = mycity;
    }
    fetchWeatherForecast({
      cityName,
      days: "7",
    }).then((data) => {
      setWeather(data);
    });
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 100), []);
  const { current, location: Location } = weather;
  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />

      {/* Background Image */}
      <Image
        blurRadius={70}
        source={require("../assets/images/bg.png")}
        resizeMode="cover"
        className="absolute"
        style={{
          width: width,
          height: height,
        }}
      />
      {loading ? (
        <View className="flex-1 flex-row justify-center items-center">
          <Progress.Circle
            thickness={8}
            size={50}
            color="#0bb3b2"
            indeterminate={true}
          />
        </View>
      ) : (
        <SafeAreaView className="flex-1">
          {/* Search Wrapper */}
          <View className="mx-4 mt-4 z-50">
            {/* Search Box */}
            <View
              className="flex-row items-center justify-end rounded-full px-2"
              style={{
                height: 52,
                overflow: "hidden",
                backgroundColor: showSearch
                  ? theme.bgWhite(0.2)
                  : "transparent",
              }}
            >
              {showSearch && (
                <TextInput
                  onChangeText={handleTextDebounce}
                  placeholder="Search City"
                  placeholderTextColor="lightgray"
                  className="flex-1 pl-5 h-full text-base text-white c"
                />
              )}

              <TouchableOpacity
                onPress={() => toggleSearch(!showSearch)}
                className="rounded-full p-3 m-1"
                style={{
                  backgroundColor: theme.bgWhite(0.3),
                }}
              >
                <MagnifyingGlassIcon size={25} color="white" />
              </TouchableOpacity>
            </View>

            {/* Dropdown */}
            {location.length > 0 && showSearch ? (
              <View className="absolute top-16 w-full bg-gray-300 rounded-3xl overflow-hidden">
                {location.map((loc, index) => {
                  const showBorder = index + 1 !== location.length;

                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        toggleSearch(false);
                        handleLocation(loc);
                      }}
                      className={`flex-row items-center py-3 px-4 ${
                        showBorder ? "border-b border-b-gray-400" : ""
                      }`}
                    >
                      <MapPinIcon size={20} color="gray" />

                      <Text className="text-black text-lg ml-2">
                        {loc?.name}, {loc?.country}.
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </View>
          {/* forecasting section */}
          <View className="mx-4 flex justify-around flex-1 mb-2">
            <Text className="text-white text-center text-2xl font-bold">
              {Location?.name},
              <Text className="text-lg font-semibold text-gray-300">
                {" " + Location?.country}
              </Text>
            </Text>
            <View className="flex-row justify-center">
              <Image
                source={
                  weatherImages[current?.condition?.text] ||
                  weatherImages["other"]
                }
                className="w-52 h-52"
              />
            </View>
            <View className="items-center">
              <Text className="text-center font-bold text-white text-6xl">
                {current?.temp_c}
                {"\u00B0"}
              </Text>
              <Text className="text-center font-bold text-white text-2xl mt-5">
                {current?.condition?.text}
              </Text>
            </View>

            {/* stats of weather */}
            <View className="flex-row justify-center mx-4 gap-x-10">
              <View className="flex-row items-center gap-2">
                <Image
                  source={require("../assets/icons/wind.png")}
                  className="w-6 h-6"
                />
                <Text className="text-white font-semibold text-base ">
                  {current?.wind_kph}km
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Image
                  source={require("../assets/icons/drop.png")}
                  className="w-6 h-6"
                />
                <Text className="text-white font-semibold text-base ">
                  {current?.humidity}%
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Image
                  source={require("../assets/icons/sun.png")}
                  className="w-6 h-6"
                />
                <Text className="text-white font-semibold text-base ">
                  {weather?.forecast?.forecastday?.[0]?.astro?.sunrise}
                </Text>
              </View>
            </View>

            {/* next days forecastings programm */}
            <View className="mb-2 gap-y-3">
              <View className="flex-row items-center gap-x-2">
                <CalendarDaysIcon size="22" color="white" />
                <Text className="text-white font-semibold text-base">
                  Daily forecast
                </Text>
              </View>
              <ScrollView
                horizontal
                contentContainerStyle={{ paddingHorizontal: 15 }}
                showsHorizontalScrollIndicator={false}
              >
                {weather?.forecast?.forecastday.map((items, index) => {
                  let date = new Date(items.date);
                  let options = { weekday: "long" };
                  let dayName = date.toLocaleDateString("en-US", options);
                  dayName = dayName.split(",")[0];
                  return (
                    <View
                      key={index}
                      className="flex justify-center items-center rounded-3xl gap-y-2 p-2 mr-2 "
                      style={{
                        backgroundColor: theme.bgWhite(0.15),
                        width: 100,
                        height: 100,
                      }}
                    >
                      <Image
                        source={
                          weatherImages[current?.condition?.text] ||
                          weatherImages["other"]
                        }
                        className="w-12 h-11"
                      />
                      <Text className="text-white">{dayName}</Text>
                      <Text className="text-white">
                        {items?.day?.avgtemp_c}
                        {"\u00B0"}
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}
