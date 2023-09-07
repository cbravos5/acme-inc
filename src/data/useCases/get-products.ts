import { Product } from "@/domain/models/Product";
import { IGetAllowedAdjectives } from "@/domain/useCases/get-allowed-adjectives";
import { IGetAllowedNouns } from "@/domain/useCases/get-allowed-nouns";
import { IGetProducts } from "@/domain/useCases/get-products";
import { LoremIpsum } from "lorem-ipsum";
import { IStorage } from "../storage/get-set-storage";
import { v4 } from "uuid";

export class GetProducts implements IGetProducts {

  private products: Product[] = [];
  private lorem = new LoremIpsum({
    wordsPerSentence: {
      max: 500,
      min: 20
    } 
  });

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
  private shuffle(items: string[]) {
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

    this.products = nouns.map((noun, i) => {
      const name = `${noun} ${adjectives[i]}`;
      const description = this.lorem.generateSentences(1);
      const price = this.getPrice(name.length, description.length);

      return {
        id: v4(),
        name,
        description,
        price,
        image: `https://picsum.photos/${i}/picsum/900/600`,
      };
    });

    this.storage.set('products', this.products);
  }

  private getPrice(nameLength: number, descrLength: number) {
    return 10 + nameLength * ((500 - descrLength) / (4 - nameLength));
  }
}