import Joi from "joi";

export const validationSchema = Joi.object({
  amountOfPurchases: Joi.number().integer().required(),
  products: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().alphanum().min(3).max(30).required(),
        review_rating: Joi.number().required(),
        price: Joi.number().required(),
      })
    )
    .required(),
}).required();
