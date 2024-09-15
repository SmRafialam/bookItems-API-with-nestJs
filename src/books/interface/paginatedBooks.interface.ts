import { Books } from "./books.interface";

export interface PaginatedBooks {
    items: Books[];
    total: number;
}
