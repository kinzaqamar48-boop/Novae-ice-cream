/* =========================================================
   NOVAE — COMPLETE CART SYSTEM
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       LOAD CART
    ===================================================== */

    let cart = JSON.parse(
        localStorage.getItem("novaeCart")
    ) || [];


    /* =====================================================
       SAVE CART
    ===================================================== */

    function saveCart() {

        localStorage.setItem(
            "novaeCart",
            JSON.stringify(cart)
        );

    }


    /* =====================================================
       UPDATE NAVBAR CART COUNT
    ===================================================== */

    function updateCartCount() {

        const cartCount =
            document.getElementById("cart-count");

        if (!cartCount) return;

        let total = 0;

        cart.forEach(function (item) {

            total += Number(item.quantity);

        });

        cartCount.textContent = total;

    }


    /* =====================================================
       ADD TO CART — HOME PAGE
    ===================================================== */

    const addButtons =
        document.querySelectorAll(".add-to-cart");


    addButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const name =
                button.getAttribute("data-name");

            const price =
                Number(button.getAttribute("data-price"));


            /* Find existing flavour */

            const existingItem =
                cart.find(function (item) {

                    return item.name === name;

                });


            /* If already exists */

            if (existingItem) {

                existingItem.quantity += 1;

            }

            /* If new */

            else {

                cart.push({

                    name: name,

                    price: price,

                    quantity: 1

                });

            }


            /* Save */

            saveCart();


            /* Update count */

            updateCartCount();


            /* Button animation */

            const originalText =
                button.textContent;

            button.textContent =
                "Added ✓";

            button.classList.add("added");


            /* Open cart */

            setTimeout(function () {

                window.location.href =
                    "cart.html";

            }, 700);

        });

    });


    /* =====================================================
       CART PAGE
    ===================================================== */

    const cartItems =
        document.getElementById("cart-items");


    if (cartItems) {

        displayCart();

    }


    /* =====================================================
       DISPLAY CART
    ===================================================== */

    function displayCart() {

        const emptyCart =
            document.getElementById("empty-cart");

        const cartSummary =
            document.getElementById("cart-summary");

        const cartSubtotal =
            document.getElementById("cart-subtotal");

        const cartTotal =
            document.getElementById("cart-total");


        if (!cartItems) return;


        cartItems.innerHTML = "";


        /* EMPTY CART */

        if (cart.length === 0) {

            if (emptyCart) {

                emptyCart.style.display =
                    "block";

            }

            if (cartSummary) {

                cartSummary.style.display =
                    "none";

            }

            updateCartCount();

            return;

        }


        /* CART HAS ITEMS */

        if (emptyCart) {

            emptyCart.style.display =
                "none";

        }

        if (cartSummary) {

            cartSummary.style.display =
                "block";

        }


        let subtotal = 0;


        /* CREATE ITEMS */

        cart.forEach(function (item, index) {

            const itemTotal =
                Number(item.price) *
                Number(item.quantity);


            subtotal += itemTotal;


            const itemElement =
                document.createElement("div");


            itemElement.className =
                "cart-item";


            itemElement.innerHTML = `

                <div class="cart-item-info">

                    <div class="cart-item-number">
                        ${String(index + 1).padStart(2, "0")}
                    </div>

                    <div>

                        <h3>
                            ${item.name}
                        </h3>

                        <p>
                            Rs. ${item.price} per scoop
                        </p>

                    </div>

                </div>


                <div class="quantity-control">

                    <button
                        type="button"
                        class="minus-btn"
                        data-index="${index}">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        type="button"
                        class="plus-btn"
                        data-index="${index}">
                        +
                    </button>

                </div>


                <div class="cart-item-price">

                    Rs. ${itemTotal}

                </div>


                <button
                    type="button"
                    class="remove-item"
                    data-index="${index}">

                    Remove

                </button>

            `;


            cartItems.appendChild(itemElement);

        });


        /* SUBTOTAL */

        if (cartSubtotal) {

            cartSubtotal.textContent =
                `Rs. ${subtotal}`;

        }


        /* DELIVERY */

        const delivery = 150;


        /* TOTAL */

        if (cartTotal) {

            cartTotal.textContent =
                `Rs. ${subtotal + delivery}`;

        }


        /* UPDATE COUNT */

        updateCartCount();


        /* BUTTON EVENTS */

        addCartButtonEvents();

    }


    /* =====================================================
       CART BUTTON EVENTS
    ===================================================== */

    function addCartButtonEvents() {


        /* PLUS */

        const plusButtons =
            document.querySelectorAll(".plus-btn");


        plusButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            button.getAttribute(
                                "data-index"
                            )
                        );


                    cart[index].quantity += 1;


                    saveCart();

                    displayCart();

                }
            );

        });


        /* MINUS */

        const minusButtons =
            document.querySelectorAll(".minus-btn");


        minusButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            button.getAttribute(
                                "data-index"
                            )
                        );


                    if (
                        cart[index].quantity > 1
                    ) {

                        cart[index].quantity -= 1;

                    }

                    else {

                        cart.splice(index, 1);

                    }


                    saveCart();

                    displayCart();

                }
            );

        });


        /* REMOVE */

        const removeButtons =
            document.querySelectorAll(".remove-item");


        removeButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            button.getAttribute(
                                "data-index"
                            )
                        );


                    cart.splice(index, 1);


                    saveCart();

                    displayCart();

                }
            );

        });

    }


    /* =====================================================
       INITIAL CART COUNT
    ===================================================== */

    updateCartCount();

});