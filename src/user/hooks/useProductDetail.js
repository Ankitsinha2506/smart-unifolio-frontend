// ─────────────────────────────────────────────
//  useProductDetail
//  All business logic for ProductDetailScreen
// ─────────────────────────────────────────────

import { useState, useCallback, useMemo } from 'react';

export function useProductDetail(product) {
    const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] ?? 'M');
    const [selectedColorIdx, setSelectedColorIdx] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [deliveryOption, setDeliveryOption] = useState('plain');
    const [uploadedLogo, setUploadedLogo] = useState(null);
    const [logoPosition, setLogoPosition] = useState('');
    const [showPositionPicker, setShowPositionPicker] = useState(false);
    const [descExpanded, setDescExpanded] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    // The hex color of whichever color circle is active
    const activeColor = useMemo(
        () => product?.colors?.[selectedColorIdx]?.hex ?? null,
        [product, selectedColorIdx],
    );

    const incrementQty = useCallback(() => setQuantity(q => Math.min(q + 1, 99)), []);
    const decrementQty = useCallback(() => setQuantity(q => Math.max(q - 1, 1)), []);
    const toggleWishlist = useCallback(() => setIsWishlisted(w => !w), []);

    const handleAddToCart = useCallback(() => {
        const payload = {
            productId: product?.id,
            size: selectedSize,
            color: activeColor,
            quantity,
            deliveryOption,
            logoPosition: deliveryOption === 'custom' ? logoPosition : null,
        };
        console.log('Add to cart:', payload);
        // dispatch(addToCart(payload))
    }, [product, selectedSize, activeColor, quantity, deliveryOption, logoPosition]);

    const handleBuyNow = useCallback(() => {
        handleAddToCart();
        // navigation.navigate('Checkout')
    }, [handleAddToCart]);

    return {
        selectedSize, setSelectedSize,
        selectedColorIdx, setSelectedColorIdx,
        quantity, incrementQty, decrementQty,
        activeColor,
        deliveryOption, setDeliveryOption,
        uploadedLogo, setUploadedLogo,
        logoPosition, setLogoPosition,
        showPositionPicker, setShowPositionPicker,
        descExpanded, setDescExpanded,
        isWishlisted, toggleWishlist,
        handleAddToCart, handleBuyNow,
    };
}