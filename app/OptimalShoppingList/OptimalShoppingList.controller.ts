import { inject } from "inversify/lib/annotation/inject";
import { Request, Response } from "express";
import { CalculateOptimalShoppingList } from "./CalculateOptimalShoppingList.service";
import { injectable } from "inversify";

@injectable()
export class OptimalShoppingListController {
  public constructor(
    @inject(CalculateOptimalShoppingList)
    private shoppingService: CalculateOptimalShoppingList
  ) {}

  /**
   * @openapi
   * /:
   *   post:
   *     description: Endpoint returning optimal shopping list
   *     responses:
   *       200:
   *         description: Returns optimal shopping list.
   *       400:
   *         description: Returns validation info.
   */
  public getOptimalShoppingList = (req: Request, res: Response) => {
    const { amountOfPurchases, products } = req.body;
    return res.json(this.shoppingService.execute(amountOfPurchases, products));
  };
}
