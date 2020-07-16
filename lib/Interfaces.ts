export interface ICategoryTreeItem {
  categoryId: string;
  name: string;
  slug: string;
  files: IFile[];
  children: ICategoryTreeItem[];
}

export interface IFile {
  fileId: string;
  contentType: string;
  accessUrl: string;
  edgeUrl: string;
  height: number;
  width: number;
  attributes: any;
}

export interface ICategory {
  categoryId: string;
  slug: string;
  name: string;
  attributes: {};
  isActive: true;
  itemCount: number;
  files: IFile[];

  parentId: string;
  parentName: string;
}

export interface ISearchResult<T> {
  pageIndex: number;
  pageSize: number;
  queryDurationMilliseconds: number;
  result: T[];
  resultCount: number;
  totalPages: number;
  totalRecordsFound: number;
}

export interface IProduct {
  productId: string;
  slug: string;
  title: string;
  status: string;
  isActive: boolean;
  description: string;

  price: IPrice;
  basePrice: IPrice;

  files: IFile[];

  attributes: any;

  categories: IProductCategory[];
  collections: IProductCollection[];
}

export interface IPrice {
  currencyCode: string;
  sellPrice: number;
  retailPrice: number;
  attributes: any;
}

export interface IProductCategory {
  isActive: boolean;
  key: string;
  slug: string;
  title: string;
}

export interface IProductCollection {
  isActive: boolean;
  key: string;
  slug: string;
  title: string;
}

export interface ICart {
  cartId: string;
  items: ICartItem[];
  currencyCode: string;
  subTotalCurrency: number;
  totalCurrency: number;
}

interface ICartItem {
  productId: string;
  slug: string;
  title: string;
  paymentMethod: string;
  files: IFile[];
  price: IPrice;
  quantity: number;
  totalCurrency: 124.8;
  totalPoints: 1560;
  attributes: any;
}
