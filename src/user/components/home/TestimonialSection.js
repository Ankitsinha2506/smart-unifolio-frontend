// ─────────────────────────────────────────────
//  TestimonialSection
//  Horizontal scroll row of testimonial cards
//  shown below the product grid
// ─────────────────────────────────────────────

import React, { memo } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { COLORS, FONT_SIZE, SPACING, RADIUS } from '../../../constants/theme';

const CARD_WIDTH = Dimensions.get('window').width * 0.38;

// ── Single testimonial card ─────────────────
function TestimonialCard({ item, onPress }) {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => onPress?.(item)}
            activeOpacity={0.85}
        >
            {/* Image */}
            <View style={styles.imageWrapper}>
                {item.image ? (
                    <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                ) : (
                    <View style={styles.imagePlaceholder}>
                        <Text style={styles.placeholderIcon}>🧢</Text>
                    </View>
                )}
            </View>

            {/* Title + subtitle */}
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.subtitle} numberOfLines={1}>{item.subtitle}</Text>
        </TouchableOpacity>
    );
}

// ── Testimonial section with heading ───────
function TestimonialSection({ testimonials, onPress }) {
    if (!testimonials?.length) return null;

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Testimonials</Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {testimonials.map(item => (
                    <TestimonialCard key={item.id} item={item} onPress={onPress} />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        paddingTop: SPACING.xxl,
        paddingBottom: SPACING.xxxl,
    },
    sectionTitle: {
        fontSize: FONT_SIZE.xl,
        fontWeight: '700',
        color: COLORS.text.primary,
        marginBottom: SPACING.md,
        paddingHorizontal: SPACING.lg,
    },
    scrollContent: {
        paddingHorizontal: SPACING.lg,
        gap: SPACING.md,
    },

    // ── Card ──────────────────────────────────
    card: {
        width: CARD_WIDTH,
    },
    imageWrapper: {
        width: CARD_WIDTH,
        height: CARD_WIDTH,
        borderRadius: RADIUS.md,
        overflow: 'hidden',
        marginBottom: SPACING.sm,
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
        backgroundColor: '#E5E7EB',
    },
    placeholderIcon: {
        fontSize: 32,
    },
    title: {
        fontSize: FONT_SIZE.sm,
        fontWeight: '600',
        color: COLORS.text.primary,
    },
    subtitle: {
        fontSize: FONT_SIZE.xs,
        color: COLORS.text.secondary,
        marginTop: 2,
    },
});

export default memo(TestimonialSection);