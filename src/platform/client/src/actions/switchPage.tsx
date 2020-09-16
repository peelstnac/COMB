import { PAGE } from '../constants/page';

export type pageType = {
    type: string,
    page: number
}

export const switchPage = (page: number) => {
    return ({
        type: PAGE,
        page: page
    });
}