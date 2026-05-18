// ─────────────────────────────────────────────
//  RelatedProducts
//  Horizontal scroll of related product cards
// ─────────────────────────────────────────────

import React, { memo } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { COLORS, FONT_SIZE, SPACING, RADIUS } from '../../../constants/theme';

const CARD_W = Dimensions.get('window').width * 0.38;

function RelatedCard({ item, onPress }) {
    return (
        <TouchableOpacity style={styles.card} onPress={() => onPress(item)} activeOpacity={0.85}>
            {/* Image */}
            <View style={styles.imageWrapper}>
                {item.image ? (
                    <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
                ) : (
                    <View style={styles.imagePlaceholder}>
                        <Text style={styles.placeholderIcon}>👕</Text>
                    </View>
                )}
                {/* Wishlist dot */}
                <View style={styles.wishDot}>
                    <Text style={styles.wishIcon}>{item.wishlist ? '♥' : '♡'}</Text>
                </View>
            </View>

            {/* Info */}
            <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.category} numberOfLines={1}>{item.category}</Text>
            <View style={styles.priceRow}>
                <Text style={styles.price}>${item.price?.toFixed(2)}</Text>
                <View style={styles.ratingBadge}>
                    <Text style={styles.star}>★</Text>
                    <Text style={styles.rating}>{item.rating?.toFixed(1)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

function RelatedProducts({ products = [], onProductPress }) {
    if (!products.length) return null;

    return (
        <View style={styles.section}>
            <Text style={styles.title}>Related products</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scroll}
            >
                {products.map(item => (
                    <RelatedCard key={item.id} item={item} onPress={onProductPress} />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        paddingTop: SPACING.xl,
        paddingBottom: SPACING.xxxl,
    },
    title: {
        fontSize: FONT_SIZE.xl,
        fontWeight: '700',
        color: COLORS.text.primary,
        paddingHorizontal: SPACING.lg,
        marginBottom: SPACING.md,
    },
    scroll: {
        paddingHorizontal: SPACING.lg,
        gap: SPACING.md,
    },
    card: {
        width: CARD_W,
    },
    imageWrapper: {
        width: CARD_W,
        height: CARD_W,
        borderRadius: RADIUS.lg,
        overflow: 'hidden',
        backgroundColor: COLORS.background,
        marginBottom: SPACING.sm,
    },
    image: {
        width: '100%', height: '100%',
    },
    imagePlaceholder: {
        flex: 1, alignItems: 'center', justifyContent: 'center',
    },
    placeholderIcon: {
        fontSize: 36,
    },
    wishDot: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wishIcon: {
        fontSize: 12,
        color: COLORS.white,
    },
    name: {
        fontSize: FONT_SIZE.sm,
        fontWeight: '700',
        color: COLORS.text.primary,
    },
    category: {
        fontSize: FONT_SIZE.xs,
        color: COLORS.text.secondary,
        marginTop: 2,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: SPACING.xs,
    },
    price: {
        fontSize: FONT_SIZE.sm,
        fontWeight: '700',
        color: COLORS.text.primary,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    star: {
        fontSize: FONT_SIZE.xs,
        color: COLORS.star,
    },
    rating: {
        fontSize: FONT_SIZE.xs,
        fontWeight: '600',
        color: COLORS.text.secondary,
    },
});

export default memo(RelatedProducts);