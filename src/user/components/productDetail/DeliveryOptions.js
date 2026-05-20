// ─────────────────────────────────────────────
//  DeliveryOptions
//  Two selectable cards:
//    1. Deliver without customization
//    2. Deliver with customization (logo upload +
//       position picker)
// ─────────────────────────────────────────────

import React, { memo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  FlatList,
  SafeAreaView,
  Platform,
} from 'react-native';
import { COLORS, FONT_SIZE, SPACING, RADIUS } from '../../../constants/theme';

import { launchImageLibrary } from 'react-native-image-picker';

const LOGO_POSITIONS = [
  'Left Chest', 'Right Chest', 'Center Chest',
  'Left Sleeve', 'Right Sleeve', 'Back Center', 'Back Top',
];

// ── Option card ─────────────────────────────────
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
        <Text style={[styles.cardTitle, isActive && styles.cardTitleActive]}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

// ── Position picker modal ───────────────────────
function PositionPickerModal({ visible, selected, onSelect, onClose }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.modalBackdrop} onPress={onClose} activeOpacity={1}>
        <SafeAreaView style={styles.modalSheet}>
          <View style={styles.modalHandle} />
          <Text style={styles.modalTitle}>Position of logo / design</Text>
          <FlatList
            data={LOGO_POSITIONS}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.modalItem, item === selected && styles.modalItemActive]}
                onPress={() => { onSelect(item); onClose(); }}
                activeOpacity={0.75}
              >
                <Text style={[styles.modalItemText, item === selected && styles.modalItemTextActive]}>
                  {item}
                </Text>
                {item === selected && <Text style={styles.modalCheck}>✓</Text>}
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.modalCancel} onPress={onClose}>
            <Text style={styles.modalCancelText}>Cancel</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </TouchableOpacity>
    </Modal>
  );
}

// ── Position Reference Guide Modal ──────────────
// UPDATED: Clean modal overlay with industrial design
function PositionReferenceModal({ visible, onClose }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Dark backdrop */}
      <TouchableOpacity
        style={styles.referenceBackdrop}
        activeOpacity={1}
        onPress={onClose}
      />

      {/* Centered modal card */}
      <View style={styles.referenceModalCentered}>
        <View style={styles.referenceModalContent}>
          {/* Close button (top right) */}
          <TouchableOpacity
            style={styles.referenceCloseIconButton}
            onPress={onClose}
          >
            <Text style={styles.referenceCloseIcon}>✕</Text>
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.referenceModalTitle}>Logo / Design placement guide</Text>

          {/* Placement guide image */}
          <Image
            source={require('../../../assets/icons/ic_placement-guide.png')}
            style={styles.placementGuideImage}
            resizeMode="contain"
          />

          {/* Subtitle */}
          <Text style={styles.referenceModalSubtitle}>
            Select the position where you want your logo or design to be placed on the jacket
          </Text>

          {/* Action button */}
          <TouchableOpacity
            style={styles.referenceActionButton}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.referenceActionButtonText}>Got it</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// ── Upload + Position row ───────────────────────
function CustomUploadRow({ logoPosition, setLogoPosition, uploadedLogo, setUploadedLogo }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [referenceModalVisible, setReferenceModalVisible] = useState(false);

  const handleUpload = () => {
    launchImageLibrary(
      {
        mediaType:   'photo',
        quality:     0.8,
        selectionLimit: 1,
      },
      (response) => {
        if (response.didCancel || response.errorCode) return;
        const asset = response.assets?.[0];
        if (asset?.uri) {
          setUploadedLogo(asset.uri);
        }
      },
    );
  };

  const handleRemove = () => setUploadedLogo(null);

  return (
    <View style={styles.uploadRow}>
      {/* Upload box — shows preview if file selected */}
      <TouchableOpacity
        style={styles.uploadBox}
        onPress={uploadedLogo ? handleRemove : handleUpload}
        activeOpacity={0.8}
      >
        {uploadedLogo ? (
          <>
            <Image source={{ uri: uploadedLogo }} style={styles.uploadPreview} resizeMode="contain" />
            <View style={styles.removeOverlay}>
              <Text style={styles.removeText}>✕ Remove</Text>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.uploadIcon}>↑</Text>
            <Text style={styles.uploadLabel}>Upload logo/ design</Text>
            <Text style={styles.uploadMeta}>Max size 5 mb</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Position picker */}
      <View style={styles.positionCol}>
        <Text style={styles.positionLabel}>Position of logo/ design</Text>

        <TouchableOpacity
          style={styles.positionPicker}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={[styles.positionValue, !logoPosition && styles.positionPlaceholder]}>
            {logoPosition || 'Choose the position'}
          </Text>
          <Text style={styles.chevron}>⌄</Text>
        </TouchableOpacity>

        {/* Opens the reference guide modal */}
        <TouchableOpacity onPress={() => setReferenceModalVisible(true)}>
          <Text style={styles.referenceLink}>See the reference position images ›</Text>
        </TouchableOpacity>
      </View>

      {/* Position modal */}
      <PositionPickerModal
        visible={modalVisible}
        selected={logoPosition}
        onSelect={setLogoPosition}
        onClose={() => setModalVisible(false)}
      />

      {/* Reference guide modal */}
      <PositionReferenceModal
        visible={referenceModalVisible}
        onClose={() => setReferenceModalVisible(false)}
      />
    </View>
  );
}

// ── Main component ──────────────────────────────
function DeliveryOptions({
  deliveryOption, setDeliveryOption,
  uploadedLogo,   setUploadedLogo,
  logoPosition,   setLogoPosition,
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
    gap:               SPACING.md,
    marginTop:         SPACING.md,
  },
  card: {
    flexDirection:   'row',
    backgroundColor: COLORS.white,
    borderRadius:    RADIUS.md,
    padding:         SPACING.md,
    borderWidth:     1.5,
    borderColor:     COLORS.border,
    gap:             SPACING.sm,
    shadowColor:     '#000',
    shadowOffset:    { width: 0, height: 1 },
    shadowOpacity:   0.04,
    shadowRadius:    4,
    elevation:       1,
  },
  cardActive:      { borderColor: COLORS.primary },
  bullet:          { paddingTop: 1 },
  bulletDot:       { fontSize: FONT_SIZE.lg, color: COLORS.text.primary, fontWeight: '700' },
  cardText:        { flex: 1 },
  cardTitle:       { fontSize: FONT_SIZE.sm, fontWeight: '700', color: COLORS.text.primary, lineHeight: 18 },
  cardTitleActive: { color: COLORS.primary },
  cardSubtitle:    { fontSize: FONT_SIZE.xs, color: COLORS.text.secondary, marginTop: 4, lineHeight: 16, fontStyle: 'italic' },

  // ── Upload ────────────────────────────────────
  uploadRow: {
    flexDirection: 'row',
    gap:           SPACING.md,
    marginTop:     SPACING.xs,
  },
  uploadBox: {
    flex:            0.9,
    aspectRatio:     1,
    backgroundColor: COLORS.background,
    borderRadius:    RADIUS.md,
    borderWidth:     1.5,
    borderColor:     COLORS.border,
    borderStyle:     'dashed',
    alignItems:      'center',
    justifyContent:  'center',
    gap:             4,
    overflow:        'hidden',
  },
  uploadPreview: {
    width:  '100%',
    height: '100%',
  },
  removeOverlay: {
    position:        'absolute',
    bottom:          0,
    left:            0,
    right:           0,
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingVertical: 4,
    alignItems:      'center',
  },
  removeText:  { color: COLORS.white, fontSize: FONT_SIZE.xs, fontWeight: '600' },
  uploadIcon:  { fontSize: 28, color: COLORS.text.muted },
  uploadLabel: { fontSize: FONT_SIZE.xs, color: COLORS.text.secondary, fontWeight: '600', textAlign: 'center' },
  uploadMeta:  { fontSize: FONT_SIZE.xs, color: COLORS.text.muted },

  // ── Position picker ───────────────────────────
  positionCol: {
    flex:           1.1,
    gap:            SPACING.sm,
    justifyContent: 'flex-start',
  },
  positionLabel:  { fontSize: FONT_SIZE.xs, fontWeight: '600', color: COLORS.text.primary },
  positionPicker: {
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'space-between',
    borderWidth:       1,
    borderColor:       COLORS.border,
    borderRadius:      RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical:   SPACING.sm,
    backgroundColor:   COLORS.white,
  },
  positionValue:       { flex: 1, fontSize: FONT_SIZE.xs, color: COLORS.text.primary },
  positionPlaceholder: { color: COLORS.text.muted },
  chevron:             { fontSize: FONT_SIZE.md, color: COLORS.text.muted },
  referenceLink:       { fontSize: FONT_SIZE.xs, color: COLORS.accent, fontWeight: '500', marginTop: SPACING.xs },

  // ── Modal ─────────────────────────────────────
  modalBackdrop: {
    flex:            1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent:  'flex-end',
  },
  modalSheet: {
    backgroundColor:      COLORS.white,
    borderTopLeftRadius:  20,
    borderTopRightRadius: 20,
    paddingBottom:        Platform.OS === 'ios' ? 0 : 16,
    maxHeight:            '60%',
  },
  modalHandle: {
    width:           40,
    height:          4,
    backgroundColor: COLORS.border,
    borderRadius:    2,
    alignSelf:       'center',
    marginTop:       10,
    marginBottom:    8,
  },
  modalTitle: {
    fontSize:          FONT_SIZE.lg,
    fontWeight:        '700',
    color:             COLORS.text.primary,
    paddingHorizontal: SPACING.lg,
    paddingBottom:     SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalItem: {
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical:   SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalItemActive:    { backgroundColor: '#EEF2FF' },
  modalItemText:      { fontSize: FONT_SIZE.md, color: COLORS.text.primary },
  modalItemTextActive:{ color: COLORS.primary, fontWeight: '600' },
  modalCheck:         { fontSize: FONT_SIZE.md, color: COLORS.primary, fontWeight: '700' },
  modalCancel: {
    alignItems:      'center',
    paddingVertical: SPACING.lg,
    borderTopWidth:  1,
    borderTopColor:  COLORS.border,
    marginTop:       SPACING.xs,
  },
  modalCancelText: { fontSize: FONT_SIZE.md, color: '#EF4444', fontWeight: '600' },

  // ── Reference Guide Modal (Industrial Design) ───
  referenceBackdrop: {
    position:        'absolute',
    top:             0,
    left:            0,
    right:           0,
    bottom:          0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  referenceModalCentered: {
    flex:            1,
    justifyContent:  'center',
    alignItems:      'center',
    paddingHorizontal: SPACING.lg,
  },
  referenceModalContent: {
    backgroundColor:   COLORS.white,
    borderRadius:      RADIUS.lg,
    padding:           SPACING.lg,
    maxWidth:          '90%',
    width:             '100%',
    alignItems:        'center',
    shadowColor:       '#000',
    shadowOffset:      { width: 0, height: 8 },
    shadowOpacity:     0.25,
    shadowRadius:      12,
    elevation:         10,
    borderWidth:       1,
    borderColor:       'rgba(0, 0, 0, 0.08)',
  },
  referenceCloseIconButton: {
    position:   'absolute',
    top:        SPACING.md,
    right:      SPACING.md,
    width:      36,
    height:     36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex:     100,
  },
  referenceCloseIcon: {
    fontSize:   FONT_SIZE.lg,
    color:      COLORS.text.secondary,
    fontWeight: '600',
  },
  referenceModalTitle: {
    fontSize:    FONT_SIZE.lg,
    fontWeight:  '700',
    color:       COLORS.text.primary,
    marginTop:   SPACING.sm,
    marginBottom: SPACING.lg,
    textAlign:   'center',
  },
  placementGuideImage: {
    width:      '100%',
    height:     280,
    marginBottom: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.background,
  },
  referenceModalSubtitle: {
    fontSize:      FONT_SIZE.sm,
    color:         COLORS.text.secondary,
    textAlign:     'center',
    marginBottom:  SPACING.lg,
    lineHeight:    20,
  },
  referenceActionButton: {
    width:              '100%',
    paddingVertical:    SPACING.md,
    backgroundColor:    COLORS.primary,
    borderRadius:       RADIUS.md,
    alignItems:         'center',
    marginTop:          SPACING.md,
    shadowColor:        COLORS.primary,
    shadowOffset:       { width: 0, height: 4 },
    shadowOpacity:      0.2,
    shadowRadius:       6,
    elevation:          4,
  },
  referenceActionButtonText: {
    fontSize:   FONT_SIZE.md,
    fontWeight: '600',
    color:      COLORS.white,
  },
});

export default memo(DeliveryOptions);