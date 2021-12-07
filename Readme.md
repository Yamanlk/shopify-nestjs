<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" style="margin-inline-end: 25px;" alt="Nest Logo" /></a>
  <a href="http://www.shopify.com/" target="blank"><img src="./assets/shopify_glyph.svg" width="120" alt="Shopify Logo" /></a>
</p>

# Nestjs shopify client

Community libarary that provides Shopify clients for NestJS applications.  
It wraps the official shopify-node-api library in nestjs modules and services.

# Table of Contents

- [How to use](#how-to-use)
- [License](#license)

---

# How to use

## Installing Dependencies

First you neeed to install all peer dependencies

- `@shopify/shopify-api`— official shopify library
- `nestjs-shopify-client`— this library
- `@nestjs/common`— should be installed by default

<details>
  <summary>Using npm</summary>

```shell
$ npm install nestjs-shopify-client @shopify/shopify-api
```

</details>

<details>
  <summary>Using yarn</summary>

```shell
$ yarn add nestjs-shopify-client @shopify/shopify-api
```

</details>

<details>
  <summary>Using pnpm</summary>

```shell
$ pnpm install nestjs-shopify-client @shopify/shopify-api
```

</details>

## Import the ShopifyModule to you App module

Go to your app module and import the ShopifyModule using `forRoot` or `forRootAsync`

<details>
  <summary>Using forRootAsync</summary>

```typescript
@Module({
    ...
    imports: [
        ...
        ShopifyModule.forRootAsync({
            ...
            useFactory: () => {
                    return {
                        IS_EMBEDDED_APP: false,
                        API_KEY: '82b1fe5a389dceb04b3a325fe69dea0c',
                        API_SECRET_KEY: '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',
                        HOST_NAME: 'host.example.com',
                        API_VERSION: ApiVersion.October20,
                        SCOPES: ['read_analytics', 'read_content', 'write_content'],
                        SHOP: 'your-shop-name',
                        PRIVATE_APP_STOREFRONT_ACCESS_TOKEN: '5f6032684f51c721c70f065dd9dedb17',
                    }
                }
            ...
    }),
        ...
    ]
    ...
})
```

</details>

<details>
  <summary>Using forRoot</summary>

```typescript
@Module({
    ...
    imports: [
        ...
        ShopifyModule.forRoot({
            ...
            IS_EMBEDDED_APP: false,
            API_KEY: '82b1fe5a389dceb04b3a325fe69dea0c',
            API_SECRET_KEY: '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',
            HOST_NAME: 'host.example.com',
            API_VERSION: ApiVersion.October20,
            SCOPES: ['read_analytics', 'read_content', 'write_content'],
            SHOP: 'your-shop-name',
            PRIVATE_APP_STOREFRONT_ACCESS_TOKEN: '5f6032684f51c721c70f065dd9dedb17',
            ...
    }),
        ...
    ]
    ...
})
```

</details>

## Import Clients

You can import each client when you need it using `forFeature`

```typescript
@Module({
    ...
    imports: [
        ...
        ShopifyRestClientModule.forFeature()
        ...
    ]
    ...
})
```

You can also import all clients and use them across your application using `ShopifyClientsModule.forRoot` in your App module

```typescript
@Module({
    ...
    imports: [
        ...
        ShopifyClientsModule.forRoot()
        ...
    ]
    ...
})
```

## Injecting and using clients

Once a client is available in you module you can inject it directly and use it each client extends the shopify official library client so you can use it as documented [The official library readme](https://github.com/Shopify/shopify-node-api).

```typescript
  constructor(
    ...
    private _restClient: ShopifyRestClient,
    private _graphqlClient: ShopifyGraphqlClient,
    private _storefrontClient: ShopifyStorefrontClient,
    ...
  ) {}
```
