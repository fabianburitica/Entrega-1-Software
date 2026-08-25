import type { CreateBookDTO } from '@/dtos/CreateBookDTO.js';
import type { BookInterface } from '@/interfaces/BookInterface.js';
import { useBookStore } from '@/stores/bookstore.js';

export class BookService {
  static getBooks(): BookInterface[] {
    return useBookStore().books;
  }

  static getBookById(id: number): BookInterface | undefined {
    return useBookStore().books.find((book) => book.id === id);
  }

  static getUniqueBookCategories(): string[] {
    const categories = this.getBooks().map((book) => book.category);

    return Array.from(new Set(categories));
  }

  static createBook(book: CreateBookDTO): void {
    const store = useBookStore();
    const id = store.books.length > 0 ? Math.max(...store.books.map((b) => b.id), 0) + 1 : 1;

    store.books.push({ id, ...book });
  }

  static deleteLastBook(): void {
    useBookStore().books.pop();
  }
}
