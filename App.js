import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { users as initialData } from "./data";

const App = () => {
  const [data, setData] = useState(initialData.slice(3));
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [slidesToPull, setSlidesToPull] = useState(3);

  const loadMoreData = () => {
    if (isLoadingMore || !hasMoreData) {
      return;
    }

    setIsLoadingMore(true);

    // Simulate an API call to fetch more data
    setTimeout(() => {
      setSlidesToPull(data.length < slidesToPull ? slidesToPull + 3 : 0);
      const newData = data.slice(slidesToPull);

      setData([...data, ...newData]);
      setIsLoadingMore(false);
      setHasMoreData(false); // For this example, assume we've reached the end of data
    }, 2000);
  };

  const onRefresh = () => {
    if (refreshing) {
      return;
    }

    setRefreshing(true);

    // Simulate an API call to fetch refreshed data
    setTimeout(() => {
      setData(data.slice(3));
      setRefreshing(false);
    }, 2000);
  };

  return (
    <View style={{ flex: 1, marginTop: 50 }}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => {
          if (!isLoadingMore) return null;

          return (
            <View style={{ paddingVertical: 16 }}>
              <Text style={{ textAlign: "center" }}>Loading more data...</Text>
            </View>
          );
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
            }}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default App;
