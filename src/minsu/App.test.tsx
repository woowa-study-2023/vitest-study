import { expect, test } from "vitest";
import { Customer, Dictionary, Product, Store } from "../testCode/simple01";

test("고전 스타일", () => {

  const store = new Store()
  store.addInventory('Shampoo', 10)
  const customer = new Customer()

  const success = customer.purchase(store, 'Shampoo', 9)

  expect(success).toBeTruthy()
});

test("런던 스타일", () => {
  class StoreMock {
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


  const storeMock = new StoreMock()
  storeMock.addInventory('Shampoo', 10)
  
  const customer = new Customer()
  const success = customer.purchase(storeMock, 'Shampoo', 9)

  expect(success).toBeTruthy()
});
