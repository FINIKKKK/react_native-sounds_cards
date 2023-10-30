import { TBase } from '~types/base';

export interface TCategory extends TBase {
  name: [{ ru: string; kz: string }];
  user_id?: number;
  image: {
    id: number;
    original_url: string;
    public_url: string;
  };
}
