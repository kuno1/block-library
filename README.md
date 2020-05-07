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

## How blocks Work

All blocks are registered via PHP Class and JavaScripts corresponding, thus 1 block has at least 1 php file and 1 js file.

PHP files are located at [src/Kunoichi/BlockLibrary/Blocks](./src/Kunoichi/BlockLibrary/Blocks), JavaScript files are also located at [assts/js/blocks](./assets/js/blocks);

### Registered Blocks

18 blocks are available.

#### Alert `kunoichi/alert`  
Styled alert blocks.

#### Speech Bubble `kunoichi/bubble`  
Speech bubble with avatar.

#### Link Card `kunoichi/card`  
Card style link.  
*Parents*: available only in `kunoichi/cards`

#### Cards `kunoichi/cards`  
Display card style links. Helpful as category link list and so on.

#### Clipboard `kunoichi/clipboard`  
Clipboard button for copying text.

#### Call To Action `kunoichi/cta`  
Display UI parts to invoke user\'s action.  
*Dynamic Block*: see [CallToAction](./src/Kunoichi/BlockLibrary/Blocks/CallToAction.php)

#### Term `kunoichi/dt`  
Definition Term.  
*Parents*: available only in `kunoichi/definition-list`

#### Description `kunoichi/dd`  
Definition Description.  
*Parents*: available only in `kunoichi/definition-list`

#### Definition List `kunoichi/definition-list`  
Definition list.

#### Panel `kunoichi/panel`  
Panel block for emphasized and separated contents.

#### Post List `kunoichi/posts`  
Display post list in various format.  
*Dynamic Block*: see [PostList](./src/Kunoichi/BlockLibrary/Blocks/PostList.php)

#### Price Table `kunoichi/price-table`  
Display price table. Insert 3 or 4 items.

#### Price Item `kunoichi/price`  
Price item in price tables.  
*Parents*: available only in `kunoichi/price-table`

#### Step `kunoichi/step`  
Step Block  
*Parents*: available only in `kunoichi/steps`

#### How-to `kunoichi/steps`  
Step by step how-tos. Ready for JSON-LD.

#### Testimonials `kunoichi/testimonials`  
Display testimonials list.  
*Dynamic Block*: see [Testimonials](./src/Kunoichi/BlockLibrary/Blocks/Testimonials.php)

#### Tile `kunoichi/tile`  
Tile item in tiled grid.  
*Parents*: available only in `kunoichi/tiled-grid`

#### Tiled Grid `kunoichi/tiled-grid`  
Grid style layout of panel items. Ready for text & background colors.


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