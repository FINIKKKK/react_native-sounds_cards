import { TBase } from './base';
import { TLang } from '~store/slices/account';

export interface TCard extends TBase {
  name: [{ ru: string; kz: string }];
  user_id?: number;
  category_id: number;
  image: {
    id: number;
    original_url: string;
    public_url: string;
  };
  audio: [{
    id: number;
    lang: TLang;
    original_url: string;
    public_url: string;
  }];
}
