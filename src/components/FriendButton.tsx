import React, { useContext } from "react";
import { Box, Image, Text, View } from "native-base";
import { Friend } from "../contexts/user/user.types";
import { LinearGradient } from "expo-linear-gradient";
import * as Linking from "expo-linking";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { RootStackNavigationProp, RootTabNavigationProp } from "../../types";
import { FriendContext } from "../contexts/friend/FriendContext";
import Svg, {
  Circle,
  G,
  SvgXml,
  TextPath,
  Text as TextS,
} from "react-native-svg";
import { processFontFamily } from "expo-font";

// export default function FriendCard({ friend }: { friend: Friend }) {
export default function FriendButton({
  listLength,
  friend,
}: {
  listLength?: number;
  friend: Friend;
}) {
  const navigation = useNavigation<RootTabNavigationProp<"Home">>();

  const { callFriend } = useContext(FriendContext);

  const size = listLength == 2 ? 160 : listLength == 1 ? 300 : 110;
  return (
    <TouchableOpacity
      onPress={() => {
        callFriend(friend?.contact.phoneNumbers, friend?.contact.id);
      }}
      onLongPress={() => {
        navigation.navigate("FriendStack", {
          screen: "Friend",
          params: { id: friend?.contact.id },
        });
      }}
      delayLongPress={500}
    >
      <Box overflow="hidden" mx="2.5" borderRadius="lg">
        {friend?.contact?.image ? (
          <Image
            source={friend?.contact.image}
            w={size || 100}
            h={size || 100}
            alt="friend image"
          />
        ) : friend.avatar ? (
          <View>
            <SvgXml
              xml={friend.avatar}
              width={size || 100}
              height={size || 100}
            />
          </View>
        ) : null}

        {/* <Text
          zIndex={2}
          position="absolute"
          bottom="0.5"
          left="1.5"
          fontWeight="bold"
          fontSize="lg"
          color="white"
        >
          {friend?.contact?.nickname || friend?.contact?.name}
        </Text> */}
        {/* <LinearGradient
          colors={
            listLength == 1
              ? [
                  "transparent",
                  "transparent",
                  "transparent",
                  "transparent",
                  "rgba(0,0,0,0.8)",
                ]
              : ["transparent", "transparent", "transparent", "rgba(0,0,0,0.8)"]
          }
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            width: size,
            height: size,
          }}
        /> */}
        <RadiusName size={size} contact={friend?.contact} />
      </Box>
    </TouchableOpacity>
  );
}

const RadiusName = ({
  size,
  contact,
  ...props
}: {
  size: number;
  contact: Friend["contact"];
} & React.ComponentProps<typeof Svg>) => {
  return (
    <Svg
      height={size + 30}
      width={size + 30}
      style={[
        {
          overflow: "visible",
          position: "absolute",
          // alignSelf: "center",
          // justifyContent: "center",
          // for ios
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          // for android
          elevation: 5,
        },
        props.style,
      ]}
    >
      <G id="circle">
        <Circle
          r={size / 2 - 15}
          x={size / 2}
          y={size / 2}
          // fill={"red"}
          stroke="none"
          strokeWidth={0}
          transform="rotate(-80)"
        />
      </G>

      <TextPath href="#circle">
        <TextS
          fill={"white"}
          fontSize={18}
          fontFamily={processFontFamily("Outfit_700Bold")}
        >
          {contact?.nickname || contact?.firstName || contact?.name}
        </TextS>
      </TextPath>
    </Svg>
  );
};
