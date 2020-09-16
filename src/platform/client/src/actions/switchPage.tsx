import { PAGE } from '../constants/page';

export type PageType = {
    type: string,
    page: number
}

export const switchPage = (page: number) => {
    return ({
        type: PAGE,
        page: page
    });
}