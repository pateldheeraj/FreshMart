export const priceWithDiscount = (price,dis) => {
    const discountNumber= Math.ceil((Number(price) * Number(dis)) / 100)
    const actualPrice = Number(price) - discountNumber
    return actualPrice
} 