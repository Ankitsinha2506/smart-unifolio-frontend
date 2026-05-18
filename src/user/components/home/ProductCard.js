// ─────────────────────────────────────────────
//  ProductCard
//  Single product card — image, wishlist toggle,
//  name, description, rating, colors, price
// ─────────────────────────────────────────────

import React, { memo } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { COLORS, FONT_SIZE, SPACING, RADIUS } from '../../../constants/theme';

function ColorDot({ color }) {
    return <View style={[styles.colorDot, { backgroundColor: color }]} />;
}

function StarRating({ rating }) {
    return (
        <View style={styles.ratingRow}>
            <Text style={styles.starIcon}>★</Text>
            <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
        </View>
    );
}

function ProductCard({ item, onPress, onWishlistToggle }) {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => onPress?.(item)}
            activeOpacity={0.92}
        >
            {/* Product image area */}
            <View style={styles.imageContainer}>
                {item.image ? (
                    <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                ) : (
                    /* Placeholder when no image */
                    <View style={styles.imagePlaceholder}>
                        <Text style={styles.imagePlaceholderIcon}>👕</Text>
                    </View>
                )}

                {/* Wishlist heart button */}
                <TouchableOpacity
                    style={styles.wishlistBtn}
                    onPress={() => onWishlistToggle?.(item.id)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    activeOpacity={0.7}
                >
                    <Text style={[styles.heartIcon, item.wishlist && styles.heartActive]}>
                        {item.wishlist ? '♥' : '♡'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Product info */}
            <View style={styles.info}>
                {/* Name + rating on same row */}
                <View style={styles.nameRow}>
                    <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                    <StarRating rating={item.rating} />
                </View>

                {/* Description */}
                <Text style={styles.description} numberOfLines={2}>
                    {item.description}
                </Text>

                {/* Price + color dots */}
                <View style={styles.bottomRow}>
                    <Text style={styles.price}>₹{item.price.toFixed(2)}</Text>
                    <View style={styles.colorsRow}>
                        {item.colors.map((color, idx) => (
                            <ColorDot key={idx} color={color} />
                        ))}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: COLORS.card,
        borderRadius: RADIUS.lg,
        overflow: 'hidden',
        // subtle shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 3,
    },

    // ── Image ──────────────────────────────────
    imageContainer: {
        width: '100%',
        aspectRatio: 1,         // square crop
        backgroundColor: COLORS.background,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imagePlaceholder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F3F4F6',
    },
    imagePlaceholderIcon: {
        fontSize: 48,
    },

    // ── Wishlist ───────────────────────────────
    wishlistBtn: {
        position: 'absolute',
        top: SPACING.sm,
        right: SPACING.sm,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    heartIcon: {
        fontSize: 16,
        color: COLORS.text.muted,
    },
    heartActive: {
        color: '#EF4444',
    },

    // ── Info ───────────────────────────────────
    info: {
        padding: SPACING.md,
        gap: SPACING.xs,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: SPACING.xs,
    },
    name: {
        flex: 1,
        fontSize: FONT_SIZE.sm,
        fontWeight: '700',
        color: COLORS.text.primary,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    starIcon: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.star,
    },
    ratingText: {
        fontSize: FONT_SIZE.xs,
        color: COLORS.text.secondary,
        fontWeight: '600',
    },
    description: {
        fontSize: FONT_SIZE.xs,
        color: COLORS.text.secondary,
        lineHeight: 16,
    },
    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: SPACING.xs,
    },
    price: {
        fontSize: FONT_SIZE.md,
        fontWeight: '700',
        color: COLORS.text.primary,
    },
    colorsRow: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
    },
    colorDot: {
        width: 14,
        height: 14,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.08)',
    },
});

// memo — prevents re-render when parent re-renders but this item hasn't changed
export default memo(ProductCard);