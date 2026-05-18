// ─────────────────────────────────────────────
//  BottomActionBar
//  Fixed bottom bar with Add to Cart + Buy Now
// ─────────────────────────────────────────────

import React, { memo } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Platform,
} from 'react-native';
import { COLORS, FONT_SIZE, SPACING, RADIUS } from '../../../constants/theme';

function BottomActionBar({ onAddToCart, onBuyNow }) {
    return (
        <View style={styles.container}>
            {/* Add to Cart — outlined */}
            <TouchableOpacity
                style={styles.cartBtn}
                onPress={onAddToCart}
                activeOpacity={0.8}
            >
                <Text style={styles.cartIcon}>🛒</Text>
                <Text style={styles.cartText}>Add to Cart</Text>
            </TouchableOpacity>

            {/* Buy Now — filled */}
            <TouchableOpacity
                style={styles.buyBtn}
                onPress={onBuyNow}
                activeOpacity={0.8}
            >
                <Text style={styles.buyIcon}>🛍</Text>
                <Text style={styles.buyText}>Buy now</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.md,
        paddingBottom: Platform.OS === 'ios' ? 28 : SPACING.lg,
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        gap: SPACING.md,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 10,
    },

    // ── Add to Cart ───────────────────────────────
    cartBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.sm,
        height: 50,
        borderRadius: RADIUS.full,
        borderWidth: 1.5,
        borderColor: COLORS.primary,
        backgroundColor: COLORS.white,
    },
    cartIcon: {
        fontSize: 16,
    },
    cartText: {
        fontSize: FONT_SIZE.md,
        fontWeight: '700',
        color: COLORS.primary,
    },

    // ── Buy Now ───────────────────────────────────
    buyBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.sm,
        height: 50,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.primary,
    },
    buyIcon: {
        fontSize: 16,
    },
    buyText: {
        fontSize: FONT_SIZE.md,
        fontWeight: '700',
        color: COLORS.white,
    },
});

export default memo(BottomActionBar);