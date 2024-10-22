import { ProductItem } from "@prisma/client";
import { pizzaSizes, PizzaType } from "../constants/pizza";

export const getAvailablePizzaSizes = (type: PizzaType, items: ProductItem[]) => {
  const filteredPizzasByType = items.filter(item => item.pizzaType === type)

  return pizzaSizes.map(({ name, value }) => ({
    name,
    value,
    disabled: !filteredPizzasByType.some(pizza => Number(pizza.size) === Number(value))
  }))
}