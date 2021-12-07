import { DynamicModule, Module } from "@nestjs/common";
import {
  ShopifyGraphqlClientModule,
  ShopifyRestClientModule,
  ShopifyStorefrontClientModule,
} from ".";
import { ShopifyModuleFeatureOptions } from "../interfaces/shopify-module-options.interface";

@Module({})
export class ShopifyClientsModule {
  public static forRoot(): DynamicModule {
    return {
      module: ShopifyClientsModule,
      imports: [
        ShopifyRestClientModule.forFeature(),
        ShopifyGraphqlClientModule.forFeature(),
        ShopifyStorefrontClientModule.forFeature(),
      ],
      exports: [
        ShopifyRestClientModule,
        ShopifyGraphqlClientModule,
        ShopifyStorefrontClientModule,
      ],
      global: true,
    };
  }

  public static forFeature(
    options: ShopifyModuleFeatureOptions
  ): DynamicModule {
    return {
      module: ShopifyClientsModule,
      imports: [
        ShopifyRestClientModule.forFeature(options),
        ShopifyGraphqlClientModule.forFeature(options),
        ShopifyStorefrontClientModule.forFeature(options),
      ],
      exports: [
        ShopifyRestClientModule,
        ShopifyGraphqlClientModule,
        ShopifyStorefrontClientModule,
      ],
    };
  }
}
