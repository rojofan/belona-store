import React from 'react';
import type {GetServerSideProps} from "next";
import {FooterBanner, HeroBanner} from "../components";
import {client} from "@/lib/client";
import {Product} from "@/components";
import {BannerDto} from "@/models/BannerDto";
import {ProductDto} from "@/models/ProductDto";

type HomeProps = {
    products: ProductDto[],
    bannerData: BannerDto[]
}

const Home = ({homeProps}: { homeProps: HomeProps }) => {

    const {products, bannerData} = homeProps;

    return (
        <div>
            <HeroBanner heroBanner={bannerData[0]}/>
            <div className={'products-heading'}>
                <h2>Best selling products</h2>
                <p>Speakers of many variations</p>
            </div>

            <div className={'products-container'}>
                {products?.map(
                    // @ts-ignore
                    (product) =>
                        <Product key={product._id} product={product}/>
                )}
            </div>
            <FooterBanner footerBanner={bannerData[0]}/>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = '*[_type == "product"]';
    const productsRes = await client.fetch(query) as BannerDto[];
    /* const products =  ProductDto.toDtoCollection(productsRes);*/
    const bannerQuery = '*[_type == "banner"]';
    const bannerDataRes = await client.fetch(bannerQuery) as BannerDto[];
    /*const bannerData = BannerDto.toDtoCollection(bannerDataRes);*/

    return {
        props: {
            homeProps: {
                products: productsRes,
                bannerData: bannerDataRes
            } as HomeProps
        }
    }
}

export default Home;