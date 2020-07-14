import { IFile } from "./Interfaces";

export const firstImage = (files: IFile[]) => {
  if (files && files.length > 0) return files[0];
  return null;
};
