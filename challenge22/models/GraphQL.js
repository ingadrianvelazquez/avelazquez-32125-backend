import { buildSchema } from "graphql";

import ProductDto from "../dtos/ProductDto.js";
import ProductDaoFactory from "../daos/product/ProductDaoFactory.js";
const catalog = ProductDaoFactory.getDaoSource();

import CartDto from "../dtos/CartDto.js";
import CartDaoFactory from "../daos/cart/CartDaoFactory.js";
const cart = CartDaoFactory.getDaoSource();

const schema = buildSchema(`
	input ProductInput {
		name: String!,
		desc: String,
		code: String!,
		url: String,
		price: String!,
		stock: Int!
	}
	input CartInput {
		user: String!,
		products: [ProductInput!]!
	}
	type Product {
		id: ID!,
		name: String!,
		desc: String,
		code: String!,
		url: String,
		price: String!,
		stock: Int!
	}
	type Cart {
		id: ID!,
		user: String!,
		products: [ProductInput!]!
	}
	type Query {
		getProduct(id: ID!): Product,
		getProducts: [Product],
		getProductsOnCart(id: ID!): [Product]
	}
	type Mutation {
		createProduct(data: ProductInput): String,
		updateProduct(id: ID!, data: CartInput): String,
		deleteProduct(id: ID!): String,
		deleteAll: String,
		createCart(data: CartInput): String,
		addProductToCart(id: ID!, data: Product): String,
		deleteProductFromCart(id: ID!, data: ID!): String,
		deleteCart(id: ID!): String
	}
`);

const rootProduct = {
  getProduct: async (id) => res.json(await catalog.getById(id)),
  getProducts: async () => res.json(await catalog.getAll()),
  createProduct: async (data) => {
    const prod = new ProductDto(data);
    res.json(await catalog.save(prod));
  },
  updateProduct: async (id, data) => res.json(await catalog.update(id, data)),
  deleteProduct: async (id) => res.json(await catalog.deleteById(id)),
  deleteAll: async () => res.json(await catalog.deleteAll()),
};

const rootCart = {
  getProductsOnCart: async (id) => res.json(await cart.getById(req.params.id)),
  createCart: async (data) => {
    const newCart = new CartDto(data);
    res.json(await cart.save(newCart));
  },
  addProductToCart: async (id, data) => {
    const actualCart = await cart.getById(id);
    if (actualCart.error) res.json(actualCart);
    else {
      actualCart.products.push(data);
      res.json(await cart.update(id, actualCart));
    }
  },
  deleteProductFromCart: async (id, data) => {
    const actualCart = await cart.getById(id);
    if (actualCart.error) res.json(actualCart);
    else {
      const idProd = data;
      if (
        actualCart.products.find(
          (elem) => elem === idProd || elem._id.toString() === idProd
        )
      ) {
        actualCart.products = actualCart.products.filter(
          (elem) => elem !== idProd && elem._id.toString() !== idProd
        );
        res.json(await cart.update(id, actualCart));
      } else
        res.json({ error: 2, description: `Element ID ${idProd} Not Found` });
    }
  },
  deleteCart: async (id) => res.json(await cart.deleteById(id)),
};

export const configGraphqlProduct = {
  schema: schema,
  rootValue: rootProduct,
  graphiql: true,
};

export const configGraphqlCart = {
  schema: schema,
  rootValue: rootCart,
  graphiql: true,
};
