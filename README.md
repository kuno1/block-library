# Kunoich Block Library

A block library for WordPress theme.

## Installation

```
composer require kunoichi/block-library
```

## Activate

First, load autoloader in your theme's `functions.php`.

```php
require __DIR__ . '/vendor/autoload.php';
```

2nd, enable block library.

```php
Kunoichi\BlockLibrary::enable();
```

## Choose Blocks

If you want select blocks to be enabled, explicitly delcare the class names.

```php
Kunoichi\BlockLibrary::enable( [
	\Kunoichi\BlockLibrary\Blocks\PostList::class,
	\Kunoichi\BlockLibrary\Blocks\BubbleBlock::class,
] );
```

Available block classes are located in `src/Kunoichi/BlockLibrary/Blocks`.

Or else, you can exclude unwanted blocks with 2nd parameter.

```php
// 1st param is inclusive, 2nd param is exclusive.
Kunoichi\BlockLibrary::enable( [], [
	\Kunoichi\BlockLibrary\Blocks\PriceTable::class,
] );
```

## Widgets

You can enable widgets in the same way as blocks.

```php
\Kunoichi\BlockLibrary::widgets();
```

This method also has `$includes` and `$excludes` params.

## Development

This library is not plugin, so it does no effect by itself.
Please make a empty theme and load from it.

### Build Assets

This library build assets with npm.

```
# Install npm.
npm install
# Build assets.
npm run package
# Watch changes.
npm run watch
```

## License

This library is licensed under GPL 3.0 and later.

&copy; 2019 Kunoichi INC.