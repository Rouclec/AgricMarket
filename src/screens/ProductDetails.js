import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { Box, Card, Heading } from "native-base";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  useWindowDimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { COLORS, FONTS } from "../../constants/theme";

const tips = [
  {
    id: "temperature",
    iconName: "temperature-high",
    title: "Temperature",
    description: "64.4 - 77F",
  },
  {
    id: "sun",
    iconName: "sun",
    title: "Sunlight",
    description: "1 hour",
  },
  {
    id: "night",
    iconName: "moon",
    title: "Night Water",
    description: "30 ML",
  },
];

const ProductDetails = ({ route }) => {
  const data = route.params.data;
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <>
      <ImageBackground
        style={{
          height: 350,
          width: width,
          zIndex: -10000,
          flex: 0.4,
        }}
        source={data?.image}
      />
      <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          backgroundColor: COLORS.transparentBlack1,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 40,
          position: "absolute",
          top: 2,
          left: 2,
        }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons name="arrow-back" size={24} color={"white"} />
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: COLORS.white,
          flex: 0.7,
          zIndex: 99999,
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
        }}
      >
        <ScrollView>
          <Text
            style={{
              ...FONTS.h1,
              marginTop: 30,
              marginHorizontal: 30,
            }}
          >
            {data?.title}
          </Text>
          <Text
            style={{
              ...FONTS.h3,
              marginTop: 30,
              marginHorizontal: 30,
              color: COLORS.gray,
            }}
          >
            {data?.description}
          </Text>

          {data.type === "perishable" && (
            <View>
              <Text
                style={{ ...FONTS.h2, marginTop: 30, marginHorizontal: 30 }}
              >
                Tips to keep it fresh
              </Text>
              <FlatList
                style={{ paddingHorizontal: 35 }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={tips}
                renderItem={({ item }) => {
                  return (
                    <Box
                      h={290}
                      w={220}
                      bgColor="green.600"
                      borderRadius={20}
                      mx={5}
                      my={5}
                    >
                      <Box
                        h={70}
                        w={70}
                        bgColor="green.800"
                        borderRadius={10}
                        mx={5}
                        my={5}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <FontAwesome5
                          name={item.iconName}
                          size={40}
                          color="white"
                        />
                      </Box>
                      <View
                        style={{ margin: 10, position: "absolute", bottom: 20 }}
                      >
                        <Text style={{ ...FONTS.h3, color: COLORS.white }}>
                          {item.title}
                        </Text>
                        <Text style={{ ...FONTS.h1, color: COLORS.white }}>
                          {item.description}
                        </Text>
                      </View>
                    </Box>
                  );
                }}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
};

export default ProductDetails;
