// ─────────────────────────────────────────────
//  ReviewsSection
//  Section title + placeholder for reviews list
//  (wire to real reviews API later)
// ─────────────────────────────────────────────

import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZE, SPACING } from '../../../constants/theme';

function ReviewsSection({ reviews = [] }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reviews</Text>
            {reviews.length === 0 ? (
                <Text style={styles.empty}>No reviews yet.</Text>
            ) : (
                reviews.map((r, i) => (
                    <View key={i} style={styles.reviewCard}>
                        <Text style={styles.reviewer}>{r.name}</Text>
                        <Text style={styles.reviewText}>{r.comment}</Text>
                    </View>
                ))
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.xl,
    },
    title: {
        fontSize: FONT_SIZE.lg,
        fontWeight: '600',
        color: COLORS.text.secondary,
        marginBottom: SPACING.sm,
    },
    empty: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.text.muted,
    },
    reviewCard: {
        paddingVertical: SPACING.sm,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    reviewer: {
        fontSize: FONT_SIZE.sm,
        fontWeight: '600',
        color: COLORS.text.primary,
    },
    reviewText: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.text.secondary,
        marginTop: 2,
    },
});

export default memo(ReviewsSection);