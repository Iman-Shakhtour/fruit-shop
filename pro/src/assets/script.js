/* ===================================== 
   script.js (with "Grapes" + bonuses)
====================================== */

/* 
  1) Create an array named products which you will use 
     to add all of your product objects. 
     Now includes a 4th product: Grapes
*/
const products = [
    {
      name: 'Cherry',
      price: 2,
      quantity: 0,       
      productId: 101,
      image: 'images/Cherry.jpg',
      // basePrice so we can convert to EUR, YEN, etc.
      basePrice: 2
    },
    {
      name: 'Orange',
      price: 1,
      quantity: 0,
      productId: 102,
      image: 'images/orange.jpg',
      basePrice: 1
    },
    {
      name: 'Strawberry',
      price: 3,
      quantity: 0,
      productId: 103,
      image: 'images/strawberry.jpg',
      basePrice: 3
    },
    // New Product
    {
      name: 'Grapes',
      price: 5,
      quantity: 0,
      productId: 104,
      image: 'images/grapes.jpg', // put your own grapes.jpg in /images
      basePrice: 5
    },
    {
        name: 'Mango',
        price: 5,
        quantity: 0,
        productId: 105,
        image: 'images/Mango.jpg', // put your own grapes.jpg in /images
        basePrice: 6
      },
      {
          name: 'Apple',
          price: 5,
          quantity: 0,
          productId: 106,
          image: 'images/apple.jpg', // put your own grapes.jpg in /images
          basePrice: 3
        }
  ];
  
  /* 
    2) Declare an empty array named cart 
       to hold items in the cart
  */
  let cart = [];
  
  /* 
    3) (Optional) Keep track of how much the 
       customer has paid (across multiple attempts)
  */
  let totalPaid = 0;
  let currencySymbol = '$';
  /* 
    4) addProductToCart(productId) 
       - Find correct product, increase quantity, 
         add if not already in cart
  */
  function addProductToCart(productId) {
    const productToAdd = products.find((p) => p.productId === productId);
    if (!productToAdd) return;
  
    // If product is already in cart, just increment
    const cartItem = cart.find((item) => item.productId === productId);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      productToAdd.quantity = 1;
      cart.push(productToAdd);
    }
  }
  
  /* 
    5) increaseQuantity(productId) 
       - find product in cart and increment quantity
  */
  function increaseQuantity(productId) {
    const cartItem = cart.find((item) => item.productId === productId);
    if (cartItem) {
      cartItem.quantity++;
    }
  }
  
  /* 
    6) decreaseQuantity(productId)
       - find product, decrement quantity
       - if quantity hits 0, remove item from cart
  */
  function decreaseQuantity(productId) {
    const cartIndex = cart.findIndex((item) => item.productId === productId);
    if (cartIndex > -1) {
      cart[cartIndex].quantity--;
      if (cart[cartIndex].quantity <= 0) {
        cart[cartIndex].quantity = 0;
        cart.splice(cartIndex, 1);
      }
    }
  }
  
  /* 
    7) removeProductFromCart(productId)
       - remove product from cart entirely, reset quantity
  */
  function removeProductFromCart(productId) {
    const cartIndex = cart.findIndex((item) => item.productId === productId);
    if (cartIndex > -1) {
      cart[cartIndex].quantity = 0;
      cart.splice(cartIndex, 1);
    }
  }
  
  /* 
    8) cartTotal() 
       - sum of (price * quantity) for each product in cart
  */
  function cartTotal() {
    let total = 0;
    for (const item of cart) {
      total += item.price * item.quantity;
    }
    return total;
  }
  
  /* 
    9) emptyCart()
       - empties the cart 
       - resets each product's quantity to 0
  */
  function emptyCart() {
    // reset each product quantity
    for (let item of cart) {
      item.quantity = 0;
    }
    // clear cart array
    cart = [];
  }
  
  /* 
    10) pay(amount)
        - add amount to totalPaid
        - returns difference between totalPaid and cartTotal
  */
        function pay(amount) {
          totalPaid += amount;
        
          const difference = totalPaid - cartTotal();
        
          if (difference < 0) {
            return difference;
          } else {
           
            if (difference > amount) {
              return amount;
            } else {
              return difference;
            }
          }
        }
        
  /* 
    11) currency() 
        - adjusts each product's price using a simple rate 
          conversion from basePrice
  */
  function currency(newCurrency) {
    // approximate rates
    const usdToEur = 0.9;
    const usdToYen = 135;
  
    products.forEach((product) => {
      switch(newCurrency) {
        case 'EUR':
          product.price = Math.round(product.basePrice * usdToEur);
          break;
        case 'YEN':
          product.price = Math.round(product.basePrice * usdToYen);
          break;
        default: // 'USD'
          product.price = product.basePrice;
          break;
      }
    });
  }
  // near bottom of script.js
if (typeof module !== 'undefined') {
    module.exports = {
      products,
      cart,
      addProductToCart,
      increaseQuantity,
      decreaseQuantity,
      removeProductFromCart,
      cartTotal,
      pay,
      emptyCart,
      currency
    };
  }
  
 
  