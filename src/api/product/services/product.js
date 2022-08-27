'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async findElementsProducts( ctx ) {
        let entities;

        const result = await strapi
            .query( 'products' )
            .model.query( qb => {
                qb.where( 'brand', 'LIKE', "%elements%" );
            } )
            .fetchAll();

        entities = result;

        return entities.slice( 0, 6 );
    },
    async findProducts( ctx ) {
        let products;

        products = await strapi
            .query( 'products' )
            .model.query( qb => {
                qb.where( 'brand', 'LIKE', '%')
                    .orWhere( 'brand', 'LIKE', '%');
            } )
            .fetchAll();

       

        return { 'products': products};
    },
    async findBySlug( ctx ) {
        const { slug } = ctx.params;
        let categories, filteredProductIds = [];

        const entity = await strapi.query( 'product' )
            .model.query( qb => {
                qb.where( "slug", slug );
            } )
            .fetch();

        const category = entity.toJSON().category;

        for ( let i = 0; i < category.length; i++ ) {
            categories = await strapi.query( 'categories' )
                .model.query( qb => {
                    qb.where( 'name', category[ i ].name );
                } )
                .fetch();
            let ids = categories.toJSON().products.reduce( ( acc, cur ) => {
                return [ ...acc, cur.id ];
            }, [] );

            filteredProductIds = [ ...filteredProductIds, ...ids ];
        }

        filteredProductIds = filteredProductIds.reduce( ( acc, cur ) => {
            if ( acc.includes( cur ) ) return acc;
            return [ ...acc, cur ]
        }, [] );

        filteredProductIds = filteredProductIds.sort( function ( a, b ) {
            return a - b;
        } )

        const relatedEntities = await strapi.query( 'products' )
            .model.query( qb => {
                qb.select( 'id', 'name', 'shortdescription', 'sku', 'price', 'brand', 'review', 'ratings', 'stock', 'top', 'featured', 'new', 'until', 'slug', 'author' )
                    .whereIn( 'id', filteredProductIds );
            } )
            .fetchAll();
        let relatedProducts = relatedEntities.toJSON();
        relatedProducts = relatedProducts.filter( product => {
            return product.brand.split( ',' ).indexOf( 'elements' ) > -1;
        } )

        var curIndex = -1;
        var prevProduct = null;
        var nextProduct = null;
        relatedProducts.map( ( item, index ) => {
            if ( item[ 'id' ] == entity.id ) curIndex = index;
        } );
        if ( curIndex >= 1 )
            prevProduct = relatedProducts[ curIndex - 1 ];
        else prevProduct = null;

        if ( curIndex < relatedProducts.length - 1 )
            nextProduct = relatedProducts[ curIndex + 1 ];
        else nextProduct = null;

        relatedProducts = relatedProducts.filter( product => {
            return product.id !== entity.id;
        } )

        return { 'products': entity, 'relatedProducts': relatedProducts.slice( 0, 5 ), 'prevProduct': prevProduct, 'nextProduct': nextProduct };
    },
    async findShopProducts( ctx ) {
        const { category } = ctx.query;
        let page;
        page = ctx.query.page ? ctx.query.page : 1;
        const { perPage } = ctx.query;
        let minPrice, maxPrice;
        minPrice = ctx.query.minPrice ? ctx.query.minPrice : 0;
        maxPrice = ctx.query.maxPrice ? ctx.query.maxPrice : 10000;
        const { brand } = ctx.query;
        const { rating } = ctx.query;
        const { size } = ctx.query;
        const { color } = ctx.query;
        const { orderBy } = ctx.query;
        const { searchTerm } = ctx.query;
        let sizeArray = [];

        sizeArray = size ? size.split( ',' ) : [];

        for ( let i = 0; i < sizeArray.length; i++ ) {
            if ( sizeArray[ i ] == "XS" ) sizeArray[ i ] = "Extra Small";
            else if ( sizeArray[ i ] == "S" ) sizeArray[ i ] = "Small";
            else if ( sizeArray[ i ] == "M" ) sizeArray[ i ] = "Medium";
            else if ( sizeArray[ i ] == "L" ) sizeArray[ i ] = "Large";
            else if ( sizeArray[ i ] == "XL" ) sizeArray[ i ] = "Extra Large";
        }

        let totalProducts;
        totalProducts = await strapi.query( 'products' ).model.query( qb => {
            qb.where( 'brand', 'LIKE', '%elements%' )
                .orWhere( 'brand', 'LIKE', '%' )
                .orWhere( 'brand', 'LIKE', '%' );
        } )
            .fetchAll();

        totalProducts = totalProducts.toJSON();

        let filteredProducts = totalProducts.filter( product => {
            let categoryFlag = false;
            if ( category ) {
                for ( let i = 0; i < product.category.length; i++ ) {
                    product.category[ i ].slug === category && ( categoryFlag = true );
                }
            } else {
                categoryFlag = true;
            }

            let brandFlag = false;
            if ( brand ) {
                brand.split( ',' ).map( brand => {
                    for ( let i = 0; i < product.brands.length; i++ ) {
                        product.brands[ i ].slug === brand && ( brandFlag = true );
                    }
                } )
            } else {
                brandFlag = true;
            }

            let ratingFlag = false;
            if ( rating ) {
                rating.split( ',' ).map( rating => {
                    product.ratings === parseInt( rating ) && ( ratingFlag = true );
                } )
            } else {
                ratingFlag = true;
            }

            let searchFlag = false;
            if ( searchTerm ) {
                product.slug.includes( searchTerm ) && ( searchFlag = true );
            } else {
                searchFlag = true;
            }

            let sizeFlag = false;
            let colorFlag = false;
            if ( product.variants.length > 0 && size ) {
                sizeArray.map( size => {
                    for ( let i = 0; i < product.variants.length; i++ ) {
                        for ( let j = 0; j < product.variants[ i ].size.length; j++ ) {
                            product.variants[ i ].size[ j ].name === size && ( sizeFlag = true );
                        }
                    }
                } )
            } else {
                sizeFlag = true;
            }
            if ( product.variants.length > 0 && color ) {
                color.split( ',' ).map( color => {
                    for ( let i = 0; i < product.variants.length; i++ ) {
                        product.variants[ i ].color_name === color && ( colorFlag = true );
                    }
                } )
            } else {
                colorFlag = true;
            }

            let priceFlag = false;
            if ( product.variants.length > 0 ) {
                let k = true;
                for ( let i = 0; i < product.variants.length; i++ ) {
                    if ( minPrice > product.variants[ i ].price || product.variants[ i ].price > maxPrice )
                        k = false;
                }
                if ( k ) priceFlag = true;
            } else if ( product.sale_price !== null ) {
                ( minPrice < product.sale_price && product.sale_price < maxPrice ) && ( priceFlag = true );
            } else {
                ( minPrice < product.price && product.price < maxPrice ) && ( priceFlag = true );
            }

            return categoryFlag && brandFlag && sizeFlag && colorFlag && priceFlag && ratingFlag && searchFlag;
        } )

        filteredProducts = filteredProducts.sort( ( a, b ) => {
            return a.id - b.id;
        } )

        switch ( orderBy ) {
            case 'new':
                filteredProducts.sort( ( a, b ) => {
                    var newA = ( a.new === true ? 1 : 0 );
                    var newB = ( b.new === true ? 1 : 0 );
                    if ( newA < newB ) {
                        return 1;
                    } else if ( newA === newB ) {
                        return 0;
                    } else {
                        return -1;
                    }
                } );
                break;
            case 'featured':
                filteredProducts.sort( ( a, b ) => {
                    var featuredA = ( a.featured === true ? 1 : 0 );
                    var featuredB = ( b.featured === true ? 1 : 0 );
                    if ( featuredA < featuredB ) {
                        return 1;
                    } else if ( featuredA === featuredB ) {
                        return 0;
                    } else {
                        return -1;
                    }
                } );
                break;
            case 'rating':
                filteredProducts.sort( ( a, b ) => {
                    return b.ratings - a.ratings;
                } );
                break;
            case 'high-to-low':
                filteredProducts.sort( ( a, b ) => {
                    var priceA = a.salePrice ? a.salePrice : a.price;
                    var priceB = b.salePrice ? b.salePrice : b.price;

                    return priceB - priceA;
                } );
                break;
            case 'low-to-high':
                filteredProducts.sort( ( a, b ) => {
                    var priceA = a.salePrice ? a.salePrice : a.price;
                    var priceB = b.salePrice ? b.salePrice : b.price;

                    return priceA - priceB;
                } );
                break;
            default:
                break;
        }

        return { 'totalCount': filteredProducts.length, 'products': filteredProducts.slice( ( page - 1 ) * perPage, page * perPage ) };
    },
    async findSearchedProducts( ctx ) {
        const { searchTerm } = ctx.query;
        const { category } = ctx.query;

        let products, searchedProducts;

        products = await strapi.query( 'products' ).model.query( qb => {
            qb.where( 'brand', 'LIKE', '%')
                .orWhere( 'brand', 'LIKE', '%')
                .orWhere( 'brand', 'LIKE', '%elements%' );
        } )
            .fetchAll();

        products = products.toJSON();
        let k = 0;
        if ( category ) {
            products = products.filter( product => {
                let flag = false;
                for ( let i = 0; i < product.category.length; i++ ) {
                    category == product.category[ i ].slug && ( flag = true );
                }
                return flag;
            } )
        }
        searchedProducts = products.filter( product => {
            return product.slug.includes( searchTerm );
        } )

        return searchedProducts;
    }
};


const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::products.products');
