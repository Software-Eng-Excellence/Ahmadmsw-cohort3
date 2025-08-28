export enum ItemCategoty {
    CAKE = "cake",
    BOOK = 'book',
    TOY = 'toy',
    
}

export interface Item {
    getCategory() : ItemCategoty ;
}
