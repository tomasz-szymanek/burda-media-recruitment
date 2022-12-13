import "mocha";
import { expect } from "chai";
import { container } from "../../inversify.config";
import { CalculateOptimalShoppingList } from "../CalculateOptimalShoppingList.service";

let service: CalculateOptimalShoppingList;

describe("getOptimalShoppingList", () => {
  before(async () => {
    service = container.resolve<CalculateOptimalShoppingList>(
      CalculateOptimalShoppingList
    );
  });

  it("should return correct knapsack calculation", async () => {
    const result = service.execute(218, [
      { name: "example", review_rating: 600, price: 215 },
      { name: "example2", review_rating: 2, price: 5 },
      { name: "example3", review_rating: 2, price: 2 },
      { name: "example4", review_rating: 2, price: 1 },
      { name: "example5", review_rating: 4, price: 1 },
      { name: "example6", review_rating: 3, price: 2 },
      { name: "example7", review_rating: 15, price: 4 },
    ]);

    const expectedArray = [
      {
        price: 215,
        review_rating: 600,
        name: "example",
      },
      {
        price: 1,
        review_rating: 4,
        name: "example5",
      },
      {
        price: 2,
        review_rating: 3,
        name: "example6",
      },
    ];

    expect(result).to.not.equal(null);
    expect(result).to.have.deep.members(expectedArray);
  });

  it("should return empty array when no items are passed", async () => {
    const result = service.execute(4, []);

    expect(result).to.deep.equal([]);
  });

  it("should return empty array when limit does not exceed the price of the cheapest item", async () => {
    const result = service.execute(4, [
      { name: "example", review_rating: 600, price: 215 },
      { name: "example2", review_rating: 2, price: 5 },
      { name: "example3", review_rating: 2, price: 5 },
      { name: "example4", review_rating: 2, price: 5 },
      { name: "example5", review_rating: 4, price: 5 },
      { name: "example6", review_rating: 3, price: 5 },
      { name: "example7", review_rating: 15, price: 5 },
    ]);

    expect(result).to.deep.equal([]);
  });
});
