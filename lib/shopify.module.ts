import { DynamicModule, Module, Provider } from "@nestjs/common";
import { Context } from "@shopify/shopify-api/dist/context";
import {
  ShopifyModuleAsyncOptions,
  ShopifyModuleFeatureOptions,
  ShopifyModuleOptions,
  ShopifyOptionsFactory,
} from "./interfaces/shopify-module-options.interface";
import {
  SHOPIFY_FEATURE_OPTIONS,
  SHOPIFY_MODULE_OPTIONS,
} from "./shopify.constants";

@Module({})
export class ShopifyModule {
  public static forRoot(options: ShopifyModuleOptions): DynamicModule {
    Context.initialize(options);
    return {
      module: ShopifyModule,
      global: true,
      providers: this._createProviders(options),
      exports: [SHOPIFY_MODULE_OPTIONS],
    };
  }
  public static forRootAsync(
    options: ShopifyModuleAsyncOptions
  ): DynamicModule {
    return {
      module: ShopifyModule,
      global: true,
      imports: options.imports,
      providers: this._createAsyncProviders(options),
      exports: [SHOPIFY_MODULE_OPTIONS],
    };
  }

  private static _createProviders(options: ShopifyModuleOptions): Provider[] {
    const providers: Provider[] = [];
    providers.push({
      provide: SHOPIFY_MODULE_OPTIONS,
      useValue: options,
    });
    if (options.SHOP) {
      providers.push({
        provide: SHOPIFY_FEATURE_OPTIONS,
        useValue: {
          SHOP: options.SHOP,
        } as ShopifyModuleFeatureOptions,
      });
    }

    return providers;
  }

  private static _createAsyncProviders(
    asyncOptions: ShopifyModuleAsyncOptions
  ): Provider[] {
    if (asyncOptions.useFactory) {
      const useFactory = asyncOptions.useFactory;
      return [
        {
          provide: SHOPIFY_MODULE_OPTIONS,
          useFactory: async (...args: any) => {
            const options = await useFactory(...args);
            Context.initialize(options);
            return options;
          },
          inject: asyncOptions.inject,
        },
      ];
    }

    if (!asyncOptions.useClass || !asyncOptions.useExisting) {
      throw new Error(
        "useFactory, useClass or useExisting must be used to resolve shopify module options"
      );
    }

    return [
      {
        provide: SHOPIFY_MODULE_OPTIONS,
        useFactory: async (factory: ShopifyOptionsFactory) => {
          const options = await factory.options();
          Context.initialize(options);
          return options;
        },
        inject: [asyncOptions.useClass || asyncOptions.useExisting],
      },
    ];
  }
}
