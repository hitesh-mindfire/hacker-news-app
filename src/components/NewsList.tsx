import React, { FC, useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { NewsCard } from "src/components/NewsCard";
import { AppDispatch, RootState } from "src/store/Store";

import { fetchNewsDetails } from "src/services";
import { useTheme } from "@react-navigation/native";
import { Colors, spacing } from "src/theme";
import { News, NewsListProps } from "src/types/NewsTypes";
import {
  fetchNewNewsIds,
  fetchPastNewsIds,
} from "src/store/actions/NewsActions";

export const NewsList: FC<NewsListProps> = ({ newsType }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const dispatch = useDispatch<AppDispatch>();
  const { newNewsIds, pastNewsIds, loading } = useSelector(
    (state: RootState) => state.news
  );
  const [news, setnews] = useState<News[]>([]);
  const [page, setPage] = useState(0);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const ITEMS_PER_PAGE = 15;

  const newsIds = newsType === "New" ? newNewsIds : pastNewsIds;

  useEffect(() => {
    if (!newsIds.length) {
      if (newsType === "New") {
        dispatch(fetchNewNewsIds());
      } else {
        dispatch(fetchPastNewsIds());
      }
    }
  }, [dispatch, newsIds, newsType]);

  useEffect(() => {
    if (newsIds.length) {
      fetchnews();
    }
  }, [page, newsIds]);

  const fetchnews = async () => {
    if (!newsIds.length) return;
    setIsFetchingMore(true);

    const start = page * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const currentIds = newsIds.slice(start, end);

    const newsRequests = currentIds.map(async (id) => {
      try {
        const response: News = await fetchNewsDetails(id);
        return response;
      } catch (error) {
        console.error(`Error fetching story with ID ${id}:`, error);
        return null;
      }
    });

    const newsResponses = await Promise.all(newsRequests);
    const fetchednews = newsResponses.filter((res) => res !== null) as News[];
    setnews((prevnews) => [...prevnews, ...fetchednews]);
    setIsFetchingMore(false);
  };

  const loadMorenews = () => {
    if (!isFetchingMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    if (newsType === "New") {
      await dispatch(fetchNewNewsIds());
    } else {
      await dispatch(fetchPastNewsIds());
    }
    setRefreshing(false);
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={news}
        keyExtractor={(item) => item.id.toString() + Math.random()}
        renderItem={({ item }) => <NewsCard newsItem={item} />}
        contentContainerStyle={styles.list}
        onEndReached={loadMorenews}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingMore ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : null
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: spacing.md,
      backgroundColor: colors.background,
    },
    list: {
      paddingBottom: spacing.md,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
