// ─────────────────────────────────────────────
//  ProductImageCarousel
//  Shows product image with a color tint overlay
//  when user picks a different color.
//  Back button + Wishlist button on top corners.
// ─────────────────────────────────────────────

import React, { useState } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
} from 'react-native';
import { COLORS, RADIUS } from '../../../constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_HEIGHT = SCREEN_WIDTH * 0.9;

function ProductImageCarousel({
    images,        // array of image URIs
    activeColor,   // hex string of selected color e.g. '#FF0000'
    baseColor,     // hex string of original product color
    isWishlisted,
    onBack,
    onWishlistToggle,
}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleScroll = (e) => {
        const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
        setCurrentIndex(idx);
    };

    // ── Color tint logic ─────────────────────────────────
    // We overlay a semi-transparent layer of the selected color
    // on top of the product image using blendMode + opacity.
    // When activeColor === baseColor (original), overlay is hidden.
    const showTint = activeColor && baseColor && activeColor !== baseColor;
    const tintOpacity = showTint ? 0.45 : 0;

    return (
        <View style={styles.container}>
            {/* ── Image scroll area ── */}
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                style={styles.scrollView}
            >
                {(images && images.length > 0 ? images : [null]).map((uri, idx) => (
                    <View key={idx} style={styles.imageWrapper}>
                        {/* Base product image */}
                        {uri ? (
                            <Image
                                source={{ uri }}
                                style={styles.image}
                                resizeMode="contain"
                            />
                        ) : (
                            // Placeholder when no real image
                            <View style={styles.placeholder}>
                                <Text style={styles.placeholderIcon}>👕</Text>
                            </View>
                        )}

                        {/* ── Color tint overlay ──────────────────────────
                Sits on top of the image. When user picks a
                color different from the base, this layer
                blends the selected color into the product.
                MIX_BLEND_MODE 'multiply' darkens/tints the image
                naturally (works best on light-bg product images).
            ─────────────────────────────────────────────────── */}
                        {showTint && (
                            <View
                                style={[
                                    styles.colorOverlay,
                                    {
                                        backgroundColor: activeColor,
                                        opacity: tintOpacity,
                                    },
                                ]}
                            />
                        )}
                    </View>
                ))}
            </ScrollView>

            {/* ── Dot indicators ── */}
            {images && images.length > 1 && (
                <View style={styles.dots}>
                    {images.map((_, i) => (
                        <View
                            key={i}
                            style={[styles.dot, i === currentIndex && styles.dotActive]}
                        />
                    ))}
                </View>
            )}

            {/* ── Back button ── */}
            <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.8}>
                <Text style={styles.backIcon}>‹</Text>
            </TouchableOpacity>

            {/* ── Wishlist button ── */}
            <TouchableOpacity style={styles.wishlistBtn} onPress={onWishlistToggle} activeOpacity={0.8}>
                <Text style={[styles.heartIcon, isWishlisted && styles.heartActive]}>
                    {isWishlisted ? '♥' : '♡'}
                </Text>
            </TouchableOpacity>

            {/* ── Right arrow hint (if multiple images) ── */}
            {images && images.length > 1 && currentIndex < images.length - 1 && (
                <View style={styles.arrowRight}>
                    <Text style={styles.arrowText}>›</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        height: IMAGE_HEIGHT,
    },
    scrollView: {
        flex: 1,
    },
    imageWrapper: {
        width: SCREEN_WIDTH,
        height: IMAGE_HEIGHT,
        backgroundColor: '#F3F4F6',
        borderBottomLeftRadius: RADIUS.xl,
        borderBottomRightRadius: RADIUS.xl,
        overflow: 'hidden',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    placeholder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F3F4F6',
    },
    placeholderIcon: {
        fontSize: 80,
    },

    // ── Color tint overlay ────────────────────────
    colorOverlay: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        // 'multiply' blend makes this look natural on product images
        // React Native supports this on iOS; Android uses opacity fallback
        mixBlendMode: 'multiply',
    },

    // ── Dots ─────────────────────────────────────
    dots: {
        position: 'absolute',
        bottom: 12,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    dotActive: {
        backgroundColor: COLORS.primary,
        width: 16,
    },

    // ── Back btn ──────────────────────────────────
    backBtn: {
        position: 'absolute',
        top: 16,
        left: 16,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    backIcon: {
        fontSize: 24,
        color: COLORS.text.primary,
        lineHeight: 28,
    },

    // ── Wishlist btn ──────────────────────────────
    wishlistBtn: {
        position: 'absolute',
        top: 16,
        right: 16,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    heartIcon: {
        fontSize: 18,
        color: COLORS.text.muted,
    },
    heartActive: {
        color: '#EF4444',
    },

    // ── Arrow ─────────────────────────────────────
    arrowRight: {
        position: 'absolute',
        right: 12,
        top: '50%',
        marginTop: -18,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.85)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrowText: {
        fontSize: 24,
        color: COLORS.text.primary,
        lineHeight: 28,
    },
});

export default ProductImageCarousel;