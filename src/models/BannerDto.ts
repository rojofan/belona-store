import {SanityImageSource} from "@sanity/image-url/lib/types/types";

export class BannerDto {
    _id?: string;
    _type?: string;
    image: SanityImageSource[] = [];
    buttonText?: string;
    desc?: string;
    discount?: string;
    largeText1?: string;
    largeText2?: string;
    midText?: string;
    product?: string;
    saleTime?: string;
    smallText?: string

    static toDto = (source: BannerDto): BannerDto => {

        return {
            _id: source._id,
            _type: source._type,
            image: source.image,
            buttonText: source.buttonText,
            desc: source.desc,
            discount: source.discount,
            largeText1: source.largeText1,
            largeText2: source.largeText2,
            midText: source.midText,
            product: source.product,
            saleTime: source.saleTime,
            smallText: source.smallText
        }
    }

    static toDtoCollection = (source: BannerDto[]): BannerDto[] => {
        let dtoColl = [] as BannerDto[];
        if (source && source.length > 0) {
            source.forEach((b: BannerDto) => {
                const ban = BannerDto.toDto(b);
                dtoColl.push(ban);
            })
        }
        return dtoColl;
    }
}