import React, { useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  RefreshControl,
} from 'react-native';

import { useHome } from '../hooks/useHome';
import HomeHeader from '../components/home/HomeHeader';
import SearchBar from '../components/home/SearchBar';
import CategoryList from '../components/home/CategoryList';
import ProductGrid from '../components/home/ProductGrid';
import TestimonialSection from '../components/home/TestimonialSection';
import BottomTabBar from '../components/home/BottomTabBar';
import { COLORS } from '../../constants/theme';

function HomeScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('home');
  const [refreshing, setRefreshing] = useState(false);

  const {
    searchQuery, activeCategoryId, categories,
    products, testimonials, toggleWishlist,
    selectCategory, handleSearch, clearSearch,
  } = useHome();

  const handleProductPress = useCallback((product) => {
    navigation.navigate('ProductDetail', { product });
  }, [navigation]);

  const handleTabPress = useCallback((k) => setActiveTab(k), []);
  const handleNotificationPress = useCallback(() => console.log('notif'), []);
  const handleTestimonialPress = useCallback((i) => console.log('testimonial:', i.id), []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* ─── FIXED: only the top header stays outside scroll ─── */}
      <HomeHeader
        onNotificationPress={handleNotificationPress}
        notificationCount={1}
      />

      {/* ─── SCROLLABLE: search + categories + products + testimonials ─── */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
      >
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          onClear={clearSearch}
        />

        <CategoryList
          categories={categories}
          activeCategoryId={activeCategoryId}
          onSelectCategory={selectCategory}
        />

        <ProductGrid
          products={products}
          title="All Items"
          onProductPress={handleProductPress}
          onWishlistToggle={toggleWishlist}
        />

        <TestimonialSection
          testimonials={testimonials}
          onPress={handleTestimonialPress}
        />
      </ScrollView>

      {/* ─── FIXED: bottom tab bar ─── */}
      <BottomTabBar
        activeTab={activeTab}
        onTabPress={handleTabPress}
        cartCount={3}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
    backgroundColor: COLORS.white,
  },
});

export default HomeScreen;