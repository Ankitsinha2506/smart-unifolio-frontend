import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import ProductCard from './ProductCard';
import { COLORS, FONT_SIZE, SPACING } from '../../../constants/theme';

const SCREEN_WIDTH = Dimensions.get('window').width;
const H_PADDING    = 14;
const COLUMN_GAP   = 10;
const CARD_WIDTH   = (SCREEN_WIDTH - H_PADDING * 2 - COLUMN_GAP) / 2;

function EmptyState() {
  return (
    <View style={styles.emptyWrapper}>
      <Text style={styles.emptyIcon}>🔍</Text>
      <Text style={styles.emptyTitle}>No products found</Text>
      <Text style={styles.emptySubtitle}>Try a different category or search term</Text>
    </View>
  );
}

function ProductGrid({ products, title = 'All Items', onProductPress, onWishlistToggle }) {
  const renderItem = useCallback(({ item }) => (
    <View style={styles.cardWrapper}>
      <ProductCard
        item={item}
        onPress={onProductPress}
        onWishlistToggle={onWishlistToggle}
      />
    </View>
  ), [onProductPress, onWishlistToggle]);

  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>

      {products.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.row}
          removeClippedSubviews={true}
          initialNumToRender={6}
          maxToRenderPerBatch={6}
          windowSize={5}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: H_PADDING,
    paddingTop:        12,
    paddingBottom:     8,
    backgroundColor:   COLORS.white,
  },
  sectionTitle: {
    fontSize:     FONT_SIZE.xl,
    fontWeight:   '700',
    color:        COLORS.text.primary,
    marginBottom: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom:   COLUMN_GAP,
  },
  cardWrapper: {
    width: CARD_WIDTH,
  },
  emptyWrapper: {
    alignItems:      'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize:     40,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize:     FONT_SIZE.lg,
    fontWeight:   '600',
    color:        COLORS.text.primary,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize:  FONT_SIZE.sm,
    color:     COLORS.text.muted,
    textAlign: 'center',
  },
});

export default ProductGrid;