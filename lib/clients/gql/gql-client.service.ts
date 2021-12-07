import { Inject, Injectable } from "@nestjs/common";
import Shopify from "@shopify/shopify-api";
import { ShopifyModuleFeatureOptions } from "../../interfaces/shopify-module-options.interface";
import { SHOPIFY_FEATURE_OPTIONS } from "../../shopify.constants";

@Injectable()
export class ShopifyGraphqlClient extends Shopify.Clients.Graphql {
  constructor(
    @Inject(SHOPIFY_FEATURE_OPTIONS) featureOptions: ShopifyModuleFeatureOptions
  ) {
    super(`${featureOptions.SHOP}.myshopify.com`);
  }
}
