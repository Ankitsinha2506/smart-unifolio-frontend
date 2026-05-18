// ─────────────────────────────────────────────
//  useHome — all business logic for HomeScreen
//  Keeps the screen component clean (UI only)
// ─────────────────────────────────────────────

import { useState, useMemo, useCallback } from 'react';
import { PRODUCTS, CATEGORIES, TESTIMONIALS } from '../../assets/data/homeData';

export function useHome() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategoryId, setActiveCategoryId] = useState('0');
    const [products, setProducts] = useState(PRODUCTS);

    // ── Derived: filtered product list ─────────────────────
    const filteredProducts = useMemo(() => {
        let list = products;

        // Filter by category (id '0' = All Items)
        if (activeCategoryId !== '0') {
            const label = CATEGORIES.find(c => c.id === activeCategoryId)?.label ?? '';
            list = list.filter(p =>
                p.category.toLowerCase() === label.toLowerCase()
            );
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            list = list.filter(
                p =>
                    p.name.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q) ||
                    p.category.toLowerCase().includes(q)
            );
        }

        return list;
    }, [products, activeCategoryId, searchQuery]);

    // ── Toggle wishlist ─────────────────────────────────────
    const toggleWishlist = useCallback((productId) => {
        setProducts(prev =>
            prev.map(p =>
                p.id === productId ? { ...p, wishlist: !p.wishlist } : p
            )
        );
    }, []);

    // ── Category select ─────────────────────────────────────
    const selectCategory = useCallback((id) => {
        setActiveCategoryId(id);
    }, []);

    // ── Search ──────────────────────────────────────────────
    const handleSearch = useCallback((text) => {
        setSearchQuery(text);
    }, []);

    const clearSearch = useCallback(() => {
        setSearchQuery('');
    }, []);

    return {
        // state
        searchQuery,
        activeCategoryId,
        // data
        categories: CATEGORIES,
        products: filteredProducts,
        testimonials: TESTIMONIALS,
        // actions
        toggleWishlist,
        selectCategory,
        handleSearch,
        clearSearch,
    };
}