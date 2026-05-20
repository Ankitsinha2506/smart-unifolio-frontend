// ─────────────────────────────────────────────
//  ProductImageCarousel
//  Shows product image with a color tint overlay
//  when user picks a different color.
//  Back button + Wishlist button on top corners.
// ─────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { COLORS, RADIUS } from '../../../constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ── FIX 1: Height reduced from 0.9 → 0.72 of screen width ──
const IMAGE_HEIGHT = SCREEN_WIDTH * 0.72;

function ProductImageCarousel({
  images,
  activeColor,  // hex of selected color e.g. '#FF0000'
  baseColor,    // hex of colors[0] — the original product color
  isWishlisted,
  onBack,
  onWishlistToggle,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (e) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setCurrentIndex(idx);
  };

  // ── FIX 2: Color change logic ─────────────────────────────
  // OLD (wrong): rendered a colored View over the whole imageWrapper
  //   → changed entire background including grey card area
  // NEW (correct): pass tintColor directly to <Image> prop
  //   → only the image pixels get colorized, background stays white
  //
  // HOW IT WORKS:
  //   - activeColor === baseColor (index 0) → no tint (null)
  //   - activeColor !== baseColor           → apply as tintColor on image
  //   - React Native's tintColor recolors non-transparent pixels only
  //   - Works on both iOS and Android natively, no overlay needed
  const imageTintColor = activeColor && activeColor !== baseColor
    ? activeColor
    : undefined;

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {(images && images.length > 0 ? images : [null]).map((uri, idx) => (
          <View key={idx} style={styles.imageWrapper}>
            {uri ? (
              // ── tintColor applied directly to Image — only image pixels change color ──
              <Image
                source={{ uri }}
                style={[styles.image, imageTintColor && { tintColor: imageTintColor }]}
                resizeMode="contain"
              />
            ) : (
              // Placeholder: emoji shirt recolored via tintColor on a dummy image,
              // or just show the emoji with a colored background hint
              <View style={styles.placeholder}>
                <Text style={[
                  styles.placeholderIcon,
                  // For placeholder: just change the emoji background to hint color
                ]}>
                  👕
                </Text>
                {/* Color swatch label shown below emoji when no real image */}
                {imageTintColor && (
                  <View style={[styles.colorSwatch, { backgroundColor: imageTintColor }]} />
                )}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Dot indicators */}
      {images && images.length > 1 && (
        <View style={styles.dots}>
          {images.map((_, i) => (
            <View key={i} style={[styles.dot, i === currentIndex && styles.dotActive]} />
          ))}
        </View>
      )}

      {/* Back button */}
      <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.8}>
        <Text style={styles.backIcon}>‹</Text>
      </TouchableOpacity>

      {/* Wishlist button — FIX 3: state now reflected here via isWishlisted prop */}
      <TouchableOpacity style={styles.wishlistBtn} onPress={onWishlistToggle} activeOpacity={0.8}>
        <Text style={[styles.heartIcon, isWishlisted && styles.heartActive]}>
          {isWishlisted ? '♥' : '♡'}
        </Text>
      </TouchableOpacity>

      {images && images.length > 1 && currentIndex < images.length - 1 && (
        <View style={styles.arrowRight}>
          <Text style={styles.arrowText}>›</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width:  SCREEN_WIDTH,
    height: IMAGE_HEIGHT,   // ← FIX 1: was SCREEN_WIDTH * 0.9, now * 0.72
  },
  scrollView: {
    flex: 1,
  },
  imageWrapper: {
    width:            SCREEN_WIDTH,
    height:           IMAGE_HEIGHT,
    backgroundColor:  '#F3F4F6',
    borderBottomLeftRadius:  RADIUS.xl,
    borderBottomRightRadius: RADIUS.xl,
    overflow:         'hidden',
  },
  image: {
    width:  '100%',
    height: '100%',
    // tintColor applied inline above — no overlay View needed
  },
  placeholder: {
    flex:            1,
    alignItems:      'center',
    justifyContent:  'center',
    backgroundColor: '#F3F4F6',
    gap:             12,
  },
  placeholderIcon: {
    fontSize: 80,
  },
  // Small color swatch shown under emoji when a tint is active but no real image
  colorSwatch: {
    width:        40,
    height:       40,
    borderRadius: 20,
    borderWidth:  2,
    borderColor:  'rgba(0,0,0,0.1)',
  },
  dots: {
    position:       'absolute',
    bottom:         12,
    left:           0,
    right:          0,
    flexDirection:  'row',
    justifyContent: 'center',
    gap:            6,
  },
  dot: {
    width:           6,
    height:          6,
    borderRadius:    3,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  dotActive: {
    backgroundColor: COLORS.primary,
    width:           16,
  },
  backBtn: {
    position:        'absolute',
    top:             16,
    left:            16,
    width:           36,
    height:          36,
    borderRadius:    18,
    backgroundColor: COLORS.white,
    alignItems:      'center',
    justifyContent:  'center',
    shadowColor:     '#000',
    shadowOffset:    { width: 0, height: 2 },
    shadowOpacity:   0.1,
    shadowRadius:    4,
    elevation:       4,
  },
  backIcon: {
    fontSize:   24,
    color:      COLORS.text.primary,
    lineHeight: 28,
  },
  wishlistBtn: {
    position:        'absolute',
    top:             16,
    right:           16,
    width:           36,
    height:          36,
    borderRadius:    18,
    backgroundColor: COLORS.white,
    alignItems:      'center',
    justifyContent:  'center',
    shadowColor:     '#000',
    shadowOffset:    { width: 0, height: 2 },
    shadowOpacity:   0.1,
    shadowRadius:    4,
    elevation:       4,
  },
  heartIcon: {
    fontSize: 18,
    color:    COLORS.text.muted,
  },
  heartActive: {
    color: '#EF4444',   // ← FIX 3: red heart when wishlisted
  },
  arrowRight: {
    position:        'absolute',
    right:           12,
    top:             '50%',
    marginTop:       -18,
    width:           36,
    height:          36,
    borderRadius:    18,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems:      'center',
    justifyContent:  'center',
  },
  arrowText: {
    fontSize:   24,
    color:      COLORS.text.primary,
    lineHeight: 28,
  },
});

export default ProductImageCarousel;