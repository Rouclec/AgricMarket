import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { Box, Heading } from "native-base";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { COLORS, FONTS } from "../../constants/theme";
import { auth } from "../auth/Firebase";
import { addToCart } from "../slices/navSlice";

const Category = ({ data, heading }) => {
  const id = auth.currentUser?.uid;

  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <View style={{ marginTop: 20 }}>
      <Heading color="gray.500" ml={4}>
        {heading}
      </Heading>
      <FlatList
        data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProductDetails", { data: item })
                }
              >
                <Box
                  height={260}
                  witdh={201}
                  bgColor="gray.200"
                  m={2}
                  borderRadius={20}
                >
                  <Image
                    source={item.image}
                    style={{
                      width: 200,
                      height: 200,
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                    }}
                  />
                  <Box
                    bgColor={"green.800"}
                    h={10}
                    w={100}
                    alignItems="center"
                    justifyContent={"center"}
                    borderRadius={10}
                    style={{
                      position: "absolute",
                      bottom: 50,
                      right: 7,
                    }}
                  >
                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>
                      XAF {item.price}
                    </Text>
                  </Box>
                  <View
                    style={{
                      justifyContent: "space-between",
                      //   alignItems: "center",
                      //   justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        ...FONTS.h2,
                        position: "absolute",
                        color: "#35702d",
                        bottom: -55,
                        left: 7,
                      }}
                    >
                      {item.title}
                    </Text>
                    {id && (
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(addToCart(item));
                        }}
                      >
                        <Box
                          w={10}
                          h={10}
                          alignItems="center"
                          justifyContent={"center"}
                          borderRadius={30}
                          style={{
                            position: "absolute",
                            bottom: -55,
                            right: 7,
                            backgroundColor: COLORS.lightGray,
                          }}
                        >
                          <Ionicons
                            name="cart-outline"
                            size={24}
                            color="black"
                          />
                        </Box>
                      </TouchableOpacity>
                    )}
                  </View>
                </Box>
              </TouchableOpacity>
            </>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Category;
