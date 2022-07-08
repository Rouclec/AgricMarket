import React from "react";
import {
  Animated,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Avatar, Box, ScrollView, Heading, View } from "native-base";
// import InfoFlatList from "../components/InfoFlatList";
// import { HomeBox } from "../components/HomeBox";
import { auth, db } from "../auth/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import WalkThroughItem from "../components/WalkThroughItem";
import walkthroughData from "../data/walkthroughData";
import { FONTS, SIZES } from "../../constants/theme";
import Fruits from "../data/Fruits";
import COLORS from "../../constants/colors";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import Category from "../components/Category";
import Food from "../data/Food";
import Livestock from "../data/Livestock";
import Vegetables from "../data/Vegetables";
import ProductDetails from "./ProductDetails";
import Cereals from "../data/Cereals";
import { useSelector } from "react-redux";
import { getCartItems } from "../slices/navSlice";

function renderHeader() {
  const id = auth.currentUser?.uid;

  const cart = useSelector(getCartItems);

  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.sideDrawer}
        onPress={() => {
          navigation.navigate("Checkout");
        }}
      >
        {id && (
          <Box
            w={10}
            h={10}
            alignItems="center"
            justifyContent={"center"}
            borderRadius={30}
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons name="cart-outline" size={24} color="white" />
            <Text
              style={{
                color: COLORS.white,
                marginLeft: 2,
              }}
            >
              {cart?.length}
            </Text>
          </Box>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Update");
        }}
      >
        <Image
          source={require("../../assets/profile_pic.jpg")}
          resizeMode="contain"
          style={styles.profile_pic}
        />
      </TouchableOpacity>
    </View>
  );
}

export default function HomeScreen(props) {
  const [userInfo, setUserInfo] = React.useState();

  const navigation = useNavigation();

  const id = auth.currentUser?.uid;

  if (id) {
    const userRef = doc(db, "users", id);
  }

  const logOut = async () => {
    signOut(auth)
      .then(() => {
        alert("Successfully Signed Out!");
        navigation.navigate("WalkThrough");
      })
      .catch((error) => {
        console.log("error logging out: ", error);
      });
  };

  React.useEffect(() => {
    const getUserInfo = async () => {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        console.log("Document data: ", docSnap.data());
        setUserInfo(docSnap.data());
      } else {
        alert("Error Fetching user's information");
      }
    };
    getUserInfo();
  }, []);

  return (
    <>
      <View bgColor="gray.100" marginTop={0}>
        <Box
          bgColor={"green.500"}
          height={250}
          borderBottomRightRadius={15}
          borderBottomLeftRadius={15}
          zindex={-10}
          p={5}
          justifyContent="center"
        >
          {renderHeader()}
          <Heading color="gray.300" my={3}>
            Hi {id ? userInfo?.fullname.split(" ")[0] : "Guest"}, How is your
            day?
          </Heading>
          <Text style={{ ...FONTS.h1, color: "white", marginVertical: 7 }}>
            Fresh Vegetables are ready!
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ ...FONTS.h3, color: "white", marginVertical: 7 }}>
              Delivery withing 24hours
            </Text>
            <EvilIcons name="clock" size={24} color="white" />
          </View>
        </Box>
        <Box ml={4} my={4}>
          <Text
            style={{
              marginBottom: 10,
              ...FONTS.h2,
              color: COLORS.green,
              fontWeight: "600",
            }}
          >
            Free Liempo
          </Text>
          <Text style={{ ...FONTS.h3, color: COLORS.grey }}>
            Valid until December 2022
          </Text>
        </Box>
      </View>
      <ScrollView style={{ margin: 5 }} showsVerticalScrollIndicator={false}>
        <Category data={Cereals} heading={"Cereals"} />
        <Category data={Food} heading={"Food"} />
        <Category data={Fruits} heading={"Fruits"} />
        <Category data={Livestock} heading={"Livestock"} />
        <Category data={Vegetables} heading={"Vegetables"} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
    paddingTop: 10,
  },
  headerContainer: {
    flexDirection: "row",
    paddingVertical: SIZES.base,
    alignItems: "center",
    justifyContent: "space-between",
  },
  sideDrawer: {
    width: 45,
    height: 45,
    justifyContent: "center",
  },
  sideDrawerIcon: {
    width: 25,
    height: 25,
    tintColor: COLORS.white,
  },
  labelTitle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: COLORS.white,
    ...FONTS.h3,
  },
  profile_pic: {
    width: 45,
    height: 45,
    borderRadius: 30,
  },
});
// export default HomeScreen;
