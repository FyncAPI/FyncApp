import { useState } from "react";
import { ExploreItem, IRLEvent } from "../features/Explore/explore.type";

export const useExploreItems = (id?: string) => {
  const [exploreItems, setExploreItems] = useState<ExploreItem[]>([
    {
      _id: "1",
      name: "free foood 1",
      type: "IRL",
      date: new Date(),
      location: "location",
      mapsLink: "mapsLink",
      description: "description",
      images: ["https://www.google.com"],
      videos: ["https://www.youtube.com/watch?v=1"],
    },
    {
      _id: "2",
      title: "valo",
      type: "APP",
      date: new Date(),
      location: "location",
      appId: "appId",
      description: "description",
      images: ["https://www.google.com"],
      videos: ["https://www.youtube.com/watch?v=1"],
    },
  ]);

  // get events from server

  return { exploreItems };
};
