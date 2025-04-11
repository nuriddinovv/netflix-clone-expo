import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import { View, Text, Touchable, TouchableOpacity, Image } from "react-native";

export default function MovieCard({
  id,
  title,
  adult,
  backdrop_path,
  genre_ids,
  original_language,
  original_title,
  overview,
  popularity,
  poster_path,
  release_date,
  video,
  vote_average,
  vote_count,
}: Movie) {
  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity activeOpacity={0.8} className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/ffffff.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
          alt={title}
        />

        <Text numberOfLines={1} className="text-sm font-bold mt-2 text-white">
          {title}
        </Text>

        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs text-white font-bold uppercase">
            {Math.round(vote_average / 2)}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {release_date?.split("-")[0]}
          </Text>
          {/* <Text className="text-xs text-light-300 font-medium mt-1">{}</Text> */}
        </View>
      </TouchableOpacity>
    </Link>
  );
}
