import { DynamicModule, Module, Provider } from "@nestjs/common";
import {
  ShopifyModuleFeatureOptions,
  ShopifyModuleOptions,
} from "../../interfaces/shopify-module-options.interface";
import {
  SHOPIFY_FEATURE_OPTIONS,
  SHOPIFY_MODULE_OPTIONS,
} from "../../shopify.constants";
import { ShopifyGraphqlClient } from "./gql-client.service";

@Module({})
export class ShopifyGraphqlClientModule {
  public static forFeature(
    options?: ShopifyModuleFeatureOptions
  ): DynamicModule {
    return {
      module: ShopifyGraphqlClientModule,
      providers: options
        ? this._createOptionsProviders(options)
        : this._createGlobalOptionsProviders(),
      exports: [ShopifyGraphqlClient],
    };
  }

  private static _createGlobalOptionsProviders(): Provider[] {
    return [
      {
        provide: SHOPIFY_FEATURE_OPTIONS,
        useFactory: (shopifyModuleOptions: ShopifyModuleOptions) => {
          if (!shopifyModuleOptions.SHOP) {
            throw new Error(
              "Please add SHOP property to your global shopify module config or use forFeature method to provide the SHOP value"
            );
          }
          return {
            SHOP: shopifyModuleOptions.SHOP,
          } as ShopifyModuleFeatureOptions;
        },
        inject: [SHOPIFY_MODULE_OPTIONS],
      },
      ShopifyGraphqlClient,
    ];
  }
  private static _createOptionsProviders(
    options: ShopifyModuleFeatureOptions
  ): Provider[] {
    return [
      { provide: SHOPIFY_FEATURE_OPTIONS, useValue: options },
      ShopifyGraphqlClient,
    ];
  }
}
