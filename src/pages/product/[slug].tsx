import React, {useState} from "react";
import {client, urlFor} from "@/lib/client";
import {AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar} from "react-icons/ai";
import {Product} from "@/components";
import {useStateContext} from "@/context/StateContext";
import {ProductDto} from "@/models/ProductDto";
import {GetStaticProps} from "next";
import {ParsedUrlQuery} from "querystring";

type SlugProps = {
    products: ProductDto[],
    product: ProductDto
}

interface Params extends ParsedUrlQuery {
    slug: string
}

const ProductDetails = ({slugProps}: { slugProps: SlugProps }) => {

    const {products, product} = slugProps;
    const {image, name, details, price} = product;
    const [index, setIndex] = useState(0);
    const {decreaseQuantity, increaseQuantity, quantity, onAdd, cartItems} = useStateContext();

    return (
        <div>
            <div className="product-detail-container">
                <div className='image-container'>
                    <img src={urlFor(image && image[index])} className="product-detail-image"/>
                </div>
                <div className="small-images-container">
                    {image?.map((item, i) => (
                        <img
                            src={urlFor(item)?.toString()}
                            className={i === index ?
                                'small-image selected-image' :
                                'small-image'}
                            onMouseEnter={() => setIndex(i)}/>
                    ))}
                </div>
            </div>
            <div className="product-detail-desc">
                <h1>{name}</h1>
                <div className="reviews">
                    <div>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiOutlineStar/>
                    </div>
                    <p>
                        (20)
                    </p>
                </div>
                <h4>Details: </h4>
                <p>{details}</p>
                <p className="price">${price}</p>
                <div className="quantity">
                    <h3>Quantity</h3>
                    <p className="quantity-desc">
                        <span className="minus" onClick={decreaseQuantity}><AiOutlineMinus/></span>
                        <span className="num">{quantity}</span>
                        <span className="plus" onClick={increaseQuantity}><AiOutlinePlus/></span>
                    </p>
                </div>
                <div className="buttons">
                    <button type="button" className="add-to-cart" onClick={
                        () => onAdd(product, quantity)
                    }>Add to Cart
                    </button>
                    <button type="button" className="buy-now">Buy Now</button>

                </div>
            </div>
            <div className="maylike-products-wrapper">
                <h2>You may also like</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {products.map((item) => (
                            <Product key={item._id} product={item}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] { 
        slug { 
            current
            }
    }`;

    const products = await client.fetch(query);
    const paths = products.map((product: ProductDto) => ({
        params: {
            slug: product.slug?.current
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (context) => {

    const {slug} = context.params as Params
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]';

    const product = await client.fetch(query) as ProductDto;
    const products = await client.fetch(productsQuery) as ProductDto[];

    return {
        props: {
            slugProps: {
                products,
                product
            } as SlugProps
        }
    }
}

export default ProductDetails