import crypto from "crypto";
import axios from "axios";
import querystring from "querystring";
import {
  be_domain,
  fe_domain,
  shopify_api_key,
  shopify_api_secret,
} from "../../config/default";
import logger from "../utils/logger";
import {
  createStore,
  deleteStore,
  findOneStore,
  updateStore,
} from "../services/store";
import { bulkCreateStoreProducts, findOne } from "../services/store-products";
import { registerWebhook } from "./webhook";

export async function installApp(req, res) {
  try {
    const apiKey = shopify_api_key;
    const scopes =
      "read_products,read_orders, read_analytics, read_orders, read_product_feeds, read_product_listings, read_products";

    const shop = req.query.shop || "xg-dev";
    const email = req.query.email || "ravi149185@gmail.com";

    if (!shop) {
      res.send("Shop parameter is missing");
      return;
    }

    const storeData = await findOneStore({
      storeName: shop,
      isAppInstall: true,
    });

    if (!storeData) {
      await createStore({ shop, email });
    }

    if (storeData && storeData.isAppInstall) {
      return res.send("App already installed");
    }

    const nonce = crypto.randomBytes(8).toString("hex");
    const redirectUri = `${be_domain}/shopify/oauth/callback`;
    const authUrl = `https://${shop}.myshopify.com/admin/oauth/authorize?client_id=${apiKey}&scope=${scopes}&redirect_uri=${redirectUri}&state=${nonce}`;

    const response = {
      authUrl,
    };
    res.status(200).send(response);
  } catch (error) {
    logger.error(error);
  }
}

export async function oAuthCallback(req, res) {
  const apiKey = shopify_api_key;
  const apiSecret = shopify_api_secret;
  const { code, shop, state } = req.query;

  if (!code || !shop || !state) {
    res.send("Missing code or shop or state parameter");
    return;
  }

  console.log("code", code, "shop", shop, "nonce", state);

  const accessTokenUrl = `https://${shop}/admin/oauth/access_token`;
  const accessParams = {
    client_id: apiKey,
    client_secret: apiSecret,
    code,
  };

  try {
    const response = await axios.post(
      accessTokenUrl,
      querystring.stringify(accessParams),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token } = response.data;
    const storeName = shop.split(".")[0];
    const storeData = await findOneStore({ storeName });

    if (!storeData) {
      return res.send("Store not found");
    }

    await updateStore(
      { accessToken: access_token, isAppInstall: true, state: state },
      { storeName }
    );

    await registerWebhook(shop, access_token);
    await fetchAllProducts(storeName);

    // res.send("Successfully connected to Shopify!");
    return res.redirect(`${fe_domain}/dashboard`);
  } catch (error) {
    logger.error(error);
    res.send("Error while OAuth process");
  }
}

// Import necessary modules and dependencies
export async function uninstallApp(req, res) {
  try {
    const { shop, email } = req.body;

    if (!shop) {
      res.status(400).send("Missing shop parameter");
      return;
    }

    const storeData = await findOneStore({ storeName: shop, email });
    if (!storeData) {
      res.status(404).send("Store not found");
      return;
    }

    const revokeUrl = `https://${shop}.myshopify.com/admin/api_permissions/current.json`;
    const headers = {
      "X-Shopify-Access-Token": storeData.accessToken,
      content_type: "application/json",
      accept: "application/json",
    };

    const response = await axios.delete(revokeUrl, {
      headers,
    });

    if (response.status !== 200) {
      res.status(500).send("Error while uninstalling app");
      return;
    }

    await deleteStore({ storeName: shop, email });

    res.send("App successfully uninstalled");
  } catch (error) {
    logger.error(error);
    res.status(500).send("Internal Server Error");
  }
}

export async function fetchAllProducts(storeName) {
  try {
    const storeData = await findOneStore({
      storeName: storeName,
      isAppInstall: true,
    });

    if (!storeData) {
      return "Store not found or app not installed";
    }

    const accessToken = storeData.accessToken;

    // Fetch products from Shopify using the accessToken
    const shopifyApiUrl = `https://${storeName}.myshopify.com/admin/api/2023-10/products.json`;

    const response = await axios.get(shopifyApiUrl, {
      headers: {
        "X-Shopify-Access-Token": accessToken,
      },
    });

    const products = response.data.products;

    let productsData = [];
    await Promise.all(
      products.map(async (product) => {
        const { title, id, handle } = product;
        const storeId = storeData.id;

        productsData.push({
          storeId,
          productTitle: title,
          productSlug: handle,
          productId: id,
          metadata: product,
        });
      })
    );

    await bulkCreateStoreProducts(productsData);

    return products;
  } catch (error) {
    logger.error(error);
  }
}

export async function fetchProducts(req, res) {
  try {
    const { shop } = req.query;

    if (!shop) {
      res.status(400).send("Missing shop parameter");
      return;
    }

    const storeData = await findOneStore({
      storeName: shop,
      isAppInstall: true,
    });

    if (!storeData) {
      res.status(404).send("Store not found or app not installed");
      return;
    }

    const accessToken = storeData.accessToken;

    // Fetch products from Shopify using the accessToken
    const shopifyApiUrl = `https://${shop}.myshopify.com/admin/api/2023-10/products.json`;

    const response = await axios.get(shopifyApiUrl, {
      headers: {
        "X-Shopify-Access-Token": accessToken,
      },
    });

    const products = response.data.products;

    let productsData = [];
    await Promise.all(
      products.map(async (product) => {
        const { title, id, handle } = product;
        const storeId = storeData.id;

        productsData.push({
          storeId,
          productTitle: title,
          productSlug: handle,
          productId: id,
          metadata: product,
        });
      })
    );

    await bulkCreateStoreProducts(productsData);

    res.json(products);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Internal Server Error");
  }
}

export async function fetchOneProduct(req, res) {
  try {
    const { productSlug } = req.body;

    const product = await findOne({ productSlug });

    if (!product) {
      return res.status(400).send("Product not found");
    }

    return res.status(200).send(product);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Internal Server Error");
  }
}
