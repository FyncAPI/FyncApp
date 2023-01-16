export type event = {
  _id: string;
  name: string;
  description: string;
  date: Date;
  location: string;
  images: string[];
  videos: string[];
};

export type ExploreItem = event[];
