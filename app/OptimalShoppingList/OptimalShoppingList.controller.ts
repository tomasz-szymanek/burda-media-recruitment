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
   *      /get-optimal-shopping-list:
   *        post:
   *          description: Get optimal shoping list
   *          parameters:
   *            - name: products and limit
   *              in: body
   *              description: products and price limit TBD
   *          produces:
   *            - application/json
   *          responses:
   *            '200':
   *              description: 'OK'
   *            '400':
   *              description: 'bad request'
   *
   */
  public getOptimalShoppingList = (req: Request, res: Response) => {
    const { amountOfPurchases, products } = req.body;
    return res.json(this.shoppingService.execute(amountOfPurchases, products));
  };
}
