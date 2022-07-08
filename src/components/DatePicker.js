import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableHighlight,
  Platform,
  Touchable,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

import { COLORS } from "../constants";

const DatePicker = (props) => {
  const { textStyle } = props;
  const [date, setDate] = React.useState(moment());
  const [show, setShow] = React.useState(false);

  const onChange = (e, selectedDate) => {
    setDate(moment(selectedDate));
  };

  return (
    <TouchableHighlight
      activeOpacity={0}
      onPress={() => setShow(true)}
      style={{
        margin: 7,
      }}
    >
      <View>
        <Text style={textStyle}>{date.format("DD-MM-YYYY")}</Text>

        <Modal
          transparent={true}
          animationType={"slide"}
          visible={show}
          supportedOrientations={["portrait"]}
          onRequestClose={() => {
            setShow(false);
            props.setDate(date);
          }}
        >
          <View style={{ flex: 1 }}>
            <TouchableHighlight
              style={{
                flex: 1,
                alignItems: "flex-end",
                flexDirection: "row",
              }}
              activeOpacity={1}
              visible={show}
              onPress={() => {
                setShow(false);
                props.setDate(date);
              }}
            >
              <TouchableHighlight
                underlayColor={COLORS.white}
                style={{
                  flex: 1,
                  borderTopColor: COLORS.lightGray,
                  borderTopWidth: 1,
                }}
                onPress={() => {
                }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    height: 256,
                    overflow: "hidden",
                  }}
                >
                  <View style={{ marginTop: 20 }}>
                    <DateTimePicker
                      timeZoneOffsetInMinutes={0}
                      value={new Date(date)}
                      mode="date"
                      minimumDate={new Date()}
                      onChange={onChange}
                    />
                  </View>
                </View>
              </TouchableHighlight>
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    </TouchableHighlight>
  );
};

DatePicker.defaultProps = {
  textStyle: {},
};

export default DatePicker;
