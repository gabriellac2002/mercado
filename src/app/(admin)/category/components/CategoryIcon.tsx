import {
  // Alimentos
  IconApple,
  IconMeat,
  IconMilk,
  IconBread,
  IconFish,
  IconCarrot,
  IconBottle,
  IconCandy,
  IconIceCream,
  IconCup,
  IconCookie,
  IconEgg,
  IconCheese,
  IconLemon,
  IconMushroom,
  IconSalad,
  IconGrain,
  IconWheat,
  IconSausage,
  IconBeer,
  IconSpray,
  IconBucket,
  IconWashMachine,
  IconToiletPaper,
  IconShoppingCart,
  IconShoppingBag,
  IconBasket,
  IconTags,
  IconBarcode,
} from "@tabler/icons-react";

// Mapa de ícones disponíveis
const ICON_MAP = {
  IconApple,
  IconMeat,
  IconMilk,
  IconBread,
  IconFish,
  IconCarrot,
  IconBottle,
  IconCandy,
  IconIceCream,
  IconCup,
  IconCookie,
  IconEgg,

  // Novos
  IconCheese,
  IconLemon,
  IconMushroom,
  IconSalad,
  IconGrain,
  IconWheat,
  IconSausage,
  IconBeer,
  IconSpray,
  IconBucket,
  IconWashMachine,
  IconToiletPaper,
  IconShoppingBag,
  IconBasket,
  IconTags,
  IconBarcode,
  IconShoppingCart,
} as const;

// Lista completa de ícones para exibição no front
export const CATEGORY_ICONS = [
  // 🍎 Alimentação
  { icon: IconApple, name: "IconApple", label: "Frutas" },
  { icon: IconLemon, name: "IconLemon", label: "Cítricos" },
  { icon: IconCarrot, name: "IconCarrot", label: "Vegetais" },
  { icon: IconMushroom, name: "IconMushroom", label: "Cogumelos" },
  { icon: IconSalad, name: "IconSalad", label: "Saladas" },

  // 🥩 Proteínas
  { icon: IconMeat, name: "IconMeat", label: "Carnes" },
  { icon: IconFish, name: "IconFish", label: "Peixes" },
  { icon: IconEgg, name: "IconEgg", label: "Ovos" },
  { icon: IconSausage, name: "IconSausage", label: "Embutidos" },

  // 🥛 Laticínios
  { icon: IconMilk, name: "IconMilk", label: "Leite" },
  { icon: IconCheese, name: "IconCheese", label: "Queijos" },

  // 🥖 Padaria e cereais
  { icon: IconBread, name: "IconBread", label: "Padaria" },
  { icon: IconWheat, name: "IconWheat", label: "Cereais" },
  { icon: IconGrain, name: "IconGrain", label: "Grãos" },

  // 🍬 Doces e sobremesas
  { icon: IconCandy, name: "IconCandy", label: "Doces" },
  { icon: IconCookie, name: "IconCookie", label: "Biscoitos" },
  { icon: IconIceCream, name: "IconIceCream", label: "Sorvetes" },

  // 🍾 Bebidas
  { icon: IconBottle, name: "IconBottle", label: "Bebidas" },
  { icon: IconCup, name: "IconCup", label: "Café/Chá" },
  { icon: IconBeer, name: "IconBeer", label: "Cervejas" },

  // 🧼 Higiene e limpeza
  { icon: IconSpray, name: "IconSpray", label: "Produtos de Limpeza" },
  { icon: IconToiletPaper, name: "IconToiletPaper", label: "Papel Higiênico" },
  { icon: IconWashMachine, name: "IconWashMachine", label: "Lavanderia" },
  { icon: IconBucket, name: "IconBucket", label: "Balde / Utensílios" },

  // 🛒 Mercado e utilidades
  { icon: IconShoppingBag, name: "IconShoppingBag", label: "Sacolas" },
  { icon: IconBasket, name: "IconBasket", label: "Cestas" },
  { icon: IconTags, name: "IconTags", label: "Promoções" },
  { icon: IconBarcode, name: "IconBarcode", label: "Código de Barras" },
] as const;

interface CategoryIconProps {
  iconName: string;
  size?: number;
  color?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  iconName,
  size = 24,
  color,
}) => {
  const Icon = ICON_MAP[iconName as keyof typeof ICON_MAP] || IconShoppingCart;

  return <Icon size={size} color={color} />;
};
