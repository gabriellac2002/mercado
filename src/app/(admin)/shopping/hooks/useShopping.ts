import { useState, useEffect, useCallback, useMemo } from "react";
import { Shopping, ShoppingItem } from "@/app/types/shopping";
import { Product } from "@/app/types/product";
import { Category } from "@/app/types/category";
import { notifications } from "@mantine/notifications";
import { getProducts } from "@/lib/api/product";
import { getCategories } from "@/lib/api/categories";
import { completeShopping } from "../actions/actions";
import { getShopping } from "@/lib/api/shopping";

export const useShopping = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingShoppings, setLoadingShoppings] = useState(true);
  const [currentShopping, setCurrentShopping] = useState<ShoppingItem[]>([]);
  const [shoppings, setShoppings] = useState<Shopping[]>([]);

  const loadShoppings = useCallback(async () => {
    try {
      const result = await getShopping();
      if (result.success && result.data) {
        setShoppings(result.data);
      }
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      notifications.show({
        title: "Erro",
        message: "Erro inesperado ao carregar produtos",
        color: "red",
      });
    } finally {
      setLoadingShoppings(false);
    }
  }, []);

  const fetchProducts = async () => {
    const [productsResult, categoriesResult] = await Promise.all([
      getProducts(),
      getCategories(),
    ]);

    if (productsResult.success && productsResult.data) {
      setProducts(productsResult.data);
    } else {
      setLoadingProducts(false);
      notifications.show({
        title: "Erro",
        message: "Erro ao carregar dados",
        color: "red",
      });
      throw new Error(productsResult.error || "Erro ao carregar produtos");
    }

    if (categoriesResult.success && categoriesResult.data) {
      setCategories(categoriesResult.data);
    } else {
      setLoadingProducts(false);
      notifications.show({
        title: "Erro",
        message: "Erro ao carregar dados",
        color: "red",
      });
      throw new Error(categoriesResult.error || "Erro ao carregar categorias");
    }

    setLoadingProducts(false);
  };

  useEffect(() => {
    loadShoppings();
    fetchProducts();
  }, [loadShoppings]);

  const loading = loadingProducts || loadingShoppings;

  const productsMap = useMemo(() => {
    return new Map(products.map((p) => [p.id, p]));
  }, [products]);

  const addToCart = useCallback((product: Product, quantity: number) => {
    setCurrentShopping((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
          totalPrice:
            (updated[existingIndex].quantity + quantity) *
            updated[existingIndex].unitPrice,
        };
        return updated;
      }

      const newItem: ShoppingItem = {
        productId: product.id,
        productName: product.name,
        quantity,
        unitPrice: product.unitPrice,
        totalPrice: quantity * product.unitPrice,
      };
      return [...prev, newItem];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCurrentShopping((prev) =>
      prev.filter((item) => item.productId !== productId)
    );
  }, []);

  const updateCartQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }

      setCurrentShopping((prev) =>
        prev.map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity,
                totalPrice: quantity * item.unitPrice,
              }
            : item
        )
      );
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => {
    setCurrentShopping([]);
  }, []);

  const getTotalAmount = useCallback(() => {
    return currentShopping.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );
  }, [currentShopping]);

  const completePurchase = useCallback(
    async (shopping: Shopping) => {
      setLoadingShoppings(true);
      const result = await completeShopping(shopping);

      if (result.success) {
        notifications.show({
          title: "Sucesso",
          message: result.data?.message || "Compra concluída!",
          color: "green",
        });
        setLoadingShoppings(false);
        clearCart();
        return true;
      }

      notifications.show({
        title: "Erro",
        message: result.error,
        color: "red",
      });

      setLoadingShoppings(false);
      return false;
    },
    [clearCart]
  );

  return {
    products,
    shoppings,
    categories,
    loading,
    currentShopping,
    productsMap,

    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getTotalAmount,

    completePurchase,
  };
};
