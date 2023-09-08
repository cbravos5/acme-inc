import { Product } from "@/domain/models/Product";
import { IGetAllowedAdjectives } from "@/domain/useCases/get-allowed-adjectives";
import { IGetAllowedNouns } from "@/domain/useCases/get-allowed-nouns";
import { IGetProducts } from "@/domain/useCases/get-products";
import { IStorage } from "../storage/get-set-storage";
import { v4 } from "uuid";

export class GetProducts implements IGetProducts {

  private products: Product[] = [];

  constructor(
    private readonly getAllowedNouns: IGetAllowedNouns,
    private readonly getAllowedAdjectives: IGetAllowedAdjectives,
    private readonly storage: IStorage) {
    const storageProducts = storage.get('products') as Product[];

    if (storageProducts) this.products = storageProducts;
    else this.mountProducts();
  }

  async executePaged(request: IGetProducts.PagedRequest): Promise<IGetProducts.PagedResponse> {
    const offset = request.currentPage > 0 ? (request.currentPage - 1) * request.pageSize : 0;

    const products = this.products.slice(offset, request.currentPage * request.pageSize);
    const totalPages = Math.ceil(this.products.length / request.pageSize);

    return { products, pagination: { currentPage: request.currentPage, totalPages } }
  }

  async executeSingle(id: string): Promise<IGetProducts.SingleResponse> {
    const product = this.products.find((product) => product.id === id);

    if (!product) throw new Error('Produto não encontrado!');

    return product;
  }

  // randomly shuffles the array
  private shuffle(items: (string | number)[]) {
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
  }

  private async mountProducts() {
    const nouns = await this.getAllowedNouns.execute();
    const adjectives = await this.getAllowedAdjectives.execute();

    this.shuffle(nouns);
    this.shuffle(adjectives);

    const randomNumbers = this.getRandomNumbers(0, 300, nouns.length);

    this.products = nouns.map((noun, i) => {
      const name = `${noun} ${adjectives[i]}`;
      const description = this.generateRandomText(20, 500);
      const price = this.getPrice(name.length, description.length);

      return {
        id: v4(),
        name,
        description,
        price,
        image: `https://picsum.photos/id/${randomNumbers[i]}/900/600`,
      };
    });

    this.storage.set('products', this.products);
  }

  private getPrice(nameLength: number, descrLength: number) {
    return Number(Math.abs(10 + nameLength * ((500 - descrLength) / (4 - nameLength))).toFixed(2));
  }

  private generateRandomText(minLength: number, maxLength: number) {
    const charSet = "ABCD EFGHIJKL MNOPQ RSTUVWXY Zabcdefghij klmn opqrst uvwxyz0123456789 ";
    const textLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let randomText = "";
  
    for (let i = 0; i < textLength; i++) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      randomText += charSet[randomIndex];
    }
  
    return randomText;
  }

  // length must be at least max - min
  private getRandomNumbers(min: number, max: number, length: number) {
    const numberArray = [];

    for (let index = min; index < max-1; index++) {
      numberArray.push(index);
    }

    this.shuffle(numberArray);

    return numberArray.slice(0, length - 1);
  }
} 