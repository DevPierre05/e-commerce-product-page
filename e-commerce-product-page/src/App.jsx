import { useState, useEffect } from 'react'
import Header from './Header'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [imageSlide, setImageSlide] = useState(1);
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderErrorMessage, setOrderErrorMessage] = useState("");
  const [openCart, setOpenCart] = useState(false);
  const [cartArray, setCartArray] = useState(() => JSON.parse(localStorage.getItem("myCart")) || []);
  const [currentOrderTotal, setCurrentOrderTotal] = useState(() => cartArray[0]?.productTotalOrder || 0);
  const [activeID, setActiveID] = useState(1);
  const [lightHouseMode, setLightHouseMode] = useState(false);
  
  //local Storage
  useEffect(() => {
    localStorage.setItem("myCart",  JSON.stringify(cartArray))
  },[cartArray])


  //useEffect to sync imageSlide and activeID
  useEffect(() => {
    setActiveID(imageSlide);
  },[imageSlide])

  //Function to click mobile menu
  const handleMenuClick = function () {
    return setMenuOpen(true);
  };

  //Function to close Mobile menu
  const handleMenuClose = function () {
    setMenuOpen(false);
    setLightHouseMode(false)
  };

  //click link to close hamburger
  const linkClicks = function () {
    setMenuOpen(false);
  };

  //Function for image slider
  const slideImageNext = function () {
    setImageSlide((prevImageSlide) => prevImageSlide + 1);
    if (imageSlide === 4) setImageSlide(1);
  };
  const slideImagePrev = function () {
    if (imageSlide === 1) return;
    setImageSlide((prevImageSlide) => prevImageSlide - 1);
  };

  //Determine the number of orders
  const orderIncrement = function () {
    setOrderTotal((prevOrderTotal) => prevOrderTotal + 1);
    if (orderTotal === 1) setOrderErrorMessage("");
  };
  const orderDecrement = function () {
    if (orderTotal === 0) return;
    setOrderTotal((prevOrderTotal) => prevOrderTotal - 1);
  };

  //Added to Cart functionality
  const addToCart = function () {
    if (orderTotal === 0) {
      setOrderErrorMessage("Please select number of items to purchase");
      setTimeout(() => {
        setOrderErrorMessage("");
      }, 3000);
      return;
    } else {
      setCurrentOrderTotal(orderTotal);
      setCartArray((prevCartArray) => {
        return [
          {
            imageUrl: "../image-product-1-thumbnail.jpg",
            productName: "Fall Limited Edition Sneakers",
            productAmount: 125,
            productTotalOrder: orderTotal,
          },
        ];
      });
    }
    setOrderTotal(0);
  };

  //Function to open and close cart
  const displayCart = function () {
    return setOpenCart((prevOpenCart) => !prevOpenCart);
  };

  //Delete functionality
  const deleteCart = function () {
    setCurrentOrderTotal(0);
    setCartArray([]);
  };

  //thumbnail click functionality
  const productEnlarger = function (e) {
    setImageSlide(Number(e.target.dataset.id));
  };

  //Function to activate lightHouse
  const handleLightHouse = function () {
    setLightHouseMode(true)
  }


  //function display of a clicked cart
  const cartDisplayProduct = function () {
    return cartArray?.map((item, i) => {
      return (
        <div key={i} className="p-8 flex flex-col gap-4">
          <div className="flex gap-4">
            <img
              src="../image-product-1-thumbnail.jpg"
              alt=""
              className="w-16 rounded-md basis-1/4"
            />
            <div className="basis-5/6 md:basis-4/6">
              <h2 className="text-slate-400 text-lg">
                Fall Limited Edition Sneakers
              </h2>
              <p>
                ${item.productAmount} x {item.productTotalOrder}
                <span className="ml-2 font-bold">
                  ${item.productAmount * item.productTotalOrder}
                </span>
              </p>
            </div>
            <svg
              onClick={deleteCart}
              className="cursor-pointer basis-1/6 text-lg text-slate-400 justify-self-end self-center"
              viewBox="0 0 24 24"
              fill="#C3CAD9"
              height="1.4em"
              width="1em"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M17 6h5v2h-2v13a1 1 0 01-1 1H5a1 1 0 01-1-1V8H2V6h5V3a1 1 0 011-1h8a1 1 0 011 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z" />
            </svg>
          </div>
          <button className="p-2 text-white rounded-lg bg-orange-600 text-center">
            Checkout
          </button>
        </div>
      );
    });
  };

  return (
    <section className="relative page max-w-full h-screen md:max-w-5xl md:mx-auto">
      {menuOpen && (
        <div
          onClick={handleMenuClose}
          className="overlay fixed inset-0 bg-[#00000080] z-10 md:hidden"
        ></div>
      )}
      {menuOpen && (
        <div className="hamburger fixed inset-0 bg-white w-3/4 z-20 md:hidden">
          <div className="p-6">
            <svg
              onClick={handleMenuClose}
              className="mb-12 cursor-pointer hover:w-26"
              width="14"
              height="15"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
                fill="#69707D"
                fillrrule="evenodd"
              />
            </svg>

            <ul className="menu-items flex flex-col gap-y-8 text-lg font-bold cursor-pointer text-slate-900 md:hidden">
              <a
                href="#"
                onClick={linkClicks}
                className="hover:text-orange-600 active:text-orange-700"
              >
                Collections
              </a>
              <a
                href="#"
                onClick={linkClicks}
                className="hover:text-orange-600 active:text-orange-700"
              >
                Men
              </a>
              <a
                href="#"
                onClick={linkClicks}
                className="hover:text-orange-600 active:text-orange-700"
              >
                Women
              </a>
              <a
                href="#"
                onClick={linkClicks}
                className="hover:text-orange-600 active:text-orange-700"
              >
                About
              </a>
              <a
                href="#"
                onClick={linkClicks}
                className="hover:text-orange-600 active:text-orange-700"
              >
                Contact
              </a>
            </ul>
          </div>
        </div>
      )}
      <Header
        menuOpen={menuOpen}
        menuClick={handleMenuClick}
        currentOrderTotal={currentOrderTotal}
        displayCart={displayCart}
      />

      {/* Lighthouse - Mode */}
      {lightHouseMode && (
        <div
          onClick={handleMenuClose}
          className="hidden md:block md:fixed md:inset-0 md:bg-[#000000b9] md:z-10"
        ></div>
      )}
      {lightHouseMode && (
        <div className="md:max-w-lg md:absolute md:inset-x-0 md:my-0 md:mx-auto md:top-26 md:z-30">
          <div className="hidden md:max-w-md md:relative md:flex flex-col items-center md:inset-x-0 md:my-0">
            <svg
              onClick={handleMenuClose}
              className="md:absolute md:-top-5 md:right-0 md:cursor-pointer"
              width="15"
              height="15"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
                fill="#ffffff"
                fillrrule="evenodd"
              />
            </svg>

            <div className="md:relative">
              <img
                src={`../image-product-${imageSlide}.jpg`}
                alt="product image"
                className="md:max-w-md md:rounded-xl md:mt-8"
              />

              <div className="hidden md:flex md:items-center md:justify-center md:p-3 md:absolute md:top-1/2 md:-left-4 md:-translate-y-1/2 md:bg-white md:rounded-full">
                <svg
                  onClick={slideImagePrev}
                  className="w-5 h-5 px-0.5"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 1 3 9l8 8"
                    stroke="#1D2026"
                    strokeWidth="2.5"
                    fill="none"
                    fillrrule="evenodd"
                  />
                </svg>
              </div>
              <div className="hidden md:flex md:items-center md:justify-center md:p-3 md:absolute md:top-1/2 md:-right-4 md:-translate-y-1/2 md:bg-white md:rounded-full">
                <svg
                  onClick={slideImageNext}
                  className="w-5 h-5 px-0.5"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m2 1 8 8-8 8"
                    stroke="#1D2026"
                    strokeWidth="2.5"
                    fill="none"
                    fillrrule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <div className="hidden md:grid md:max-w-sm md:grid-cols-4 md:justify-center md:gap-6 md:mt-8">
              <div className="bg-white rounded-lg">
                <img
                  onClick={productEnlarger}
                  src="../image-product-1-thumbnail.jpg"
                  alt="image-thumbnail"
                  data-id="1"
                  className={`w-18 h-18 rounded-lg ${
                    activeID === 1
                      ? "opacity-50 border-2 border-orange-600"
                      : "undefined"
                  }`}
                />
              </div>
              <div className="bg-white rounded-lg">
                <img
                  onClick={productEnlarger}
                  src="../image-product-2-thumbnail.jpg"
                  alt="image-thumbnail"
                  data-id="2"
                  className={`w-18 h-18 rounded-lg ${
                    activeID === 2
                      ? "opacity-50 border-2 border-orange-600"
                      : "undefined"
                  }`}
                />
              </div>
              <div className="bg-white rounded-lg">
                <img
                  onClick={productEnlarger}
                  src="../image-product-3-thumbnail.jpg"
                  alt="image-thumbnail"
                  data-id="3"
                  className={`w-18 h-18 rounded-lg ${
                    activeID === 3
                      ? "opacity-50 border-2 border-orange-600"
                      : "undefined"
                  }`}
                />
              </div>
              <div className="bg-white rounded-lg">
                <img
                  onClick={productEnlarger}
                  src="../image-product-4-thumbnail.jpg"
                  alt="image-thumbnail"
                  data-id="4"
                  className={`w-18 h-18 rounded-lg ${
                    activeID === 4
                      ? "opacity-50 border-2 border-orange-600"
                      : "undefined"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* End of Lighthouse */}

      <main className="md:mt-12 md:relative md:py-4 md:px-8 md:flex md:justify-center items-center md:gap-x-8 lg:gap-x-16">
        {/* Cart Display for MD+ */}
        {openCart && (
          <div className="absolute top-20 left-2 right-2 bg-white h-2/5 w-{0.95} z-10 rounded-lg drop-shadow-xl md:-top-10 md:w-1/2 md:ml-auto md:h-1/2">
            <h1 className="p-4 border-b font-bold text-md tracking-wide md:p-4 md:border-b md:font-bold md:text-md md:tracking-wide">
              Cart
            </h1>
            {cartArray.length === 0 ? (
              <p className="text-center mt-32 md:text-center md:mt-16">
                Your cart is empty
              </p>
            ) : (
              cartDisplayProduct()
            )}
          </div>
        )}

        <div className="relative">
          <div className="relative overflow-x-hidden">
            <img
              onClick={handleLightHouse}
              src={`../image-product-${imageSlide}.jpg`}
              alt="product image"
              className="max-w-full md:max-w-sm md:rounded-xl md:mt-4 md:cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-center p-3 absolute top-1/2 left-4 -translate-y-1/2 bg-white rounded-full md:hidden">
            <svg
              onClick={slideImagePrev}
              className="w-5 h-5 px-0.5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 1 3 9l8 8"
                stroke="#1D2026"
                strokeWidth="2.5"
                fill="none"
                fillrrule="evenodd"
              />
            </svg>
          </div>
          <div className="flex items-center justify-center p-3 absolute top-1/2 right-4 -translate-y-1/2 bg-white rounded-full md:hidden">
            <svg
              onClick={slideImageNext}
              className="w-5 h-5 px-0.5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m2 1 8 8-8 8"
                stroke="#1D2026"
                strokeWidth="2.5"
                fill="none"
                fillrrule="evenodd"
              />
            </svg>
          </div>

          <div className="hidden md:grid md:max-w-sm md:grid-cols-4 md:gap-6 md:mt-8">
            <div className="bg-white cursor-pointer">
              <img
                onClick={productEnlarger}
                src="../image-product-1-thumbnail.jpg"
                alt="image-thumbnail"
                data-id="1"
                className={`w-18 h-18 rounded-lg ${
                  activeID === 1
                    ? "opacity-50 border-2 border-orange-600"
                    : "undefined"
                }`}
              />
            </div>
            <div className="bg-white cursor-pointer">
              <img
                onClick={productEnlarger}
                src="../image-product-2-thumbnail.jpg"
                alt="image-thumbnail"
                data-id="2"
                className={`w-18 h-18 rounded-lg ${
                  activeID === 2
                    ? "opacity-50 border-2 border-orange-600"
                    : "undefined"
                }`}
              />
            </div>
            <div className="bg-white cursor-pointer">
              <img
                onClick={productEnlarger}
                src="../image-product-3-thumbnail.jpg"
                alt="image-thumbnail"
                data-id="3"
                className={`w-18 h-18 rounded-lg ${
                  activeID === 3
                    ? "opacity-50 border-2 border-orange-600"
                    : "undefined"
                }`}
              />
            </div>
            <div className="bg-white cursor-pointer">
              <img
                onClick={productEnlarger}
                src="../image-product-4-thumbnail.jpg"
                alt="image-thumbnail"
                data-id="4"
                className={`w-18 h-18 rounded-lg ${
                  activeID === 4
                    ? "opacity-50 border-2 border-orange-600"
                    : "undefined"
                }`}
              />
            </div>
          </div>
        </div>
        <div className="product-details mb-4 p-4 md:max-w-md md:px-8">
          <h2 className="company tracking-wider uppercase text-orange-500 text-sm md:text-orange-300">
            Sneaker Company
          </h2>
          <h3 className="w-3/4 mt-2 text-3xl font-semibold tracking-wide md:w-full md:mt-3">
            Fall Limited Edition Sneakers
          </h3>
          <p className="product-info mt-3 text-slate-500 md:mt-8 md:w-full md:text-sm">
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they’ll withstand everything
            the weather can offer.
          </p>
          <div className="product-amount flex items-center justify-between mt-4 md:flex-col md:items-start">
            <div className="discount flex gap-x-16 md:mt-2 md:gap-x-4">
              <p className="font-bold text-xl">$125.00</p>
              <p className="text-orange-500 font-bold px-2 bg-red-100">50%</p>
            </div>
            <p className="justify-self-end leading-8 text-slate-400">
              <strike>$250.00</strike>
            </p>
          </div>
          <div className="md:flex md:gap-x-4 mt-3">
            <div className="flex items-center justify-between mt-4 px-4 py-4 bg-slate-100 w-full rounded-md md:basis-2/5 md:py-3">
              <button onClick={orderDecrement} className="minus">
                <svg
                  width="16"
                  height="4"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsxxlink="http://www.w3.org/1999/xlink"
                >
                  <defs>
                    <path
                      d="M11.357 3.332A.641.641 0 0 0 12 2.69V.643A.641.641 0 0 0 11.357 0H.643A.641.641 0 0 0 0 .643v2.046c0 .357.287.643.643.643h10.714Z"
                      id="a"
                    />
                  </defs>
                  <use fill="#FF7E1B" fillrrule="nonzero" xlinkHref="#a" />
                </svg>
              </button>
              <p className="number-items font-bold">{orderTotal}</p>
              <button onClick={orderIncrement} className="plus">
                <svg
                  width="16"
                  height="12"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsxxlink="http://www.w3.org/1999/xlink"
                >
                  <defs>
                    <path
                      d="M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.641.641 0 0 0 .643-.643v-3.69h3.691A.641.641 0 0 0 12 7.022Z"
                      id="b"
                    />
                  </defs>
                  <use fill="#FF7E1B" fillrrule="nonzero" xlinkHref="#b" />
                </svg>
              </button>
            </div>
            <button
              onClick={addToCart}
              className="mt-4 w-full flex justify-center items-center bg-orange-500 text-white rounded-md py-4 md:basis-3/5 md:py-3"
            >
              <div>
                <svg className="w-10 h-5" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                    fill="#ffffff"
                    fillrrule="nonzero"
                  />
                </svg>
              </div>
              <p>Add to cart</p>
            </button>
            <p className="text-center mt-2 text-amber-600 md:hidden">
              {orderErrorMessage}
            </p>
          </div>
          <p className="md:text-center md:mt-4 md:text-amber-600">
            {orderErrorMessage}
          </p>
        </div>
      </main>
    </section>
  );
}

export default App
