import { useSearchParams } from 'next/navigation'
import React from 'react'
import { useSet } from 'react-use'

interface PriceProps {
  priceFrom?: number
  priceTo?: number
}

export interface Filters {
  sizes: Set<string>
  pizzaTypes: Set<string>
  selectedIngredients: Set<string>
  prices: PriceProps
}

interface ReturnProps extends Filters {
  setSelectedIngredients: (id: string) => void
  setSizes: (id: string) => void
  setPizzaTypes: (id: string) => void
  setPrices: (name: keyof PriceProps, value: number) => void
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams();

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get('ingredients')?.split(',')
    ));

  const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>(searchParams.get('sizes')?.split(',') || []));

  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(new Set<string>(searchParams.get('pizzaTypes')?.split(',') || []));

  const [prices, setPrices] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  return {
    selectedIngredients,
    sizes,
    pizzaTypes,
    prices,
    setSelectedIngredients: toggleIngredients,
    setSizes: toggleSizes,
    setPizzaTypes: togglePizzaTypes,
    setPrices: updatePrice
  }
}