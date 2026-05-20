// ─────────────────────────────────────────────
//  ProductDetailScreen
//  Pure UI — assembles all product detail
//  components. All logic lives in useProductDetail.
//
//  FIX 1 — Image height: reduced from 0.9 → 0.72 width
//  FIX 2 — Color tint: now uses Image tintColor prop
//          (not a background overlay View)
//  FIX 3 — Wishlist: state reflected in heart icon ♥/♡
//  FIX 4 — Logo upload: real image picker + custom modal
//  FIX 5 — RelatedProducts: navigation.push wired + reusable
//  FIX 6 — Uses route.params.product (passed from HomeScreen)
// ─────────────────────────────────────────────

import React, { useCallback, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';

import { useProductDetail } from '../hooks/useProductDetail';
import ProductImageCarousel from '../components/productDetail/ProductImageCarousel';
import ProductInfo          from '../components/productDetail/ProductInfo';
import SizeColorQuantity    from '../components/productDetail/SizeColorQuantity';
import DeliveryOptions      from '../components/productDetail/DeliveryOptions';
import ReviewsSection       from '../components/productDetail/ReviewsSection';
import RelatedProducts      from '../components/productDetail/RelatedProducts';
import BottomActionBar      from '../components/productDetail/BottomActionBar';
import { COLORS } from '../../constants/theme';

// ── Default colors and sizes ──
const DEFAULT_SIZES = ['S', 'M', 'L', 'XL'];
const DEFAULT_COLORS = [
  { hex: '#6B7280', label: 'Grey'  },
  { hex: '#111827', label: 'Black' },
  { hex: '#2563EB', label: 'Blue'  },
];

// ── Enriches product data with defaults if missing ──
const enrichProductData = (product) => {
  if (!product) return null;
  return {
    ...product,
    sizes:   product.sizes ?? DEFAULT_SIZES,
    colors:  product.colors ?? DEFAULT_COLORS,
    images:  product.images ?? null,
    rating:  product.rating ?? 0,
    reviewCount: product.reviewCount ?? 0,
  };
};

// ── Mock product — fallback if no route.params ──
const MOCK_PRODUCT = {
  id:          'p1',
  name:        'Jacket logo print',
  rating:      5.0,
  reviewCount: 7932,
  price:       212.99,
  description: 'Its simple and elegant print makes it perfect for those of you who like you who want minimalist clothes and a modern touch that makes you look more attractive and charming every day.',
  sizes:       DEFAULT_SIZES,
  colors:      DEFAULT_COLORS,
  images:      ['https://via.placeholder.com/300x400?text=Jacket'],
  category:    'Jackets',
};

// ── Related products (would come from API in real app) ──
const RELATED_PRODUCTS = [
  {
    id:          'r1',
    name:        'logo print',
    category:    'Dress modern',
    price:       162.99,
    rating:      5.0,
    image:       null,
    wishlist:    false,
    sizes:       DEFAULT_SIZES,
    colors:      [{ hex: '#6B7280', label: 'Grey' }, { hex: '#111827', label: 'Black' }],
    images:      null,
    reviewCount: 500,
    description: 'Modern dress print',
  },
  {
    id:          'r2',
    name:        'Patch print',
    category:    'Dress',
    price:       194.99,
    rating:      5.0,
    image:       null,
    wishlist:    false,
    sizes:       DEFAULT_SIZES,
    colors:      [{ hex: '#6B7280', label: 'Grey' }],
    images:      null,
    reviewCount: 250,
    description: 'Patch style dress',
  },
  {
    id:          'r3',
    name:        'Stroke print',
    category:    'Dress Modern',
    price:       122.99,
    rating:      5.0,
    image:       null,
    wishlist:    false,
    sizes:       DEFAULT_SIZES,
    colors:      [{ hex: '#6B7280', label: 'Grey' }],
    images:      null,
    reviewCount: 300,
    description: 'Stroke style print',
  },
];

function ProductDetailScreen({ route, navigation }) {
  // FIX 6: Use route.params.product if available, else fallback
  // Also enriches with default colors/sizes if missing
  const product = useMemo(
    () => enrichProductData(route?.params?.product ?? MOCK_PRODUCT),
    [route?.params?.product],
  );

  const {
    selectedSize,     setSelectedSize,
    selectedColorIdx, setSelectedColorIdx,
    quantity,         incrementQty, decrementQty,
    activeColor,
    deliveryOption,   setDeliveryOption,
    uploadedLogo,     setUploadedLogo,
    logoPosition,     setLogoPosition,
    descExpanded,     setDescExpanded,
    isWishlisted,     toggleWishlist,
    handleAddToCart,  handleBuyNow,
  } = useProductDetail(product);

  const handleBack = useCallback(() => {
    navigation?.goBack();
  }, [navigation]);

  // FIX 5: RelatedProducts now receives navigation for pushing new detail screens
  const handleRelatedWishlistToggle = useCallback((productId) => {
    console.log('Toggle wishlist for related product:', productId);
    // In real app: dispatch(toggleWishlist(productId)) to Redux
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* FIX 1+2+3: Image height fixed + color tint on Image prop + heart state works */}
        <ProductImageCarousel
          images={product.images}
          activeColor={activeColor}
          baseColor={product.colors[0].hex}
          isWishlisted={isWishlisted}
          onBack={handleBack}
          onWishlistToggle={toggleWishlist}
        />

        <ProductInfo
          product={product}
          descExpanded={descExpanded}
          onToggleDesc={() => setDescExpanded(v => !v)}
        />

        <SizeColorQuantity
          sizes={product.sizes}
          selectedSize={selectedSize}
          onSizeChange={setSelectedSize}
          colors={product.colors}
          selectedColorIdx={selectedColorIdx}
          onColorChange={setSelectedColorIdx}
          quantity={quantity}
          onIncrement={incrementQty}
          onDecrement={decrementQty}
        />

        {/* FIX 4: Real image picker + custom modal */}
        <DeliveryOptions
          deliveryOption={deliveryOption}
          setDeliveryOption={setDeliveryOption}
          uploadedLogo={uploadedLogo}
          setUploadedLogo={setUploadedLogo}
          logoPosition={logoPosition}
          setLogoPosition={setLogoPosition}
        />

        <ReviewsSection reviews={[]} />

        {/* FIX 5: Reusable RelatedProducts with navigation wired */}
        <RelatedProducts
          products={RELATED_PRODUCTS}
          navigation={navigation}
          onWishlistToggle={handleRelatedWishlistToggle}
        />
      </ScrollView>

      <BottomActionBar
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex:            1,
    backgroundColor: COLORS.white,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
});

export default ProductDetailScreen;