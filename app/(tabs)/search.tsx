import { View, Text, Image, ActivityIndicator, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies = [],
    loading,
    refetch: loadMovies,
    reset,
    error,
  } = useFetch(() => fetchMovies({ query: searchQuery }));

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        loadMovies();
        fetchMovies({ query: "" });
      }
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full flex-1 z-0"
        resizeMode="cover"
      />
      <FlatList
        data={movies as Movie[]}
        renderItem={({ item }) => {
          return <MovieCard {...item} />;
        }}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        className="px-5"
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginBottom: 10,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Search for a movie"
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
                onPress={() => {}}
              />
            </View>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="mb-5 self-center"
              />
            )}

            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}

            {!loading &&
              !error &&
              searchQuery.trim() &&
              movies?.length! > 0 && (
                <Text className="text-xl mb-5 text-white font-bold">
                  Search Results for{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                "No movies found"
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}
