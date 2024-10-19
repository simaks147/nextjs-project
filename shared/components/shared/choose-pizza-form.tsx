import { cn } from '@/shared/lib/utils';
import React from 'react'
import { Title } from './title';
import { Button } from '../ui';
import { PizzaImage } from './pizza-image';
import { GroupVariants } from './group-variants';
import { pizzaSizes } from '@/shared/constants/pizza';

interface Props {
  className?: string;
  imageUrl: string;
  name: string;
  ingredients: any[];
  items?: any[];
  onClickAdd?: VoidFunction;
}

export const ChoosePizzaForm: React.FC<Props> = ({ className, imageUrl, name, ingredients, items, onClickAdd }) => {
  const textDetaills = '30 см, традиционное тесто 30'
  const totalPrice = 350

  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage className="" imageUrl={imageUrl} size={30} />

      <div className="w-[490px] bg-[#f7f7f7] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <GroupVariants items={pizzaSizes} />
        <p className="text-gray-400">{textDetaills}</p>
        <Button
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  )
}