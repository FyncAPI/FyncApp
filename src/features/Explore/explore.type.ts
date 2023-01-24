export type IRLEvent = {
  _id: string;
  name: string;
  type: "IRL";
  description: string;
  mapsLink: string;
  date: Date;
  location: string;
  images: string[];
  videos?: string[];
};

export type AppEvent = {
  _id: string;
  appId: string;
  title: string;
  type: "APP";
  description: string;
  date: Date;
  location: string;
  images: string[];
  videos: string[];
};

export type ExploreItem = IRLEvent | AppEvent;

export type ExploreEventType = ExploreItem["type"];
