import { cn } from '@/shared/lib/utils';
import React from 'react'
import { Title } from './title';
import { Button } from '../ui';
import { PizzaImage } from './pizza-image';
import { GroupVariants } from './group-variants';
import { mapPizzaType, PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { Ingredient, ProductItem } from '@prisma/client';
import { IngredientItem } from './ingredient-item';
import { useSet } from 'react-use';
import { calcTotalPizzaPrice, getAvailablePizzaSizes } from '@/shared/lib';

interface Props {
  className?: string;
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  onSubmit: (itemId: number, ingredientId: number[]) => void;
}

export const ChoosePizzaForm: React.FC<Props> = ({ className, imageUrl, name, ingredients, items, onSubmit }) => {
  const [size, setSize] = React.useState<PizzaSize>(20)
  const [type, setType] = React.useState<PizzaType>(1)
  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]))

  const totalPrice = calcTotalPizzaPrice(type, size, items, ingredients, selectedIngredients)
  const availablePizzaSizes = getAvailablePizzaSizes(type, items)
  const textDetaills = `${size} см, ${mapPizzaType[type]} тесто`

  const currentItemId = items.find(item => item.size === size && item.pizzaType === type)?.id

  React.useEffect(() => {
    const isAvailableSize = availablePizzaSizes.find(item => Number(item.value) === size && !item.disabled)
    const availableSize = availablePizzaSizes.find(item => !item.disabled)

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize)
    }
  }, [type])

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients))
    }
  }

  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage className="" imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#f7f7f7] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetaills}</p>
        <div className='flex flex-col gap-4 mt-5'>
          <GroupVariants items={availablePizzaSizes} value={String(size)} onClick={value => setSize(Number(value) as PizzaSize)} />
          <GroupVariants items={pizzaTypes} value={String(type)} onClick={value => setType(Number(value) as PizzaType)} />
        </div>
        <div className='bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5'>
          <div className='grid grid-cols-3 gap-3'>
            {
              ingredients.map(({ id, name, price, imageUrl }) => (
                <IngredientItem
                  key={id}
                  name={name}
                  price={price}
                  imageUrl={imageUrl}
                  onClick={() => addIngredient(id)}
                  active={selectedIngredients.has(id)}
                />
              ))
            }
          </div>
        </div>
        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10" onClick={handleClickAdd}>
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  )
}