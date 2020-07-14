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
