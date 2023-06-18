export interface Dictionary<T> {
  [key: string]: T;
}

export type Product = "Shampoo" | "Book";

export class Store {
  private readonly _inventory: Dictionary<number> = {};

  public hasEnoughInventory(product: Product, quantity: number): boolean {
    return this.getInventory(product) >= quantity;
  }

  public removeInventory(product: Product, quantity: number): void {
    if (!this.hasEnoughInventory(product, quantity)) {
      throw new Error("Not enough inventory");
    }

    this._inventory[product] -= quantity;
  }

  public addInventory(product: Product, quantity: number): void {
    // eslint-disable-next-line no-prototype-builtins
    if (this._inventory.hasOwnProperty(product.toString())) {
      this._inventory[product] += quantity;
    } else {
      this._inventory[product] = quantity;
    }
  }

  public getInventory(product: Product): number {
    const remaining = this._inventory[product];
    return remaining !== undefined ? remaining : 0;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class Customer {
  public purchase(store: any, product: Product, quantity: number): boolean {
    if (!store.hasEnoughInventory(product, quantity)) {
      return false;
    }

    store.removeInventory(product, quantity);

    return true;
  }
}
