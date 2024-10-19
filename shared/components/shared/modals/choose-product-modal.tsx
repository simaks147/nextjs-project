'use client'

import React from 'react'
import { cn } from '@/shared/lib/utils'
import { Dialog } from '@/shared/components/ui'
import { DialogContent } from '@/shared/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { ChooseProductForm } from '../choose-product-form'
import { ChoosePizzaForm } from '../choose-pizza-form'
import { ProductWithRelations } from '@/@types/product'

interface Props {
  className?: string
  product: ProductWithRelations
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const router = useRouter()
  const isPizzaForm = Boolean(product.items[0].pizzaType)

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()} >
      <DialogContent className={cn("p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden", className)}>
        {
          isPizzaForm
            ? <ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} ingredients={[]} />
            : <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
        }
      </DialogContent>
    </Dialog>
  )
}