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
import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { translate } from "@shopify/react-native-skia";

type Action = {
  type: string;
  icon: JSX.Element;
  translate: { x: number; y: number };
  color: string;
};

const actions: Action[] = [
  {
    type: "Profile",
    icon: <Ionicons name="person" size={24} color="white" />,
    translate: { x: 1, y: 0.5 },
    color: "#ffc698",
  },
  {
    type: "Edit",
    icon: <MaterialIcons name="edit" size={24} color="white" />,
    translate: { x: Math.sin(45), y: Math.sin(45) },
    color: "#9c9aff",
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

  const size = screenSizes.width / carouselNumColumns + 20;
  const circleSize = size - 22;

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
      <TouchableOpacity
        style={{
          backgroundColor: "pink",
        }}
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
        <MotiView
          // from={{
          //   scale: 0,
          //   translateX: (Math.random() * screenSizes.width) / 2,
          //   translateY: (Math.random() * screenSizes.height) / 2,
          // }}
          style={{
            width: size || expanded ? size * 2 : size,
            height: size || expanded ? size * 2 : size,
            backgroundColor: "red",
          }}
          animate={useDerivedValue(() => ({
            translateX: expanded
              ? offset.value.translateX + circleSize / 2
              : offset.value.translateX,
            translateY: expanded
              ? offset.value.translateY + circleSize / 2
              : offset.value.translateY,
            rotate: rotation.value + "deg",
            scale: expanded ? scale.value * 1.2 : scale.value,
          }))}
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
                  w={"100%"}
                  h={"100%"}
                  rounded={"full"}
                  alt="friend image"
                />
              ) : friend?.avatar ? (
                <View>
                  <SvgXml
                    xml={friend.avatar}
                    width={circleSize}
                    height={circleSize}
                  />
                </View>
              ) : null}
            </View>
            <RadiusName size={size} contact={friend?.contact} />
          </Box>
          <AnimatePresence>
            {expanded && (
              <View style={{ zIndex: -20 }}>
                {actions.map((action, i) => (
                  <ActionButton
                    key={i}
                    action={action}
                    index={i}
                    size={circleSize}
                    disabled={!expanded}
                    onPress={() =>
                      navigation.navigate("FriendStack", {
                        screen: "Friend",
                        params: { id: friend?.contact.id },
                      })
                    }
                  />
                ))}
              </View>
            )}
          </AnimatePresence>
        </MotiView>
      </TouchableOpacity>
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
          r={size / 2 - 11}
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

function ActionButton({
  action,
  index,
  size,
  onPress,
  disabled,
}: {
  action: Action;
  index: number;
  size: number;
  onPress: () => void;
  disabled: boolean;
}) {
  return (
    <MotiView
      transition={{ delay: index * 100, damping: 15 }}
      from={{
        opacity: 0,
        translateX: size / 2,
        translateY: size / 2,
      }}
      animate={{
        opacity: 1,
        // rotation: 90,
        // translateX: 0, //-65 * (index + 1),
        translateX:
          size / 2 + (size / 2) * Math.cos((45 * Math.PI) / 180) ||
          action.translate.x * size,
        translateY:
          size / 2 + (size / 2) * Math.sin((45 * Math.PI) / 180) ||
          action.translate.y * size,
      }}
      exit={{
        opacity: 0,
        translateX: 100 / 2,
        translateY: 50,
      }}
    >
      <Pressable
        disabled={disabled}
        onPress={() => {
          console.log("pressed", disabled);
          onPress();
        }}
        style={[
          {
            borderRadius: 100,
            width: 45,
            height: 45,

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
