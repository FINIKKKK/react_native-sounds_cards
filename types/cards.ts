import {TBase} from "./base";

export interface TCard extends TBase {
    img: string,
    name: [{ ru: string, kz: string }]
}