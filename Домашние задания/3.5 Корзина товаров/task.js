const products = Array.from(document.querySelectorAll('.product'));
const cartProducts = document.querySelector('.cart__products');
const storageKey = 'cartProducts';

function saveCart() {
  const cartItems = Array.from(document.querySelectorAll('.cart__product'));
  const savedCart = cartItems.map(function (cartItem) {
    const image = cartItem.querySelector('.cart__product-image');
    const count = cartItem.querySelector('.cart__product-count');

    return {
      id: cartItem.dataset.id,
      image: image.src,
      count: count.textContent
    };
  });

  localStorage.setItem(storageKey, JSON.stringify(savedCart));
}

function createCartProduct(productId, imageSrc, countValue) {
  const cartProduct = document.createElement('div');
  cartProduct.className = 'cart__product';
  cartProduct.dataset.id = productId;

  const cartProductImage = document.createElement('img');
  cartProductImage.className = 'cart__product-image';
  cartProductImage.src = imageSrc;

  const cartProductCount = document.createElement('div');
  cartProductCount.className = 'cart__product-count';
  cartProductCount.textContent = countValue;

  cartProduct.appendChild(cartProductImage);
  cartProduct.appendChild(cartProductCount);

  return cartProduct;
}

function changeProductQuantity(event) {
  const control = event.currentTarget;
  const product = control.closest('.product');
  const quantityValue = product.querySelector('.product__quantity-value');
  let quantity = Number(quantityValue.textContent);

  if (control.classList.contains('product__quantity-control_inc')) {
    quantity += 1;
  }

  if (control.classList.contains('product__quantity-control_dec') && quantity > 1) {
    quantity -= 1;
  }

  quantityValue.textContent = quantity;
}

function animateProductToCart(startImage, targetImage) {
  const startRect = startImage.getBoundingClientRect();
  const targetRect = targetImage.getBoundingClientRect();

  const flyingImage = document.createElement('img');
  flyingImage.src = startImage.src;
  flyingImage.style.position = 'absolute';
  flyingImage.style.left = startRect.left + window.scrollX + 'px';
  flyingImage.style.top = startRect.top + window.scrollY + 'px';
  flyingImage.style.width = startRect.width + 'px';
  flyingImage.style.height = startRect.height + 'px';
  flyingImage.style.zIndex = '9999';
  flyingImage.style.pointerEvents = 'none';
  flyingImage.style.transition = 'all 0.8s ease';

  document.body.appendChild(flyingImage);

  setTimeout(function () {
    flyingImage.style.left = targetRect.left + window.scrollX + 'px';
    flyingImage.style.top = targetRect.top + window.scrollY + 'px';
    flyingImage.style.width = targetRect.width + 'px';
    flyingImage.style.height = targetRect.height + 'px';
    flyingImage.style.opacity = '0.3';
  }, 0);

  flyingImage.addEventListener('transitionend', function () {
    flyingImage.remove();
  });
}

function addProductToCart(event) {
  const addButton = event.currentTarget;
  const product = addButton.closest('.product');
  const productId = product.dataset.id;
  const productImage = product.querySelector('.product__image');
  const productImageSrc = productImage.src;
  const quantityValue = product.querySelector('.product__quantity-value');
  const selectedQuantity = Number(quantityValue.textContent);
  let existingCartProduct = cartProducts.querySelector('.cart__product[data-id="' + productId + '"]');

  if (existingCartProduct) {
    const cartProductCount = existingCartProduct.querySelector('.cart__product-count');
    const currentCount = Number(cartProductCount.textContent);

    cartProductCount.textContent = currentCount + selectedQuantity;
  } else {
    const cartProduct = createCartProduct(productId, productImageSrc, selectedQuantity);
    cartProducts.appendChild(cartProduct);
    existingCartProduct = cartProduct;
  }

  saveCart();

  const targetImage = existingCartProduct.querySelector('.cart__product-image');
  animateProductToCart(productImage, targetImage);
}

function restoreCart() {
  const savedCart = localStorage.getItem(storageKey);

  if (!savedCart) {
    return;
  }

  const cartItems = JSON.parse(savedCart);

  cartItems.forEach(function (cartItem) {
    const cartProduct = createCartProduct(cartItem.id, cartItem.image, cartItem.count);
    cartProducts.appendChild(cartProduct);
  });
}

function initProducts() {
  products.forEach(function (product) {
    const quantityControls = Array.from(product.querySelectorAll('.product__quantity-control'));
    const addButton = product.querySelector('.product__add');

    quantityControls.forEach(function (control) {
      control.addEventListener('click', changeProductQuantity);
    });

    addButton.addEventListener('click', addProductToCart);
  });
}

restoreCart();
initProducts();