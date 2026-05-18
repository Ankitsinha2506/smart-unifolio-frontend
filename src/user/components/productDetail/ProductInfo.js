// ─────────────────────────────────────────────
//  ProductInfo
//  Name, star rating, review count, price,
//  description with "Read more" toggle
// ─────────────────────────────────────────────

import React, { memo } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { COLORS, FONT_SIZE, SPACING } from '../../../constants/theme';

const MAX_LINES = 3;

function ProductInfo({ product, descExpanded, onToggleDesc }) {
    return (
        <View style={styles.container}>
            {/* ── Name + rating row ── */}
            <View style={styles.nameRow}>
                <Text style={styles.name}>{product.name}</Text>
                <View style={styles.ratingBadge}>
                    <Text style={styles.star}>★</Text>
                    <Text style={styles.ratingValue}>{product.rating?.toFixed(1)}</Text>
                </View>
            </View>

            {/* ── Review count ── */}
            <Text style={styles.reviews}>
                ({product.reviewCount?.toLocaleString() ?? 0} reviews)
            </Text>

            {/* ── Price ── */}
            <Text style={styles.price}>₹{product.price?.toFixed(2)}</Text>

            {/* ── Description ── */}
            <View style={styles.descRow}>
                <Text
                    style={styles.desc}
                    numberOfLines={descExpanded ? undefined : MAX_LINES}
                >
                    {product.description}
                    {!descExpanded && (
                        <Text
                            style={styles.readMore}
                            onPress={onToggleDesc}
                        >
                            {' '}Read more. . .
                        </Text>
                    )}
                </Text>
                {descExpanded && (
                    <TouchableOpacity onPress={onToggleDesc}>
                        <Text style={styles.readMore}>Show less</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.md,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: SPACING.sm,
    },
    name: {
        flex: 1,
        fontSize: FONT_SIZE.xxl,
        fontWeight: '700',
        color: COLORS.text.primary,
        lineHeight: 28,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        backgroundColor: '#FEF3C7',
        paddingHorizontal: SPACING.sm,
        paddingVertical: 3,
        borderRadius: 20,
        marginTop: 4,
    },
    star: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.star,
    },
    ratingValue: {
        fontSize: FONT_SIZE.sm,
        fontWeight: '700',
        color: '#92400E',
    },
    reviews: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.accent,
        marginTop: 2,
        fontWeight: '500',
    },
    price: {
        fontSize: FONT_SIZE.xxxl,
        fontWeight: '700',
        color: COLORS.text.primary,
        marginTop: SPACING.xs,
    },
    descRow: {
        marginTop: SPACING.sm,
    },
    desc: {
        fontSize: FONT_SIZE.md,
        color: COLORS.text.secondary,
        lineHeight: 22,
    },
    readMore: {
        fontSize: FONT_SIZE.md,
        fontWeight: '700',
        color: COLORS.text.primary,
    },
});

export default memo(ProductInfo);