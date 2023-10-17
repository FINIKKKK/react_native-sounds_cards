import { TBase } from '~types/base';

export interface TCategory extends TBase {
  name: [{ ru: string, kz: string }];
  image: string;
}
