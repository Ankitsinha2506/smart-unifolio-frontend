// ─────────────────────────────────────────────
//  SizeColorQuantity
//  Three inline sections:
//    Choose Size → Color → Quantity
//
//  COLOR TINT LOGIC:
//  Each product color has { hex, label }.
//  When user taps a color, selectedColorIdx changes
//  which updates activeColor in the hook, which
//  is passed to ProductImageCarousel as a tint
//  overlay on the product image.
// ─────────────────────────────────────────────

import React, { memo } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { COLORS, FONT_SIZE, SPACING, RADIUS } from '../../../constants/theme';

// ── Size pill ──────────────────────────────────
function SizePill({ size, isActive, onPress }) {
    return (
        <TouchableOpacity
            style={[styles.sizePill, isActive && styles.sizePillActive]}
            onPress={() => onPress(size)}
            activeOpacity={0.75}
        >
            <Text style={[styles.sizeText, isActive && styles.sizeTextActive]}>
                {size}
            </Text>
        </TouchableOpacity>
    );
}

// ── Color circle ───────────────────────────────
function ColorCircle({ color, isActive, onPress }) {
    return (
        <TouchableOpacity
            onPress={() => onPress()}
            activeOpacity={0.8}
            style={[
                styles.colorCircle,
                { backgroundColor: color.hex },
                isActive && styles.colorCircleActive,
            ]}
        >
            {isActive && <View style={styles.colorCheckmark} />}
        </TouchableOpacity>
    );
}

// ── Main component ─────────────────────────────
function SizeColorQuantity({
    sizes,
    selectedSize,
    onSizeChange,
    colors,
    selectedColorIdx,
    onColorChange,
    quantity,
    onIncrement,
    onDecrement,
}) {
    return (
        <View style={styles.container}>
            {/* ── Row: Size | Color | Quantity labels ── */}
            <View style={styles.row}>
                {/* Size */}
                <View style={styles.col}>
                    <Text style={styles.colLabel}>Choose Size</Text>
                    <View style={styles.sizeRow}>
                        {sizes.map(s => (
                            <SizePill
                                key={s}
                                size={s}
                                isActive={s === selectedSize}
                                onPress={onSizeChange}
                            />
                        ))}
                    </View>
                </View>

                {/* Color */}
                <View style={styles.col}>
                    <Text style={styles.colLabel}>Color</Text>
                    <View style={styles.colorRow}>
                        {colors.map((c, idx) => (
                            <ColorCircle
                                key={idx}
                                color={c}
                                isActive={idx === selectedColorIdx}
                                onPress={() => onColorChange(idx)}
                            />
                        ))}
                    </View>
                </View>

                {/* Quantity */}
                <View style={styles.col}>
                    <Text style={styles.colLabel}>Quantity</Text>
                    <View style={styles.qtyRow}>
                        <TouchableOpacity
                            style={styles.qtyBtn}
                            onPress={onDecrement}
                            activeOpacity={0.75}
                        >
                            <Text style={styles.qtyBtnText}>−</Text>
                        </TouchableOpacity>

                        <Text style={styles.qtyValue}>{quantity}</Text>

                        <TouchableOpacity
                            style={styles.qtyBtn}
                            onPress={onIncrement}
                            activeOpacity={0.75}
                        >
                            <Text style={styles.qtyBtnText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        marginTop: SPACING.md,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: SPACING.md,
    },
    col: {
        flex: 1,
        gap: SPACING.sm,
    },
    colLabel: {
        fontSize: FONT_SIZE.sm,
        fontWeight: '600',
        color: COLORS.text.primary,
    },

    // ── Sizes ────────────────────────────────────
    sizeRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    sizePill: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sizePillActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    sizeText: {
        fontSize: FONT_SIZE.xs,
        fontWeight: '600',
        color: COLORS.text.secondary,
    },
    sizeTextActive: {
        color: COLORS.white,
    },

    // ── Colors ───────────────────────────────────
    colorRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        alignItems: 'center',
    },
    colorCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    colorCircleActive: {
        borderWidth: 2.5,
        borderColor: COLORS.primary,
    },
    colorCheckmark: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.9)',
    },

    // ── Quantity ─────────────────────────────────
    qtyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
    },
    qtyBtn: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    qtyBtnText: {
        fontSize: FONT_SIZE.lg,
        color: COLORS.text.primary,
        lineHeight: 22,
    },
    qtyValue: {
        fontSize: FONT_SIZE.md,
        fontWeight: '700',
        color: COLORS.text.primary,
        minWidth: 20,
        textAlign: 'center',
    },
});

export default memo(SizeColorQuantity);