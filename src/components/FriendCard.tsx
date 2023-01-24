import React, { ComponentProps, useContext, useState } from "react";
import { Box, Image, Text, View } from "native-base";
import { Friend } from "../contexts/user/user.types";
import { LinearGradient } from "expo-linear-gradient";
import * as Linking from "expo-linking";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, Pressable, TouchableOpacity } from "react-native";
import { RootStackNavigationProp, RootTabNavigationProp } from "../../types";
import { FriendContext } from "../contexts/friend/FriendContext";
// import {
//   Canvas,
//   Group,
//   TextPath,
//   Skia,
//   useFont,
//   vec,
//   Fill,
// } from "@shopify/react-native-skia";
import { SettingsContext } from "../contexts/settings/SettingsContext";
import Svg, {
  Circle,
  G,
  SvgXml,
  TextPath,
  Text as TextS,
} from "react-native-svg";
import { processFontFamily } from "expo-font";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";
import { AnimatePresence, MotiView, useDynamicAnimation } from "moti";
import { MotiPressable } from "moti/interactions";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { translate } from "@shopify/react-native-skia";

const actions = [
  {
    type: "Send",
    icon: <FontAwesome name="send" size={24} color="white" />,
    translate: { x: 0, y: -10 },
    color: "#ff9500",
  },
  {
    type: "Scan",
    icon: <MaterialIcons name="qr-code" size={24} color="white" />,
    translate: { x: 10, y: 0 },
    color: "#5856d6",
  },

  {
    type: "Activity",
    icon: <Feather name="clock" size={24} color="white" />,
    color: "#34c759",
  },
];

// export default function FriendCard({ friend }: { friend: Friend }) {
export default function FriendCard({
  listLength,
  friend,
  location,
  ...props
}: {
  listLength?: number;
  friend: Friend;
  location: { x: number; y: number };
} & ComponentProps<typeof Box>) {
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation<RootTabNavigationProp<"Home">>();

  const { callFriend } = useContext(FriendContext);
  const { carouselNumColumns } = React.useContext(SettingsContext);

  const screenSizes = Dimensions.get("window");

  const size = screenSizes.width / carouselNumColumns + 0;
  console.log(size);

  const offset = useSharedValue({
    translateX: location.x,
    translateY: location.y,
  });

  const start = useSharedValue({
    x: location.x,
    y: location.y,
  });
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const savedRotation = useSharedValue(0);

  const dragGesture = Gesture.Pan()
    .onBegin(() => {
      // isPressed.value = true;
    })
    .onUpdate((e) => {
      offset.value = {
        translateX: e.translationX + start.value.x,
        translateY: e.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.translateX,
        y: offset.value.translateY,
      };
    });

  const zoomGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = savedScale.value * event.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const rotateGesture = Gesture.Rotation()
    .onUpdate((event) => {
      rotation.value = savedRotation.value + event.rotation;
    })
    .onEnd(() => {
      savedRotation.value = rotation.value;
    });
  const composed = Gesture.Simultaneous(
    dragGesture,
    Gesture.Simultaneous(zoomGesture, rotateGesture)
  );

  return (
    <GestureDetector gesture={composed}>
      <MotiView
        // from={{
        //   scale: 0,
        //   translateX: (Math.random() * screenSizes.width) / 2,
        //   translateY: (Math.random() * screenSizes.height) / 2,
        // }}
        animate={useDerivedValue(() => ({
          translateX: offset.value.translateX,
          translateY: offset.value.translateY,
          rotate: rotation.value + "deg",
          scale: scale.value,
        }))}
      >
        <TouchableOpacity
          onPress={() => {
            setExpanded(!expanded);
            // callFriend(friend?.contact.phoneNumbers, friend?.contact.id);
          }}
          onLongPress={() => {
            navigation.navigate("FriendStack", {
              screen: "Friend",
              params: { id: friend?.contact.id },
            });
          }}

          // delayLongPress={500}
          // style={{ flex: 0.5, zIndex: 20 }}
          // style={{ overflow: "visible" }}
        >
          <Box
            overflow="visible"
            // mx="1.5"
            borderRadius="lg"
            style={{ overflow: "visible" }}
            {...props}
          >
            <View
              alignItems={"center"}
              justifyContent={"center"}
              w={size + 10}
              h={size + 10}
            >
              {friend?.contact?.image ? (
                <Image
                  source={friend?.contact.image}
                  w={size - 22}
                  h={size - 22}
                  rounded={"full"}
                  alt="friend image"
                />
              ) : friend?.avatar ? (
                <View>
                  <SvgXml
                    xml={friend.avatar}
                    width={size - 22}
                    height={size - 22}
                  />
                </View>
              ) : null}
            </View>
            <RadiusName size={size} contact={friend?.contact} />
          </Box>
        </TouchableOpacity>
        <AnimatePresence>
          {expanded && (
            <View style={{}}>
              {actions.map((action, i) => (
                <ActionButton key={i} action={action} index={i} />
              ))}
            </View>
          )}
        </AnimatePresence>
      </MotiView>
    </GestureDetector>
  );
}

const RadiusName = ({
  size,
  contact,
}: {
  size: number;
  contact: Friend["contact"];
}) => {
  return (
    <Svg
      height={size + 30}
      width={size + 30}
      style={{
        overflow: "visible",
        position: "absolute",
        // alignSelf: "center",
        // justifyContent: "center",
      }}
    >
      <G id="circle">
        <Circle
          r={size / 2 - 10}
          x={size / 2 + 5}
          y={size / 2 + 5}
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

function ActionButton({ action, index }) {
  return (
    <MotiView
      transition={{ delay: index * 100, damping: 15 }}
      from={{
        opacity: 0,
        translateX: 0,
        translateY: 0,
      }}
      animate={{
        opacity: 1,
        // translateX: 0, //-65 * (index + 1),
        ...translate,
      }}
      exit={{
        opacity: 0,
        translateX: 0,
        translateY: 0,
      }}
    >
      <Pressable
        onPress={() => console.log(action.type)}
        style={[
          {
            borderRadius: 100,
            width: 55,
            height: 55,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            // bottom: 50,
            // right: 20,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
            zIndex: 1,
            backgroundColor: action.color,
            shadowColor: action.color,
          },
        ]}
      >
        {action.icon}
      </Pressable>
    </MotiView>
  );
}
