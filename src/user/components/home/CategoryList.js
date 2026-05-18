import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { COLORS, FONT_SIZE, RADIUS } from '../../../constants/theme';

function CategoryItem({ item, isActive, onPress }) {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => onPress(item.id)}
      activeOpacity={0.75}
    >
      <View style={[styles.imageWrapper, isActive && styles.imageWrapperActive]}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.image} />
        ) : (
          <View style={[styles.placeholder, isActive && styles.placeholderActive]}>
            <Text style={[styles.placeholderText, isActive && styles.placeholderTextActive]}>
              {item.label.charAt(0)}
            </Text>
          </View>
        )}
      </View>

      <Text style={[styles.label, isActive && styles.labelActive]} numberOfLines={1}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
}

function CategoryList({ categories, activeCategoryId, onSelectCategory }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      style={styles.scrollView}
    >
      {categories.map(item => (
        <CategoryItem
          key={item.id}
          item={item}
          isActive={item.id === activeCategoryId}
          onPress={onSelectCategory}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: COLORS.white,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop:        8,
    paddingBottom:     8,
    gap:               12,
    alignItems:        'center',
  },
  item: {
    alignItems: 'center',
    gap:        4,
    width:      62,
  },
  imageWrapper: {
    width:        58,
    height:       58,
    borderRadius: 29,
    borderWidth:  1.5,
    borderColor:  COLORS.border,
    overflow:     'hidden',
  },
  imageWrapperActive: {
    borderColor: COLORS.primary,
    borderWidth: 2.5,
  },
  image: {
    width:  '100%',
    height: '100%',
  },
  placeholder: {
    flex:            1,
    backgroundColor: COLORS.background,
    alignItems:      'center',
    justifyContent:  'center',
  },
  placeholderActive: {
    backgroundColor: COLORS.primary,
  },
  placeholderText: {
    fontSize:   FONT_SIZE.lg,
    fontWeight: '600',
    color:      COLORS.text.secondary,
  },
  placeholderTextActive: {
    color: COLORS.white,
  },
  label: {
    fontSize:  FONT_SIZE.xs,
    color:     COLORS.text.secondary,
    fontWeight:'400',
    textAlign: 'center',
  },
  labelActive: {
    color:      COLORS.primary,
    fontWeight: '600',
  },
});

export default CategoryList;