import { ModuleMetadata, Type } from "@nestjs/common";
import { ContextParams } from "@shopify/shopify-api";

export interface ShopifyModuleOptions
  extends ContextParams,
    Partial<ShopifyModuleFeatureOptions> {}

export interface ShopifyModuleFeatureOptions {
  /**
   * @description your shop id - ex : if your domain is `yourshop.myshopify.com` then the id is `yourshop`
   */
  SHOP: string;
}

export interface ShopifyOptionsFactory {
  options(): ShopifyModuleOptions;
}

export interface ShopifyModuleAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  useExisting?: Type<ShopifyOptionsFactory>;
  useClass?: Type<ShopifyOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<ShopifyModuleOptions> | ShopifyModuleOptions;
  inject?: any[];
}
