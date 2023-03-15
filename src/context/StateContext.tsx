import React, {createContext, useContext, useState} from "react";
import {toast} from "react-hot-toast";
import {ProductDto} from "@/models/ProductDto";
import {CartItemDto} from "@/models/CartItemDto";
import {number} from "prop-types";

const AppContext = createContext({
    showCart: Boolean,
    cartItems: [] as (CartItemDto | undefined)[],
    setCartItems: (newCartItems: CartItemDto[]) => {},
    totalPrice: number,
    setTotalPrice: (value: number) => {},
    totalQuantities: number,
    setTotalQuantities: (value: number) => {},
    quantity: number,
    setShowCart: (value: boolean) => {},
    increaseQuantity: (product: ProductDto, quantity: number) => {},
    decreaseQuantity: (product: ProductDto, quantity: number) => {},
    onAdd: (product: ProductDto, quantity: number) => {},
    toggleCartItemQuantity: (id: string, value: string) => {},
    onRemove: (product: CartItemDto | undefined) => {}
});

export const StateContext = (props: { children: React.ReactNode }) => {

    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([] as (CartItemDto | undefined)[]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [quantity, setQuantity] = useState(1);
    let foundProduct: (CartItemDto | undefined);

    const onAdd = (product: ProductDto, quantity: number): void => {
        const isProductAlreadyInCart = cartItems.find((item) => item?._id === product._id);

        // @ts-ignore
        setTotalPrice((prevTotalPrice) => prevTotalPrice + (product.price * quantity));
        setTotalQuantities((preTotalQuantities) => preTotalQuantities + quantity);

        if (isProductAlreadyInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct?._id === product._id) return {
                    ...cartProduct,
                    // @ts-ignore
                    quantity: cartProduct?.quantity + quantity
                } as CartItemDto
            })

            setCartItems(updatedCartItems);
        } else {
            setCartItems([...cartItems, {...product, quantity}])
        }
        toast.success(`${quantity} ${product.name} added to the cart.`)
    }
    const onRemove = (product: CartItemDto | undefined): void => {
        // @ts-ignore
        foundProduct = cartItems.find((item) => item?._id === product._id);
        // @ts-ignore
        const newCartItems = cartItems.filter((item) => item?._id !== product._id);

        setCartItems(newCartItems);
        // @ts-ignore
        setTotalPrice((prevTotalPrice) => prevTotalPrice - (foundProduct.price * foundProduct.quantity));
        // @ts-ignore
        setTotalQuantities((prevTotalQuantity) => prevTotalQuantity - product.quantity);

    }
    const toggleCartItemQuantity = (id: string, value: string): void => {
        foundProduct = cartItems.find((item) => item?._id === id);
        const cartItemsFiltered = cartItems.filter((item) => item?._id !== id);

        if (value === 'increment') {
            // @ts-ignore
            const newCartItem = [...cartItemsFiltered, {...foundProduct, quantity: foundProduct.quantity + 1}]
            // @ts-ignore
            setCartItems(newCartItem);
            // @ts-ignore
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + 1)
        } else if (value === 'decrement') {
            // @ts-ignore
            if (foundProduct.quantity > 1) {
                // @ts-ignore
                const newCartItem = [...cartItemsFiltered, {...foundProduct, quantity: foundProduct.quantity - 1}]
                // @ts-ignore
                setCartItems(newCartItem);
                // @ts-ignore
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
                setTotalQuantities((prevTotalQuantity) => prevTotalQuantity - 1)
            }
        }
    }
    const increaseQuantity = (): void => {
        setQuantity((prevQty) => prevQty + 1);
    }
    const decreaseQuantity = (): void => {
        setQuantity((prevQty) => {
            if (prevQty - 1 < 1) return 1;
            return prevQty - 1;
        });
    }

    return (
        <AppContext.Provider
            value={{
                // @ts-ignore
                showCart,
                cartItems,
                setCartItems,
                // @ts-ignore
                totalPrice,
                setTotalPrice,
                // @ts-ignore
                totalQuantities,
                setTotalQuantities,
                // @ts-ignore
                quantity,
                increaseQuantity,
                decreaseQuantity,
                onAdd,
                setShowCart,
                toggleCartItemQuantity,
                onRemove
            }}>
            {props.children}
        </AppContext.Provider>
    )
}

export const useStateContext = () => useContext(AppContext)