import React, { useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { COLORS, FONT_SIZE, SPACING, RADIUS } from '../../../constants/theme';

function SearchBar({ value, onChangeText, onClear, placeholder = 'Search for shirts, caps etc' }) {
  const inputRef = useRef(null);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.searchIcon}>🔍</Text>

        <TextInput
          ref={inputRef}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.text.muted}
          returnKeyType="search"
          clearButtonMode="never"
          autoCorrect={false}
          autoCapitalize="none"
        />

        {value?.length > 0 && (
          <TouchableOpacity
            onPress={() => { onClear(); inputRef.current?.blur(); }}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <View style={styles.clearBtn}>
              <Text style={styles.clearText}>✕</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingTop:        10,
    paddingBottom:     6,
    backgroundColor:   COLORS.white,
  },
  container: {
    flexDirection:     'row',
    alignItems:        'center',
    backgroundColor:   COLORS.background,
    borderRadius:      RADIUS.full,
    borderWidth:       1,
    borderColor:       COLORS.border,
    paddingHorizontal: 14,
    height:            44,
  },
  searchIcon: {
    fontSize:    15,
    marginRight: 8,
  },
  input: {
    flex:            1,
    fontSize:        FONT_SIZE.md,
    color:           COLORS.text.primary,
    paddingVertical: 0,
  },
  clearBtn: {
    width:           20,
    height:          20,
    borderRadius:    10,
    backgroundColor: COLORS.text.muted,
    alignItems:      'center',
    justifyContent:  'center',
    marginLeft:      8,
  },
  clearText: {
    fontSize:   9,
    color:      COLORS.white,
    fontWeight: '700',
  },
});

export default SearchBar;