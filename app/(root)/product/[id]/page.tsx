import { Container, GroupVariants, PizzaImage, Title } from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    }
  })

  if (!product) {
    return notFound();
  }

  return <Container className="flex flex-col my-10">
    <div className="flex flex-1">
      <PizzaImage className="" imageUrl={product.imageUrl} size={30} />
      <div className="w-[490px] bg-[#f7f7f7] p-7">
        <Title text={product.name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ea consectetur quas, deleniti impedit quo consequatur dolorum iste tempora odit! Laboriosam cumque odit deleniti fugiat iure? Possimus placeat quam assumenda!</p>
        <GroupVariants items={[
          {
            name: 'Маленькая',
            value: '1'
          },
          {
            name: 'Средняя',
            value: '2'
          },
          {
            name: 'Большая',
            value: '3'
          },

        ]}
          selectedValue="2"
        />
      </div>
    </div>
  </Container>;
}