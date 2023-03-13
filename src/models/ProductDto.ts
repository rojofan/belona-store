import {SanityImageSource} from "@sanity/image-url/lib/types/types";

export class ProductDto {
    _id?: string;
    _type?: string;
    details?: string;
    image: SanityImageSource[] = [];
    name?: string;
    price?: number;
    slug?: {
        _type: string,
        current: string
    }

    static toDto = (source: ProductDto): ProductDto => {
        return {
            _id: source._id,
            _type: source._type,
            image: source.image,
            name: source.name,
            price: source.price,
            slug: source.slug
        };
    };

    static toDtoCollection = (source: ProductDto[]): ProductDto[] => {
        let dtoColl = [] as ProductDto[];
        if (source && source.length > 0) {
            source.forEach((p: ProductDto) => {
                const prod = ProductDto.toDto(p);
                dtoColl.push(prod);
            })
        }
        return dtoColl;
    }
}