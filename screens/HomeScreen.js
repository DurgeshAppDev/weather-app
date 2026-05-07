import {
  View,
  Image,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";

import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
} from "react-native-heroicons/outline";

const { width, height } = Dimensions.get("screen");

export default function HomeScreen() {
  const [showSearch, toggleSearch] = useState(false);
  const [location, setLocation] = useState([1, 2, 3]);

  const handleLocation = (loc) => {
    console.log("Selected Location:", loc);
  };

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

      <SafeAreaView className="flex-1">
        {/* Search Wrapper */}
        <View className="mx-4 mt-4 z-50">
          {/* Search Box */}
          <View
            className="flex-row items-center justify-end rounded-full px-2"
            style={{
              height: 52,
              backgroundColor: showSearch ? theme.bgWhite(0.2) : "transparent",
            }}
          >
            {showSearch && (
              <TextInput
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
                      Ludhiana, India.
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
            Ludhiana,
            <Text className="text-lg font-semibold text-gray-300">India</Text>
          </Text>
          <View className="flex-row justify-center">
            <Image
              source={require("../assets/images/partlycloudy.png")}
              className="w-52 h-52"
            />
          </View>
          <View className="items-center">
            <Text className="text-center font-bold text-white text-6xl">
              23{"\u00B0"}
            </Text>
          </View>

          {/* stats of weather */}
          <View className="flex-row justify-center mx-4 gap-x-10">
            <View className="flex-row items-center">
              <Image
                source={require("../assets/icons/wind.png")}
                className="w-6 h-6"
              />
              <Text className="text-white font-semibold text-base "> 30km</Text>
            </View>
            <View className="flex-row items-center">
              <Image
                source={require("../assets/icons/drop.png")}
                className="w-6 h-6"
              />
              <Text className="text-white font-semibold text-base "> 30%</Text>
            </View>
            <View className="flex-row items-center">
              <Image
                source={require("../assets/icons/sun.png")}
                className="w-6 h-6"
              />
              <Text className="text-white font-semibold text-base ">
                6:09am
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
              <View
                className="flex justify-center items-center rounded-3xl gap-y-2 p-2 mr-2"
                style={{ backgroundColor: theme.bgWhite(0.15) }}
              >
                <Image
                  source={require("../assets/images/heavyrain.png")}
                  className="w-12 h-11"
                />
                <Text className="text-white">Monday</Text>
                <Text className="text-white">20{"\u00B0"}</Text>
              </View>
              <View
                className="flex justify-center items-center rounded-3xl gap-y-2 p-2 mr-2"
                style={{ backgroundColor: theme.bgWhite(0.15) }}
              >
                <Image
                  source={require("../assets/images/heavyrain.png")}
                  className="w-12 h-11"
                />
                <Text className="text-white">Monday</Text>
                <Text className="text-white">20{"\u00B0"}</Text>
              </View>
              <View
                className="flex justify-center items-center rounded-3xl gap-y-2 p-2 mr-2"
                style={{ backgroundColor: theme.bgWhite(0.15) }}
              >
                <Image
                  source={require("../assets/images/heavyrain.png")}
                  className="w-12 h-11"
                />
                <Text className="text-white">Monday</Text>
                <Text className="text-white">20{"\u00B0"}</Text>
              </View>
              <View
                className="flex justify-center items-center rounded-3xl gap-y-2 p-2 mr-2"
                style={{ backgroundColor: theme.bgWhite(0.15) }}
              >
                <Image
                  source={require("../assets/images/heavyrain.png")}
                  className="w-12 h-11"
                />
                <Text className="text-white">Monday</Text>
                <Text className="text-white">20{"\u00B0"}</Text>
              </View>
              <View
                className="flex justify-center items-center rounded-3xl gap-y-2 p-2 mr-2"
                style={{ backgroundColor: theme.bgWhite(0.15) }}
              >
                <Image
                  source={require("../assets/images/heavyrain.png")}
                  className="w-12 h-11"
                />
                <Text className="text-white">Monday</Text>
                <Text className="text-white">20{"\u00B0"}</Text>
              </View>
              <View
                className="flex justify-center items-center rounded-3xl gap-y-2 p-2 mr-2"
                style={{ backgroundColor: theme.bgWhite(0.15) }}
              >
                <Image
                  source={require("../assets/images/heavyrain.png")}
                  className="w-12 h-11"
                />
                <Text className="text-white">Monday</Text>
                <Text className="text-white">20{"\u00B0"}</Text>
              </View>
              <View
                className="flex justify-center items-center rounded-3xl gap-y-2 p-2 mr-2"
                style={{ backgroundColor: theme.bgWhite(0.15) }}
              >
                <Image
                  source={require("../assets/images/heavyrain.png")}
                  className="w-12 h-11"
                />
                <Text className="text-white">Monday</Text>
                <Text className="text-white">20{"\u00B0"}</Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
