import { injectable } from "inversify";
import { Item } from "./types/interfaces";
import "reflect-metadata";

@injectable()
export class CalculateOptimalShoppingList {
  private calculateKnapsack(
    items: { w: number; v: number; name: string }[],
    limit: number
  ): { subset: { w: number; v: number; name: string }[]; maxValue: number } {
    if (!items.length) {
      return { maxValue: 0, subset: [] };
    }

    const accumulator: {
      maxValue: number;
      subset: { w: number; v: number; name: string }[];
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
        subset: { w: number; v: number; name: string }[];
      } = {
        maxValue: 0,
        subset: [],
      };
      const column = solutionLimit - 1;
      const lastItem = items[row];
      const remaining = solutionLimit - lastItem.w;

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

      const newValue = lastSubValue + lastItem.v;
      if (newValue >= lastValue) {
        const _lastSubSet = lastSubSolution.subset.slice();
        _lastSubSet.push(lastItem);
        return { maxValue: newValue, subset: _lastSubSet };
      } else {
        return lastSolution;
      }
    }
  }

  private parse(products: Item[]): { w: number; v: number; name: string }[] {
    return products.map((product) => ({
      w: product.price,
      v: product.review_rating,
      name: product.name,
    }));
  }

  public execute = (amountOfPurchases: number, products: Item[]): Item[] => {
    const result = this.calculateKnapsack(
      this.parse(products),
      amountOfPurchases
    );

    return result.subset.map(
      (item: { w: number; v: number; name: string }) => ({
        price: item.w,
        review_rating: item.v,
        name: item.name,
      })
    );
  };
}
