// ─────────────────────────────────────────────
//  ProductDetailScreen
//  Pure UI — assembles all product detail
//  components. All logic lives in useProductDetail.
//
//  COLOR TINT FLOW:
//  1. User taps a color circle in SizeColorQuantity
//  2. onColorChange(idx) → setSelectedColorIdx(idx)
//  3. activeColor = product.colors[idx].hex
//  4. activeColor passed to ProductImageCarousel
//  5. Carousel renders a tinted overlay on the image
//     using the new hex color → product appears recolored
// ─────────────────────────────────────────────

import React, { useCallback } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    StatusBar,
} from 'react-native';

// ── Hook ──────────────────────────────────────
import { useProductDetail } from '../hooks/useProductDetail';

// ── Components ────────────────────────────────
import ProductImageCarousel from '../components/productDetail/ProductImageCarousel';
import ProductInfo from '../components/productDetail/ProductInfo';
import SizeColorQuantity from '../components/productDetail/SizeColorQuantity';
import DeliveryOptions from '../components/productDetail/DeliveryOptions';
import ReviewsSection from '../components/productDetail/ReviewsSection';
import RelatedProducts from '../components/productDetail/RelatedProducts';
import BottomActionBar from '../components/productDetail/BottomActionBar';

// ── Constants ─────────────────────────────────
import { COLORS } from '../../constants/theme';

// ── Mock product data (replace with route.params or API) ──
// COLOR TINT LOGIC:
// Each color has { hex, label }.
// hex is used as a CSS-style tint overlay on the product image.
// The base color (colors[0]) = original image — no tint applied.
// Tapping any other color applies that hex as a multiply-blend overlay.
const MOCK_PRODUCT = {
    id: 'p1',
    name: 'Jacket logo print',
    rating: 5.0,
    reviewCount: 7932,
    price: 212.99,
    description: 'Its simple and elegant print makes it perfect for those of you who like you who want minimalist clothes and a modern touch that makes you look more attractive and charming every day.',
    sizes: ['S', 'M', 'L', 'XL'],
    // ── Colors: first entry = original product color (no tint)
    colors: [
        { hex: '#6B7280', label: 'Grey' },   // base — original image color
        { hex: '#111827', label: 'Black' },
        { hex: '#2563EB', label: 'Blue' },
    ],
    images: [null],   // replace with real image URIs: ['https://...', 'https://...']
    category: 'Jackets',
};

const RELATED_PRODUCTS = [
    { id: 'r1', name: 'logo print', category: 'Dress modern', price: 162.99, rating: 5.0, image: null, wishlist: true },
    { id: 'r2', name: 'Patch print', category: 'Dress', price: 194.99, rating: 5.0, image: null, wishlist: false },
    { id: 'r3', name: 'Stroke print', category: 'Dress Modern', price: 122.99, rating: 5.0, image: null, wishlist: false },
];

// ─────────────────────────────────────────────
function ProductDetailScreen({ route, navigation }) {
    // In real app: const product = route?.params?.product ?? MOCK_PRODUCT;
    const product = MOCK_PRODUCT;

    const {
        selectedSize, setSelectedSize,
        selectedColorIdx, setSelectedColorIdx,
        quantity, incrementQty, decrementQty,
        activeColor,
        deliveryOption, setDeliveryOption,
        uploadedLogo, setUploadedLogo,
        logoPosition, setLogoPosition,
        descExpanded, setDescExpanded,
        isWishlisted, toggleWishlist,
        handleAddToCart, handleBuyNow,
    } = useProductDetail(product);

    const handleRelatedPress = useCallback((item) => {
        // navigation.push('ProductDetail', { product: item });
        console.log('Related product pressed:', item.id);
    }, []);

    const handleBack = useCallback(() => {
        navigation?.goBack();
    }, [navigation]);

    return (
        <View style={styles.root}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            {/* ── Scrollable content ── */}
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                bounces={true}
            >
                {/* 1. Product image with color tint overlay */}
                <ProductImageCarousel
                    images={product.images}
                    activeColor={activeColor}
                    baseColor={product.colors[0].hex}
                    isWishlisted={isWishlisted}
                    onBack={handleBack}
                    onWishlistToggle={toggleWishlist}
                />

                {/* 2. Name, rating, price, description */}
                <ProductInfo
                    product={product}
                    descExpanded={descExpanded}
                    onToggleDesc={() => setDescExpanded(v => !v)}
                />

                {/* 3. Size / Color / Quantity selectors */}
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

                {/* 4. Delivery options + logo upload */}
                <DeliveryOptions
                    deliveryOption={deliveryOption}
                    setDeliveryOption={setDeliveryOption}
                    uploadedLogo={uploadedLogo}
                    setUploadedLogo={setUploadedLogo}
                    logoPosition={logoPosition}
                    setLogoPosition={setLogoPosition}
                />

                {/* 5. Reviews */}
                <ReviewsSection reviews={[]} />

                {/* 6. Related products */}
                <RelatedProducts
                    products={RELATED_PRODUCTS}
                    onProductPress={handleRelatedPress}
                />
            </ScrollView>

            {/* ── Fixed bottom: Add to Cart + Buy Now ── */}
            <BottomActionBar
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
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