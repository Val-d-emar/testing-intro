function addToCart(cart, product, quantity) {
  if (quantity <= 0) {
    throw new RangeError('Количество товара должно быть больше нуля');
  }

  const existingItem = cart.find((item) => item.id === product.id);
  const currentQuantity = existingItem ? existingItem.quantity : 0;
  const targetQuantity = currentQuantity + quantity;

  if (targetQuantity > product.stock) {
    throw new RangeError('Нельзя добавить больше товара, чем есть на складе');
  }

  if (existingItem) {
    return cart.map((item) =>
      item.id === product.id ? { ...item, quantity: targetQuantity } : item
    );
  }

  return [...cart, { ...product, quantity }];
}
function changeQuantity(cart, productId, quantity) {
  const targetItem = cart.find((item) => item.id === productId);

  if (!targetItem) {
    return cart;
  }

  if (quantity <= 0) {
    throw new RangeError('Количество товара должно быть больше нуля');
  }

  if (quantity > targetItem.stock) {
    throw new RangeError('Нельзя указать количество больше остатка на складе');
  }

  return cart.map((item) =>
    item.id === productId ? { ...item, quantity } : item
  );
}

function removeFromCart(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}
function calculateCartSubtotal(cart) {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}
function calculateOrderTotal(cart, promoCode = '') {
  const subtotal = calculateCartSubtotal(cart);

  const hasDiscount = promoCode === 'SAVE10' && subtotal >= 20000;
  const discount = hasDiscount ? Math.round(subtotal * 0.1) : 0;

  const delivery = subtotal >= 50000 ? 0 : 30000;

  const total = subtotal - discount + delivery;

  return {
    subtotal,
    discount,
    delivery,
    total,
  };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
