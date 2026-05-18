"use client";

/**
 * useCascadePartSelect
 *
 * Encapsulates the brand → model → category → part selection cascade.
 * Each level is only fetched once the prior level is selected.
 */

import { useState } from "react";
import { useBrands } from "@/hooks/useBrand";
import { useModelsByBrand } from "@/hooks/useModel";
import { useCategories } from "@/hooks/useCategory";
import { useSparePartsFiltered } from "@/hooks/useSparePart";

export function useCascadePartSelect() {
    const [brandId, setBrandId] = useState<string | null>(null);
    const [modelId, setModelId] = useState<string | null>(null);
    const [categoryId, setCategoryId] = useState<string | null>(null);
    const [partId, setPartId] = useState<number | null>(null);

    const { data: brandsData, isLoading: loadingBrands } = useBrands();
    const { data: modelsData, isLoading: loadingModels } = useModelsByBrand(brandId);
    const { data: categoriesData, isLoading: loadingCategories } = useCategories();
    const { data: partsData, isLoading: loadingParts } = useSparePartsFiltered(modelId, categoryId);

    const brands = brandsData?.data ?? brandsData ?? [];
    const models = modelsData?.data ?? modelsData ?? [];
    const categories = categoriesData?.data ?? categoriesData ?? [];
    const parts = partsData?.data ?? partsData ?? [];

    // Selected part object (for price pre-fill etc.)
    const selectedPart = parts.find((p: any) => p.id === partId) ?? null;

    function selectBrand(id: string | null) {
        setBrandId(id);
        setModelId(null);
        setCategoryId(null);
        setPartId(null);
    }
    function selectModel(id: string | null) {
        setModelId(id);
        setCategoryId(null);
        setPartId(null);
    }
    function selectCategory(id: string | null) {
        setCategoryId(id);
        setPartId(null);
    }
    function selectPart(id: number | null) {
        setPartId(id);
    }
    function reset() {
        setBrandId(null);
        setModelId(null);
        setCategoryId(null);
        setPartId(null);
    }

    return {
        // State
        brandId, modelId, categoryId, partId,
        // Data
        brands, models, categories, parts, selectedPart,
        // Loading
        loadingBrands, loadingModels, loadingCategories, loadingParts,
        // Setters
        selectBrand, selectModel, selectCategory, selectPart, reset,
    };
}