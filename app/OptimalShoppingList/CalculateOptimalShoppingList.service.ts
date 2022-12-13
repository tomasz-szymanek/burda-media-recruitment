import { injectable } from "inversify";
import { Item } from "./types/interfaces";
import "reflect-metadata";

interface KnapsackItem {
  weight: number;
  value: number;
  name: string;
}

@injectable()
export class CalculateOptimalShoppingList {
  private calculateKnapsack(
    items: KnapsackItem[],
    limit: number
  ): {
    subset: KnapsackItem[];
    maxValue: number;
  } {
    if (!items.length) {
      return { maxValue: 0, subset: [] };
    }

    const accumulator: {
      maxValue: number;
      subset: KnapsackItem[];
    }[][] = [];

    items.map((_, index) => {
      const row = [];
      for (let limitIndex = 1; limitIndex <= limit; limitIndex++) {
        row.push(getSolution(index, limitIndex));
      }
      accumulator.push(row);
    });

    return getLast();

    function getLast() {
      const lastRow = accumulator[accumulator.length - 1];
      return lastRow[lastRow.length - 1];
    }

    function getSolution(row: number, solutionLimit: number) {
      const NO_SOLUTION: {
        maxValue: number;
        subset: KnapsackItem[];
      } = {
        maxValue: 0,
        subset: [],
      };
      const column = solutionLimit - 1;
      const lastItem = items[row];
      const remaining = solutionLimit - lastItem.weight;

      const lastSolution =
        row > 0 ? accumulator[row - 1][column] || NO_SOLUTION : NO_SOLUTION;
      const lastSubSolution =
        row > 0
          ? accumulator[row - 1][remaining - 1] || NO_SOLUTION
          : NO_SOLUTION;

      if (remaining < 0) {
        return lastSolution;
      }

      const lastValue = lastSolution.maxValue;
      const lastSubValue = lastSubSolution.maxValue;

      const newValue = lastSubValue + lastItem.value;
      if (newValue >= lastValue) {
        const _lastSubSet = lastSubSolution.subset.slice();
        _lastSubSet.push(lastItem);
        return { maxValue: newValue, subset: _lastSubSet };
      } else {
        return lastSolution;
      }
    }
  }

  private parse(products: Item[]): KnapsackItem[] {
    return products.map((product) => ({
      weight: product.price,
      value: product.review_rating,
      name: product.name,
    }));
  }

  public execute = (amountOfPurchases: number, products: Item[]): Item[] => {
    const result = this.calculateKnapsack(
      this.parse(products),
      amountOfPurchases
    );

    return result.subset.map((item: KnapsackItem) => ({
      price: item.weight,
      review_rating: item.value,
      name: item.name,
    }));
  };
}
