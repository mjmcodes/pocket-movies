import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type BottomTabParamList = {
   Discover: undefined;
   Search: undefined;
   Collection: undefined;
};

export type DiscoverParamList = {
   Home: undefined;
   MovieDetail: { id: number };
   MovieDetailModal: { id: number };
};

export type DiscoverScreenNavigationProps = NativeStackScreenProps<
   DiscoverParamList,
   "MovieDetail"
>;

export type SearchParamList = {
   Home: undefined;
   MovieDetail: { id: number };
   MovieDetailModal: { id: number };
};
