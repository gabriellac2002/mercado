"use client";

import React, { useCallback, useState } from "react";
import { PageLayout } from "../layout/page-layout";
import { Grid, Stack, LoadingOverlay, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconShoppingCart } from "@tabler/icons-react";
import { useShopping } from "./hooks/useShopping";
import { ShoppingCart } from "./components/ShoppingCart/ShoppingCart";
import { ProductSelectorModal } from "./components/ProductSelectorModal/ProductSelectorModal";
import { CompleteShoppingModal } from "./components/CompleteShoppingModal";
import { PaymentMethod, Shopping } from "@/app/types/shopping";
import { ShoppingDetailsModal, ShoppingTable } from "./components";

const ShoppingPage: React.FC = () => {
  const {
    products,
    shoppings,
    categories,
    loading,
    currentShopping,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    getTotalAmount,
    completePurchase,
    // updatePayment,
    // cancelPurchase,
  } = useShopping();

  // Modals state
  const [
    productSelectorOpened,
    { open: openProductSelector, close: closeProductSelector },
  ] = useDisclosure(false);
  const [
    completeShoppingOpened,
    { open: openCompleteShopping, close: closeCompleteShopping },
  ] = useDisclosure(false);

  const [selectedShopping, setSelectedShopping] = useState<Shopping | null>(
    null
  );
  const [
    detailsShoppingOpened,
    { open: setDetailsShoppingOpen, close: closeDetailsShopping },
  ] = useDisclosure(false);
  const [actionLoading, setActionLoading] = useState(false);

  const handleAddProducts = useCallback(() => {
    openProductSelector();
  }, [openProductSelector]);

  const handleCreateShopping = useCallback(() => {
    if (currentShopping.length === 0) return;

    const tempShopping: Shopping = {
      id: "temp-shopping-id",
      items: currentShopping,
      status: "pending",
      totalAmount: getTotalAmount(),
      deleted: false,
      isPaid: false,
      paymentMethod: "cash",
      notes: undefined,
    };

    setSelectedShopping(tempShopping);
    openCompleteShopping();
  }, [openCompleteShopping, getTotalAmount, currentShopping]);

  const handleSubmitComplete = async (
    paymentMethod: PaymentMethod,
    isPaid: boolean
  ) => {
    if (!selectedShopping) return false;

    const updatedShopping: Shopping = {
      ...selectedShopping,
      paymentMethod,
      isPaid,
    };
    setSelectedShopping(updatedShopping);

    setActionLoading(true);
    const success = await completePurchase(updatedShopping);
    setActionLoading(false);

    if (success) {
      setSelectedShopping(null);
      closeCompleteShopping();
    }

    return success;
  };

  const handleViewDetails = (shopping: Shopping) => {
    setSelectedShopping(shopping);
    setDetailsShoppingOpen();
  };

  if (loading) {
    return (
      <PageLayout
        title="Compras"
        description="Gerencie compras e controle de estoque"
        icon={<IconShoppingCart size={24} />}
      >
        <Box pos="relative" mih={400}>
          <LoadingOverlay visible />
        </Box>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Compras"
      description="Gerencie compras e controle de estoque"
      icon={<IconShoppingCart size={24} />}
    >
      <Grid>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Stack>
            <ShoppingCart
              items={currentShopping}
              onUpdateQuantity={updateCartQuantity}
              onRemoveItem={removeFromCart}
              onAddProducts={handleAddProducts}
              onCreateShopping={handleCreateShopping}
              totalAmount={getTotalAmount()}
            />
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 6 }}>
          <ShoppingTable
            shopping={shoppings}
            onViewDetails={handleViewDetails}
          />
        </Grid.Col>
      </Grid>

      <ProductSelectorModal
        opened={productSelectorOpened}
        onClose={closeProductSelector}
        products={products}
        categories={categories}
        onAddProduct={addToCart}
      />

      <CompleteShoppingModal
        opened={completeShoppingOpened}
        onClose={() => {
          closeCompleteShopping();
          setSelectedShopping(null);
        }}
        shopping={selectedShopping}
        onComplete={handleSubmitComplete}
        loading={actionLoading}
      />

      <ShoppingDetailsModal
        opened={detailsShoppingOpened}
        onClose={() => {
          closeDetailsShopping();
          setSelectedShopping(null);
        }}
        shopping={selectedShopping}
      />
    </PageLayout>
  );
};

export default ShoppingPage;
