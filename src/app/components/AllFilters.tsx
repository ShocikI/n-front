'use client';
import React, { FC, useState } from 'react';
import { Category } from '../data/Categories';
import { clsx } from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Props = { categories: Category[] };

const AllFilters: FC<Props> = ({ categories }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const numberParams = searchParams.getAll('categories').map(categoryId => Number(categoryId));
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>(numberParams);

  const handleChangeCategory = (category: Category) => {
    let newValues = selectedCategoryIds;
    const params = new URLSearchParams();

    newValues.includes(category.id)
      ? (newValues = newValues.filter(categoryId => categoryId !== category.id))
      : (newValues = [...newValues, category.id]);

    setSelectedCategoryIds(newValues);

    newValues.forEach(value => params.append('categories', `${value}`));
    router.replace(`${pathname}?${params.toString()}`);
  };

  const categoriesItems = categories.map(cat => (
    <button
      className={clsx('flex box-border w-1/6 justify-center p-1', selectedCategoryIds.includes(cat.id) && `font-black`)}
      key={cat.name}
      onClick={() => handleChangeCategory(cat)}
    >
      {cat.name}
    </button>
  ));

  return <ul className="bg-secondary w-screen flex flex-row justify-between p-4 box-border">{categoriesItems}</ul>;
};

export default AllFilters;
