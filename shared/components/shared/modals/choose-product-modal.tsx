'use client'

import React from 'react'
import { cn } from '@/shared/lib/utils'
import { Dialog } from '@/shared/components/ui'
import { DialogContent } from '@/shared/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { ChooseProductForm } from '../choose-product-form'
import { ChoosePizzaForm } from '../choose-pizza-form'
import { ProductWithRelations } from '@/@types/product'
import { useCartStore } from '@/shared/store'

interface Props {
  className?: string
  product: ProductWithRelations
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const router = useRouter()
  const firstItem = product.items[0]
  const isPizzaForm = Boolean(firstItem.pizzaType)
  const addCartItem = useCartStore(state => state.addCartItem)

  const onAddProduct = () => {
    addCartItem({
      productItemId: firstItem.id,
    })
  }

  const onAddPizza = (productItemId: number, ingredients: number[]) => {
    addCartItem({
      productItemId,
      ingredients
    })
  }

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()} >
      <DialogContent className={cn("p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden", className)}>
        {
          isPizzaForm
            ? <ChoosePizzaForm
              onSubmit={onAddPizza}
              imageUrl={product.imageUrl}
              name={product.name}
              ingredients={product.ingredients}
              items={product.items}
            />
            : <ChooseProductForm
              onSubmit={onAddProduct}
              imageUrl={product.imageUrl}
              name={product.name}
              price={firstItem.price}
            />
        }
      </DialogContent>
    </Dialog>
  )
}