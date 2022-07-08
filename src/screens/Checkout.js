import { Ionicons } from "@expo/vector-icons";
import { Box, Heading, Modal } from "native-base";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { COLORS, FONTS } from "../../constants/theme";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import { getCartItems, removeFromCart } from "../slices/navSlice";

const Checkout = (props) => {
  const cart = useSelector(getCartItems);
  const dispatch = useDispatch();
  const [subtotal, setSubTotal] = React.useState(0);
  const { width, height } = useWindowDimensions();
  const [fullname, setFullname] = React.useState();
  const [address, setAddress] = React.useState();
  const [cardnumber, setCardnumber] = React.useState();
  const [expiry, setExpiry] = React.useState();
  const [cvc, setCvc] = React.useState();
  const [modalOpen, setModalOpen] = React.useState(false);

  React.useEffect(() => {
    let total = 0;
    cart.map((item) => {
      total += item.price;
    });
    setSubTotal(total);
  }, [cart]);

  const confirmSubmit = async () => {
    setModalOpen(false);
    alert("Order placed successfully!");
  };
  return (
    <View style={{ padding: 20, paddingTop: 0 }}>
      <Heading mt={10}>ORDER SUMMARY</Heading>

      <View style={{ height: height / 2, zIndex: -1 }}>
        {cart.length === 0 && (
          <Box
            my={4}
            bgColor={"gray.200"}
            w={width - 50}
            h={120}
            borderRadius={20}
            style={{
              justifyContent: "center",
            }}
            p={5}
          >
            <Text style={{ ...FONTS.h2 }}>Cart is Empty! Add items</Text>
          </Box>
        )}
        <FlatList
          data={cart}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <Box
                my={4}
                bgColor={"gray.200"}
                w={width - 50}
                h={120}
                borderRadius={20}
              >
                <View
                  style={{
                    flexDirection: "row",
                    // alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <Image
                    source={item.image}
                    style={{ width: 120, height: 120, borderRadius: 20 }}
                  />
                  <View
                    style={{
                      marginLeft: 10,
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        ...FONTS.h2,
                        fontWeight: "800",
                        marginBottom: 20,
                      }}
                    >
                      {item.title}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <View style={{ width: 150 }}>
                        <Text
                          style={{
                            ...FONTS.h2,
                            fontWeight: "600",
                            color: COLORS.gray,
                          }}
                        >
                          XAF {item.price}
                        </Text>
                      </View>
                      <View
                        style={{
                          justifyContent: "flex-end",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => dispatch(removeFromCart(item))}
                        >
                          <View
                            style={{
                              height: 30,
                              width: 30,
                              backgroundColor: COLORS.transparentBlack,
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 40,
                            }}
                          >
                            <Ionicons
                              name="remove-outline"
                              size={24}
                              color="white"
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </Box>
            );
          }}
        />
      </View>
      <View
        style={{
          zIndex: 999,
          height: height / 2,
          backgroundColor: COLORS.white,
          borderRadius: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: COLORS.gray, ...FONTS.h2, margin: 15 }}>
            Coupon Code:
          </Text>
          <Text
            style={{
              color: COLORS.gray,
              ...FONTS.h3,
              margin: 15,
              fontWeight: "600",
            }}
          >
            SPRNG3021
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 20,
            marginVertical: 7,
          }}
        >
          <Text style={{ color: "#6f6a79", fontWeight: "600" }}>Subtotal</Text>
          <Text>XAF {subtotal}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 20,
            marginVertical: 7,
          }}
        >
          <Text style={{ color: "#6f6a79", fontWeight: "600" }}>
            Shopping cost
          </Text>
          <Text>XAF 1000</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 20,
            marginVertical: 7,
          }}
        >
          <Text style={{ color: "#6f6a79", fontWeight: "600" }}>
            Discount (20%)
          </Text>
          <Text style={{ color: "red" }}>XAF -{subtotal * 0.2}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 20,
            marginTop: 15,
          }}
        >
          <Text style={{ color: "#6f6a79", fontWeight: "800" }}>Total</Text>
          <Text style={{ fontWeight: "800" }}>
            XAF {subtotal + 1000 - subtotal * 0.2}
          </Text>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <FormButton
            buttonTitle={"Checkout"}
            rest={{
              alignItems: "center",
              justifyContent: "center",
            }}
            disabled={subtotal === 0}
            onPress={() => {
              setModalOpen(true);
            }}
          />
        </View>
      </View>
      <Modal isOpen={modalOpen}>
        <Modal.Content maxWidth={"1000px"} width={"350px"} mb={"auto"} mt={12}>
          <Modal.CloseButton onPress={() => setModalOpen(false)} />
          <Modal.Body>
            {/* <Modal.CloseButton /> */}
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  ...FONTS.h1,
                  padding: 7,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Complete your order
              </Text>
            </View>
            <View>
              <FormInput placeholder="Full name" customHeight={40} />
              <FormInput placeholder="Delivery address" customHeight={40} />
              {/* <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormInput customHeight={40} rest={{ width: "100px" }} />
                <FormInput customHeight={40} rest={{ width: "25%" }} />
                <FormInput customHeight={40} rest={{ width: "15%" }} />
              </View> */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormInput
                  customHeight={40}
                  placeholder="Card number"
                  other={{
                    width: "55%",
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    borderRightWidth: 0,
                  }}
                />
                <FormInput
                  customHeight={40}
                  placeholder="MM/YY"
                  other={{
                    width: "25%",
                    borderRightWidth: 0,
                    borderLeftWidth: 0,
                    borderRadius: 0,
                  }}
                />
                <FormInput
                  customHeight={40}
                  placeholder="CVC"
                  other={{
                    width: "20%",
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderLeftWidth: 0,
                  }}
                />
              </View>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <FormButton
                buttonTitle={"Confirm Purchase"}
                rest={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={confirmSubmit}
              />
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>
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

export default Checkout;
