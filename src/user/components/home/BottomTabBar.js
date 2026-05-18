// ─────────────────────────────────────────────
//  BottomTabBar
//  Custom bottom navigation: Home, Cart,
//  Wishlist, Profile
//  Pass activeTab + onTabPress from parent
// ─────────────────────────────────────────────

import React, { memo } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Platform,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZE } from '../../../constants/theme';

const TABS = [
    { key: 'home', icon: '⊙', label: 'Home' },
    { key: 'cart', icon: '🛍', label: 'Cart' },
    { key: 'wishlist', icon: '♡', label: 'Wishlist' },
    { key: 'profile', icon: '👤', label: 'Profile' },
];

function TabItem({ tab, isActive, onPress, cartCount }) {
    const showBadge = tab.key === 'cart' && cartCount > 0;

    return (
        <TouchableOpacity
            style={styles.tabItem}
            onPress={() => onPress(tab.key)}
            activeOpacity={0.7}
        >
            {/* Active indicator pill */}
            {isActive && <View style={styles.activePill} />}

            {/* Icon wrapper */}
            <View style={[styles.iconWrapper, isActive && styles.iconWrapperActive]}>
                <Text style={[styles.icon, isActive && styles.iconActive]}>
                    {tab.icon}
                </Text>

                {/* Cart badge */}
                {showBadge && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                            {cartCount > 9 ? '9+' : cartCount}
                        </Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
}

function BottomTabBar({ activeTab = 'home', onTabPress, cartCount = 0 }) {
    return (
        <View style={styles.container}>
            {TABS.map(tab => (
                <TabItem
                    key={tab.key}
                    tab={tab}
                    isActive={activeTab === tab.key}
                    onPress={onTabPress}
                    cartCount={cartCount}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingBottom: Platform.OS === 'ios' ? 24 : SPACING.md,
        paddingTop: SPACING.sm,
        paddingHorizontal: SPACING.sm,
        // shadow upward
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 12,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.xs,
        position: 'relative',
    },
    activePill: {
        position: 'absolute',
        top: 0,
        width: 32,
        height: 3,
        borderRadius: 2,
        backgroundColor: COLORS.primary,
    },
    iconWrapper: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconWrapperActive: {
        backgroundColor: `${COLORS.primary}15`,   // 15 = ~8% opacity
    },
    icon: {
        fontSize: 22,
        color: COLORS.tabBar.inactive,
    },
    iconActive: {
        color: COLORS.tabBar.active,
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

export default memo(BottomTabBar);