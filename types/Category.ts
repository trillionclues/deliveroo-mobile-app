export interface CategoryItem {
  item: {
    name: string;
    count: number;
    checked?: boolean;
  };
  itemList: CategoryData[];
  setItemList: React.Dispatch<React.SetStateAction<CategoryData[]>>;
}

export interface CategoryData {
  name: string;
  count: number;
  checked?: boolean;
}
