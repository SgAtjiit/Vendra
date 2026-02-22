
export function isWishlisted(wishlist, product: Product) {
  return wishlist?.products.some((p) => p.id === product.id);
  
}
