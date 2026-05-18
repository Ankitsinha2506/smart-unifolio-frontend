// ─────────────────────────────────────────────
//  HomeHeader
//  Shows greeting, brand name, notification bell
// ─────────────────────────────────────────────

import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { COLORS, FONT_SIZE, SPACING } from '../../../constants/theme';

function HomeHeader({ onNotificationPress, notificationCount = 1 }) {
    return (
        <View style={styles.container}>
            {/* Left: greeting + brand */}
            <View style={styles.left}>
                <Text style={styles.greeting}>Welcome to</Text>
                <Text style={styles.brand}>Smart Unifolio</Text>
            </View>

            {/* Right: notification bell */}
            <TouchableOpacity
                style={styles.bellWrapper}
                onPress={onNotificationPress}
                activeOpacity={0.7}
            >
                {/* Bell icon using unicode — swap with react-native-vector-icons if available */}
                <Text style={styles.bellIcon}>🔔</Text>
                {notificationCount > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                            {notificationCount > 9 ? '9+' : notificationCount}
                        </Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.md,
        paddingBottom: SPACING.sm,
        backgroundColor: COLORS.white,
    },
    left: {
        gap: 2,
    },
    greeting: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.text.secondary,
        fontWeight: '400',
    },
    brand: {
        fontSize: FONT_SIZE.xl,
        fontWeight: '700',
        color: COLORS.text.primary,
        letterSpacing: 0.2,
    },
    bellWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bellIcon: {
        fontSize: 20,
    },
    badge: {
        position: 'absolute',
        top: 4,
        right: 4,
        minWidth: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#EF4444',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 3,
    },
    badgeText: {
        fontSize: 9,
        color: COLORS.white,
        fontWeight: '700',
    },
});

export default HomeHeader;