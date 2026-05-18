// ─────────────────────────────────────────────
//  DeliveryOptions
//  Two selectable cards:
//    1. Deliver without customization
//    2. Deliver with customization (logo upload +
//       position picker)
// ─────────────────────────────────────────────

import React, { memo } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import { COLORS, FONT_SIZE, SPACING, RADIUS } from '../../../constants/theme';

const LOGO_POSITIONS = [
    'Left Chest',
    'Right Chest',
    'Center Chest',
    'Left Sleeve',
    'Right Sleeve',
    'Back Center',
    'Back Top',
];

// ── Option card ───────────────────────────────
function OptionCard({ isActive, onPress, title, subtitle }) {
    return (
        <TouchableOpacity
            style={[styles.card, isActive && styles.cardActive]}
            onPress={onPress}
            activeOpacity={0.85}
        >
            <View style={styles.bullet}>
                <Text style={styles.bulletDot}>•</Text>
            </View>
            <View style={styles.cardText}>
                <Text style={[styles.cardTitle, isActive && styles.cardTitleActive]}>
                    {title}
                </Text>
                <Text style={styles.cardSubtitle}>{subtitle}</Text>
            </View>
        </TouchableOpacity>
    );
}

// ── Custom upload row ─────────────────────────
function CustomUploadRow({ logoPosition, setLogoPosition, uploadedLogo, setUploadedLogo }) {
    const handleUpload = () => {
        // In real app: use react-native-image-picker
        // import { launchImageLibrary } from 'react-native-image-picker';
        // launchImageLibrary({ mediaType: 'photo' }, (res) => {
        //   if (res.assets?.[0]) setUploadedLogo(res.assets[0].uri);
        // });
        Alert.alert(
            'Upload Logo',
            'Install react-native-image-picker and wire launchImageLibrary here.',
        );
    };

    const handlePositionPick = () => {
        Alert.alert(
            'Position of logo / design',
            'Choose placement',
            LOGO_POSITIONS.map(pos => ({
                text: pos,
                onPress: () => setLogoPosition(pos),
            })).concat([{ text: 'Cancel', style: 'cancel' }]),
        );
    };

    return (
        <View style={styles.uploadRow}>
            {/* Upload box */}
            <TouchableOpacity style={styles.uploadBox} onPress={handleUpload} activeOpacity={0.8}>
                <Text style={styles.uploadIcon}>↑</Text>
                <Text style={styles.uploadLabel}>Upload logo/ design</Text>
                <Text style={styles.uploadMeta}>Max size 5 mb</Text>
            </TouchableOpacity>

            {/* Position picker */}
            <View style={styles.positionCol}>
                <Text style={styles.positionLabel}>Position of logo/ design</Text>
                <TouchableOpacity style={styles.positionPicker} onPress={handlePositionPick} activeOpacity={0.8}>
                    <Text style={[styles.positionValue, !logoPosition && styles.positionPlaceholder]}>
                        {logoPosition || 'Choose the position'}
                    </Text>
                    <Text style={styles.chevron}>⌄</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.referenceLink}>See the reference position images  ›</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// ── Main component ─────────────────────────────
function DeliveryOptions({
    deliveryOption,
    setDeliveryOption,
    uploadedLogo,
    setUploadedLogo,
    logoPosition,
    setLogoPosition,
}) {
    return (
        <View style={styles.container}>
            <OptionCard
                isActive={deliveryOption === 'plain'}
                onPress={() => setDeliveryOption('plain')}
                title="Deliver Jacket without customizing it."
                subtitle="This product will be delivered to you address without customizing. (With same logo/design shown in image)."
            />

            <OptionCard
                isActive={deliveryOption === 'custom'}
                onPress={() => setDeliveryOption('custom')}
                title="Deliver Jacket with customization."
                subtitle="This product will be delivered to you address with customizing it with the design you upload with is position on product."
            />

            {/* Show upload/position UI only when custom is selected */}
            {deliveryOption === 'custom' && (
                <CustomUploadRow
                    logoPosition={logoPosition}
                    setLogoPosition={setLogoPosition}
                    uploadedLogo={uploadedLogo}
                    setUploadedLogo={setUploadedLogo}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SPACING.lg,
        gap: SPACING.md,
        marginTop: SPACING.md,
    },

    // ── Cards ────────────────────────────────────
    card: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.md,
        padding: SPACING.md,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        gap: SPACING.sm,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 1,
    },
    cardActive: {
        borderColor: COLORS.primary,
    },
    bullet: {
        paddingTop: 1,
    },
    bulletDot: {
        fontSize: FONT_SIZE.lg,
        color: COLORS.text.primary,
        fontWeight: '700',
    },
    cardText: {
        flex: 1,
    },
    cardTitle: {
        fontSize: FONT_SIZE.sm,
        fontWeight: '700',
        color: COLORS.text.primary,
        lineHeight: 18,
    },
    cardTitleActive: {
        color: COLORS.primary,
    },
    cardSubtitle: {
        fontSize: FONT_SIZE.xs,
        color: COLORS.text.secondary,
        marginTop: 4,
        lineHeight: 16,
        fontStyle: 'italic',
    },

    // ── Upload row ───────────────────────────────
    uploadRow: {
        flexDirection: 'row',
        gap: SPACING.md,
        marginTop: SPACING.xs,
    },
    uploadBox: {
        flex: 0.9,
        aspectRatio: 1,
        backgroundColor: COLORS.background,
        borderRadius: RADIUS.md,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    uploadIcon: {
        fontSize: 28,
        color: COLORS.text.muted,
    },
    uploadLabel: {
        fontSize: FONT_SIZE.xs,
        color: COLORS.text.secondary,
        fontWeight: '600',
        textAlign: 'center',
    },
    uploadMeta: {
        fontSize: FONT_SIZE.xs,
        color: COLORS.text.muted,
    },

    // ── Position picker ──────────────────────────
    positionCol: {
        flex: 1.1,
        gap: SPACING.sm,
        justifyContent: 'flex-start',
    },
    positionLabel: {
        fontSize: FONT_SIZE.xs,
        fontWeight: '600',
        color: COLORS.text.primary,
    },
    positionPicker: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: RADIUS.sm,
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.sm,
        backgroundColor: COLORS.white,
    },
    positionValue: {
        flex: 1,
        fontSize: FONT_SIZE.xs,
        color: COLORS.text.primary,
    },
    positionPlaceholder: {
        color: COLORS.text.muted,
    },
    chevron: {
        fontSize: FONT_SIZE.md,
        color: COLORS.text.muted,
    },
    referenceLink: {
        fontSize: FONT_SIZE.xs,
        color: COLORS.accent,
        fontWeight: '500',
        marginTop: SPACING.xs,
    },
});

export default memo(DeliveryOptions);