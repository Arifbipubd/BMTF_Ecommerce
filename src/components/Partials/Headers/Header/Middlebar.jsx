/** @format */

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiRequest from "../../../../../utils/apiRequest";
import { fetchWishlist } from "../../../../store/wishlistData";
import Cart from "../../../Cart";
import ThinBag from "../../../Helpers/icons/ThinBag";
import Multivendor from "../../../Shared/Multivendor";
import ThinPeople from "../../../Helpers/icons/ThinPeople";
import SearchBox from "../../../Helpers/SearchBox";
import languageModel from "../../../../../utils/languageModel";
import DefaultUser from "../../../../contexts/DefaultUser";
export default function Middlebar({ className, settings }) {
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const categoryList = websiteSetup && websiteSetup.payload.productCategories;
  const router = useRouter();
  const dispatch = useDispatch();
  const { wishlistData } = useSelector((state) => state.wishlistData);
  const wishlists = wishlistData && wishlistData.wishlists;
  const [profile, setProfile] = useState(false);
  const [auth, setAuth] = useState(null);
  const [subCatHeight, setHeight] = useState(null);
  const { compareProducts } = useSelector((state) => state.compareProducts);
  const [searchToogle, setToggle] = useState(false);
  const [user, setUser] = useState(null);
  const value = useContext(DefaultUser);
  const [defaultImage, setDefaultImage] = useState(null);
  useEffect(() => {
    setUser(value.user);
  }, [value]);
  useEffect(() => {
    if (websiteSetup) {
      if (!defaultImage) {
        setDefaultImage(websiteSetup.payload?.defaultProfile.image);
      }
    }
  }, [websiteSetup, defaultImage]);

  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("auth")));
  }, []);

  const profilehandler = () => {
    setProfile(!profile);
  };
  const logout = () => {
    if (auth) {
      apiRequest.logout(auth.access_token);
      localStorage.removeItem("auth");
      localStorage.removeItem("active-user");
      dispatch(fetchWishlist());
      router.push("/login");
    }
  };
  //cart
  const { cart } = useSelector((state) => state.cart);
  const [cartItems, setCartItem] = useState(null);
  const [categoryToggle, setCateToggle] = useState(false);

  const handler = () => {
    setCateToggle(!categoryToggle);
  };

  useEffect(() => {
    let categorySelector = document.querySelector(".category-dropdown");
    setHeight(categorySelector.offsetHeight);
  }, [categoryToggle]);

  useEffect(() => {
    cart && setCartItem(cart.cartProducts);
  }, [cart]);
  const [langCntnt, setLangCntnt] = useState(null);
  useEffect(() => {
    setLangCntnt(languageModel());
  }, []);
  return (
    <div className={`w-full h-[86px] z-30 bg-whit relative ${className}`}>
      <div className='container-x mx-auto h-full'>
        <div className='relative h-full'>
          <div className='flex justify-between items-center h-full'>
            <div className='relative'>
              <Link href='/' passHref>
                <a rel='noopener noreferrer'>
                  {settings && (
                    <Image
                      width='153'
                      height='44'
                      objectFit='scale-down'
                      src={`${
                        process.env.NEXT_PUBLIC_BASE_URL + settings.logo
                      }`}
                      alt='logo'
                    />
                  )}
                </a>
              </Link>
            </div>
            <div className='nav-widget-wrapper text-black'>
              <div className='flex relative z-30'>
                <div className='nav'>
                  <ul className='nav-wrapper flex xl:space-x-10 space-x-5'>
                    {/* <li>
                      <Link href='/' passHref>
                        <a rel='noopener noreferrer'>
                          <span className='flex items-center text-sm font-600 cursor-pointer '>
                            <span>Home</span>
                          </span>
                        </a>
                      </Link>
                    </li> */}
                    <li>
                      <Link href='/about' passHref>
                        <a rel='noopener noreferrer'>
                          <span className='flex items-center text-sm font-600 cursor-pointer '>
                            <span>About Us</span>
                          </span>
                        </a>
                      </Link>
                    </li>
                    <li>
                      <div className='category-and-nav flex xl:space-x-7 space-x-3 items-center'>
                        <div className='category rounded-t-md relative'>
                          <button
                            onClick={handler}
                            type='button'
                            className='w-full h-full flex justify-between items-center'
                          >
                            <div className='flex space-x-3 items-center'>
                              {/* <span className='text-white flex justify-center items-center w-[48px] h-[48px] bg-qpurple shadow-2xl rounded-full'>
                          <svg
                            width='14'
                            height='9'
                            viewBox='0 0 14 9'
                            fill='none'
                            className='fill-current'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <rect width='14' height='1' />
                            <rect y='8' width='14' height='1' />
                            <rect y='4' width='10' height='1' />
                          </svg>
                        </span> */}
                              <span className='text-sm font-600 text-black'>
                                {langCntnt && langCntnt.All_Categories}
                              </span>
                            </div>
                          </button>
                          {categoryToggle && (
                            <>
                              <div
                                className='fixed top-0 left-0 w-full h-full -z-10'
                                onClick={handler}
                              ></div>
                            </>
                          )}
                          <div
                            style={{
                              boxShadow:
                                " 0px 15px 50px 0px rgba(0, 0, 0, 0.14)",
                            }}
                            className={`category-dropdown  w-[270px] absolute  left-0 top-[53px]  ${
                              categoryToggle ? "block" : "hidden"
                            }`}
                          >
                            <ul className='categories-list relative'>
                              {categoryList &&
                                categoryList.map((item) => (
                                  <li
                                    key={item.id}
                                    className='category-item transition-all duration-300 ease-in-out'
                                  >
                                    <Link
                                      href={{
                                        pathname: "/products",
                                        query: { category: item.slug },
                                      }}
                                      passHref
                                    >
                                      <a rel='noopener noreferrer'>
                                        <div className=' flex justify-between items-center px-5 h-10 cursor-pointer'>
                                          <div className='flex items-center space-x-6'>
                                            <span className='icon'>
                                              {/*<FontAwesomeCom*/}
                                              {/*  className="w-4 h-4"*/}
                                              {/*  icon={item.icon}*/}
                                              {/*/>*/}
                                              <Image
                                                width='20px'
                                                height='20px'
                                                objectFit='scale-down'
                                                src={
                                                  process.env
                                                    .NEXT_PUBLIC_BASE_URL +
                                                  item.image
                                                }
                                                alt=''
                                              />
                                            </span>
                                            <span className='name text-sm font-400'>
                                              {item.name}
                                            </span>
                                          </div>
                                          <div>
                                            <span className='icon-arrow'>
                                              <svg
                                                width='6'
                                                height='9'
                                                viewBox='0 0 6 9'
                                                fill='none'
                                                xmlns='http://www.w3.org/2000/svg'
                                                className='fill-current'
                                              >
                                                <rect
                                                  x='1.49805'
                                                  y='0.818359'
                                                  width='5.78538'
                                                  height='1.28564'
                                                  transform='rotate(45 1.49805 0.818359)'
                                                />
                                                <rect
                                                  x='5.58984'
                                                  y='4.90918'
                                                  width='5.78538'
                                                  height='1.28564'
                                                  transform='rotate(135 5.58984 4.90918)'
                                                />
                                              </svg>
                                            </span>
                                          </div>
                                        </div>
                                      </a>
                                    </Link>
                                    <div
                                      className={`sub-category-lvl-two absolute left-[270px] top-0 z-10 w-[270px] ${
                                        item.active_sub_categories.length > 0
                                          ? "bg-white"
                                          : ""
                                      }`}
                                      style={{ height: `${subCatHeight}px` }}
                                    >
                                      <ul className=''>
                                        {item.active_sub_categories.length >
                                          0 &&
                                          item.active_sub_categories.map(
                                            (subItem) => (
                                              <li
                                                key={subItem.id}
                                                className='category-item'
                                              >
                                                <Link
                                                  href={{
                                                    pathname: "/products",
                                                    query: {
                                                      sub_category:
                                                        subItem.slug,
                                                    },
                                                  }}
                                                  passHref
                                                >
                                                  <a rel='noopener noreferrer'>
                                                    <div className=' flex justify-between items-center px-5 h-10 transition-all duration-300 ease-in-out cursor-pointer'>
                                                      <div>
                                                        <span className='text-sm font-400'>
                                                          {subItem.name}
                                                        </span>
                                                      </div>
                                                      <div>
                                                        <span>
                                                          <svg
                                                            width='6'
                                                            height='9'
                                                            viewBox='0 0 6 9'
                                                            fill='none'
                                                            className='fill-current'
                                                            xmlns='http://www.w3.org/2000/svg'
                                                          >
                                                            <rect
                                                              x='1.49805'
                                                              y='0.818359'
                                                              width='5.78538'
                                                              height='1.28564'
                                                              transform='rotate(45 1.49805 0.818359)'
                                                            />
                                                            <rect
                                                              x='5.58984'
                                                              y='4.90918'
                                                              width='5.78538'
                                                              height='1.28564'
                                                              transform='rotate(135 5.58984 4.90918)'
                                                            />
                                                          </svg>
                                                        </span>
                                                      </div>
                                                    </div>
                                                  </a>
                                                </Link>
                                                <div
                                                  className={`sub-category-lvl-three absolute left-[270px] top-0 z-10 w-[270px] ${
                                                    subItem
                                                      .active_child_categories
                                                      .length > 0
                                                      ? "bg-white"
                                                      : ""
                                                  }`}
                                                  style={{
                                                    height: `${subCatHeight}px`,
                                                  }}
                                                >
                                                  <ul className=''>
                                                    {subItem
                                                      .active_child_categories
                                                      .length > 0 &&
                                                      subItem.active_child_categories.map(
                                                        (subsubitem) => (
                                                          <li
                                                            key={subsubitem.id}
                                                            className='category-item'
                                                          >
                                                            <Link
                                                              href={{
                                                                pathname:
                                                                  "/products",
                                                                query: {
                                                                  child_category:
                                                                    subsubitem.slug,
                                                                },
                                                              }}
                                                              passHref
                                                            >
                                                              <a rel='noopener noreferrer'>
                                                                <div className=' flex justify-between items-center px-5 h-10 transition-all duration-300 ease-in-out cursor-pointer'>
                                                                  <div>
                                                                    <span className='text-sm font-400'>
                                                                      {
                                                                        subsubitem.name
                                                                      }
                                                                    </span>
                                                                  </div>
                                                                </div>
                                                              </a>
                                                            </Link>
                                                          </li>
                                                        )
                                                      )}
                                                  </ul>
                                                </div>
                                              </li>
                                            )
                                          )}
                                      </ul>
                                    </div>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>
                    {/* <li>
                      <Link href='/blogs' passHref>
                        <a rel='noopener noreferrer'>
                          <span className='flex items-center text-sm font-600 cursor-pointer capitalize'>
                            <span>Blogs</span>
                          </span>
                        </a>
                      </Link>
                    </li> */}
                    <li>
                      <Link href='/contact' passHref>
                        <a rel='noopener noreferrer'>
                          <span className='flex items-center text-sm font-600 cursor-pointer capitalize'>
                            <span>Contact</span>
                          </span>
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
                {Multivendor() === 1 && (
                  <div className='become-seller-btn rounded-full overflow-hidden'>
                    <Link href='/become-seller' passHref>
                      <a rel='noopener noreferrer'>
                        <div className=' w-[224px] h-[52px] flex justify-center items-center cursor-pointer '>
                          <div className='flex space-x-2 items-center'>
                            <span className='text-[15px] font-600'>
                              Become Vendor
                            </span>
                            <span>
                              <svg
                                width='24'
                                height='16'
                                viewBox='0 0 24 16'
                                fill='none'
                                className='fill-current'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path d='M20.257 7.07205C20.038 7.07205 19.8474 7.07205 19.6563 7.07205C17.4825 7.07205 15.3086 7.07205 13.1352 7.07205C10.1545 7.07205 7.17336 7.0725 4.19265 7.0725C3.30392 7.0725 2.41519 7.07024 1.52646 7.07295C1.12124 7.07431 0.809811 7.25265 0.625785 7.62651C0.43866 8.00623 0.488204 8.37556 0.737704 8.70426C0.932347 8.96027 1.20529 9.08173 1.52867 9.08037C2.20948 9.07766 2.8903 9.07902 3.57111 9.07902C5.95285 9.07902 8.33415 9.07902 10.7159 9.07902C13.782 9.07902 16.8485 9.07902 19.9146 9.07902C20.0274 9.07902 20.1398 9.07902 20.2822 9.07902C20.1871 9.18332 20.1141 9.26865 20.0358 9.34857C19.5656 9.82672 19.0922 10.3022 18.6229 10.7812C18.1363 11.2779 17.6541 11.7791 17.1675 12.2757C16.4942 12.9634 15.8116 13.6415 15.1476 14.3391C14.9096 14.5893 14.8455 14.9157 14.9406 15.2575C15.156 16.0305 16.0567 16.2499 16.6119 15.6769C17.4342 14.8286 18.2655 13.9892 19.0927 13.1458C19.6948 12.5317 20.2968 11.9172 20.8985 11.3023C21.5952 10.5902 22.2911 9.87729 22.9878 9.1648C23.1059 9.04425 23.2249 8.9246 23.3435 8.8045C23.6903 8.45367 23.7239 7.84278 23.3943 7.4766C22.998 7.03683 22.5852 6.61241 22.1756 6.18573C21.7965 5.79066 21.4134 5.39965 21.0303 5.00909C20.6733 4.64473 20.3132 4.28306 19.9553 3.91915C19.6147 3.57284 19.2754 3.22563 18.9356 2.87887C18.5154 2.44948 18.0951 2.01964 17.6744 1.5907C17.2511 1.15861 16.8198 0.734188 16.4057 0.29261C16.0363 -0.101559 15.3697 -0.0816927 15.0344 0.257392C14.6238 0.672782 14.5999 1.26381 14.995 1.68552C15.3378 2.0517 15.6957 2.40342 16.0465 2.76192C16.929 3.66449 17.8111 4.56797 18.6937 5.47054C19.1829 5.97081 19.6735 6.47018 20.1632 6.97046C20.1885 6.99574 20.2123 7.02329 20.257 7.07205Z' />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div
              className={`w-full h-[240px] bg-white delay-300 shadow transition-all duration-300 ease-in-out fixed -left-0 top-0 transform ${
                searchToogle ? `translate-y-0` : "-translate-y-[100vh]"
              }`}
              style={{ zIndex: 99 }}
            >
              <div className='w-full h-full  flex justify-center items-center relative'>
                <div className='w-[620px] h-[60px]'>
                  <SearchBox />
                </div>
                <button
                  onClick={() => setToggle(!searchToogle)}
                  type='button'
                  className='text-qred absolute right-5 top-5'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M6 18L18 6M6 6l12 12'
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div
              onClick={() => setToggle(!searchToogle)}
              className={`w-full delay-50 h-screen transition-all duration-300 ease-in-out bg-black bg-opacity-50 fixed -left-0 top-0 z-40 transform ${
                searchToogle ? `translate-y-0` : "-translate-y-[100vh]"
              }`}
            ></div>
            <div className='flex space-x-6 items-center relative'>
              <div
                onClick={() => setToggle(!searchToogle)}
                className='w-[52px] h-[52px] bg-qyellow flex justify-center items-center rounded-full cursor-pointer'
              >
                <span>
                  <svg
                    width='22'
                    height='22'
                    viewBox='0 0 22 22'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M13.9708 16.4151C12.5227 17.4021 10.9758 17.9723 9.27353 18.0062C5.58462 18.0802 2.75802 16.483 1.05056 13.1945C-1.76315 7.77253 1.33485 1.37571 7.25086 0.167548C12.2281 -0.848249 17.2053 2.87895 17.7198 7.98579C17.9182 9.95558 17.5566 11.7939 16.5852 13.5061C16.4512 13.742 16.483 13.8725 16.6651 14.0553C18.2412 15.6386 19.8112 17.2272 21.3735 18.8244C22.1826 19.6513 22.2058 20.7559 21.456 21.4932C20.7697 22.1678 19.7047 22.1747 18.9764 21.4793C18.3623 20.8917 17.7774 20.2737 17.1796 19.6688C16.118 18.5929 15.0564 17.5153 13.9708 16.4151ZM2.89545 9.0364C2.91692 12.4172 5.59664 15.1164 8.91967 15.1042C12.2384 15.092 14.9138 12.3493 14.8889 8.98505C14.864 5.63213 12.1826 2.92508 8.89047 2.92857C5.58204 2.93118 2.87397 5.68958 2.89545 9.0364Z'
                      fill='#232532'
                    />
                  </svg>
                </span>
              </div>
              {/* <div className="compaire relative">
                {auth ? (
                  <Link href="/products-compaire" passHref>
                    <a
                      rel="noopener noreferrer"
                      className="flex space-x-4 items-center"
                    >
                      <span className="cursor-pointer text-[#6E6D79]">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22 11.0094C21.997 17.0881 17.0653 22.007 10.9802 22C4.90444 21.9931 -0.00941233 17.0569 1.3538e-05 10.9688C0.00943941 4.89602 4.95157 -0.0133673 11.0422 2.73441e-05C17.0961 0.013422 22.003 4.94315 22 11.0094ZM6.16553 10.7812C6.40365 7.62357 8.72192 6.28609 10.5868 6.19927C12.3305 6.11791 14.4529 7.33534 14.7465 8.61428C14.2425 8.61428 13.7459 8.61428 13.2429 8.61428C13.2429 9.02406 13.2429 9.39861 13.2429 9.79748C14.308 9.79748 15.3374 9.80641 16.3668 9.79301C16.7805 9.78755 17.0102 9.52909 17.0147 9.10046C17.0221 8.34143 17.0172 7.5824 17.0172 6.82337C17.0172 6.55795 17.0172 6.29254 17.0172 6.0311C16.5836 6.0311 16.2165 6.0311 15.7908 6.0311C15.7908 6.60459 15.7908 7.15724 15.7908 7.79374C13.9379 5.04436 10.8447 4.4545 8.48578 5.48241C6.21811 6.47064 4.90792 8.84695 5.04682 10.7817C5.40997 10.7812 5.77609 10.7812 6.16553 10.7812ZM15.8191 11.2178C15.7581 12.4576 15.3498 13.547 14.4742 14.4286C13.5976 15.3111 12.5265 15.772 11.2858 15.8008C9.57472 15.8405 7.568 14.6424 7.2495 13.3892C7.75403 13.3892 8.25013 13.3892 8.76012 13.3892C8.76012 12.9809 8.76012 12.6064 8.76012 12.2041C7.68458 12.2041 6.64178 12.1921 5.59997 12.21C5.19962 12.2169 5.00069 12.4839 4.99771 12.9442C4.99176 13.803 4.99573 14.6612 4.99573 15.52C4.99573 15.6698 4.99573 15.8196 4.99573 15.964C5.4318 15.964 5.79692 15.964 6.20224 15.964C6.20224 15.3895 6.20224 14.8418 6.20224 14.1686C7.07984 15.4912 8.16976 16.3465 9.58216 16.7617C11.0184 17.1839 12.4114 17.0494 13.7548 16.4035C15.8191 15.4113 17.0946 13.1466 16.9507 11.2178C16.5861 11.2178 16.2209 11.2178 15.8191 11.2178Z"
                            fill="#6E6D79"
                          />
                          <path
                            d="M6.16586 10.7814C5.77642 10.7814 5.4108 10.7814 5.04666 10.7814C4.90775 8.84707 6.21795 6.47026 8.48562 5.48203C10.8446 4.45411 13.9377 5.04397 15.7907 7.79335C15.7907 7.15686 15.7907 6.6042 15.7907 6.03071C16.2163 6.03071 16.5834 6.03071 17.017 6.03071C17.017 6.29166 17.017 6.55707 17.017 6.82298C17.017 7.58201 17.022 8.34104 17.0145 9.10007C17.0106 9.5287 16.7804 9.78767 16.3666 9.79263C15.3372 9.80553 14.3078 9.79709 13.2427 9.79709C13.2427 9.39823 13.2427 9.02368 13.2427 8.6139C13.7453 8.6139 14.2418 8.6139 14.7464 8.6139C14.4527 7.33545 12.3304 6.11803 10.5866 6.19889C8.72226 6.2862 6.40399 7.62369 6.16586 10.7814Z"
                            fill="white"
                          />
                          <path
                            d="M15.8188 11.2178C16.2207 11.2178 16.5863 11.2178 16.9499 11.2178C17.0938 13.1466 15.8183 15.4108 13.7541 16.4035C12.4106 17.0494 11.0176 17.1834 9.58138 16.7617C8.16948 16.3469 7.07955 15.4912 6.20146 14.1686C6.20146 14.8418 6.20146 15.3895 6.20146 15.9639C5.79664 15.9639 5.43102 15.9639 4.99495 15.9639C4.99495 15.8201 4.99495 15.6703 4.99495 15.5199C4.99495 14.6612 4.99098 13.8029 4.99693 12.9442C4.99991 12.4838 5.19884 12.2169 5.5992 12.21C6.6415 12.1916 7.6838 12.204 8.75934 12.204C8.75934 12.6064 8.75934 12.9809 8.75934 13.3892C8.24985 13.3892 7.75326 13.3892 7.24872 13.3892C7.56772 14.6428 9.57443 15.8404 11.285 15.8007C12.5257 15.772 13.5968 15.3111 14.4734 14.4285C15.349 13.547 15.7578 12.457 15.8188 11.2178Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      <span className="text-base text-qgray font-medium">
                        Compare
                      </span>
                    </a>
                  </Link>
                ) : (
                  <Link href="/login" passHref>
                    <a
                      rel="noopener noreferrer"
                      className="flex space-x-4 items-center"
                    >
                      <span className="cursor-pointer text-[#6E6D79]">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22 11.0094C21.997 17.0881 17.0653 22.007 10.9802 22C4.90444 21.9931 -0.00941233 17.0569 1.3538e-05 10.9688C0.00943941 4.89602 4.95157 -0.0133673 11.0422 2.73441e-05C17.0961 0.013422 22.003 4.94315 22 11.0094ZM6.16553 10.7812C6.40365 7.62357 8.72192 6.28609 10.5868 6.19927C12.3305 6.11791 14.4529 7.33534 14.7465 8.61428C14.2425 8.61428 13.7459 8.61428 13.2429 8.61428C13.2429 9.02406 13.2429 9.39861 13.2429 9.79748C14.308 9.79748 15.3374 9.80641 16.3668 9.79301C16.7805 9.78755 17.0102 9.52909 17.0147 9.10046C17.0221 8.34143 17.0172 7.5824 17.0172 6.82337C17.0172 6.55795 17.0172 6.29254 17.0172 6.0311C16.5836 6.0311 16.2165 6.0311 15.7908 6.0311C15.7908 6.60459 15.7908 7.15724 15.7908 7.79374C13.9379 5.04436 10.8447 4.4545 8.48578 5.48241C6.21811 6.47064 4.90792 8.84695 5.04682 10.7817C5.40997 10.7812 5.77609 10.7812 6.16553 10.7812ZM15.8191 11.2178C15.7581 12.4576 15.3498 13.547 14.4742 14.4286C13.5976 15.3111 12.5265 15.772 11.2858 15.8008C9.57472 15.8405 7.568 14.6424 7.2495 13.3892C7.75403 13.3892 8.25013 13.3892 8.76012 13.3892C8.76012 12.9809 8.76012 12.6064 8.76012 12.2041C7.68458 12.2041 6.64178 12.1921 5.59997 12.21C5.19962 12.2169 5.00069 12.4839 4.99771 12.9442C4.99176 13.803 4.99573 14.6612 4.99573 15.52C4.99573 15.6698 4.99573 15.8196 4.99573 15.964C5.4318 15.964 5.79692 15.964 6.20224 15.964C6.20224 15.3895 6.20224 14.8418 6.20224 14.1686C7.07984 15.4912 8.16976 16.3465 9.58216 16.7617C11.0184 17.1839 12.4114 17.0494 13.7548 16.4035C15.8191 15.4113 17.0946 13.1466 16.9507 11.2178C16.5861 11.2178 16.2209 11.2178 15.8191 11.2178Z"
                            fill="#6E6D79"
                          />
                          <path
                            d="M6.16586 10.7814C5.77642 10.7814 5.4108 10.7814 5.04666 10.7814C4.90775 8.84707 6.21795 6.47026 8.48562 5.48203C10.8446 4.45411 13.9377 5.04397 15.7907 7.79335C15.7907 7.15686 15.7907 6.6042 15.7907 6.03071C16.2163 6.03071 16.5834 6.03071 17.017 6.03071C17.017 6.29166 17.017 6.55707 17.017 6.82298C17.017 7.58201 17.022 8.34104 17.0145 9.10007C17.0106 9.5287 16.7804 9.78767 16.3666 9.79263C15.3372 9.80553 14.3078 9.79709 13.2427 9.79709C13.2427 9.39823 13.2427 9.02368 13.2427 8.6139C13.7453 8.6139 14.2418 8.6139 14.7464 8.6139C14.4527 7.33545 12.3304 6.11803 10.5866 6.19889C8.72226 6.2862 6.40399 7.62369 6.16586 10.7814Z"
                            fill="white"
                          />
                          <path
                            d="M15.8188 11.2178C16.2207 11.2178 16.5863 11.2178 16.9499 11.2178C17.0938 13.1466 15.8183 15.4108 13.7541 16.4035C12.4106 17.0494 11.0176 17.1834 9.58138 16.7617C8.16948 16.3469 7.07955 15.4912 6.20146 14.1686C6.20146 14.8418 6.20146 15.3895 6.20146 15.9639C5.79664 15.9639 5.43102 15.9639 4.99495 15.9639C4.99495 15.8201 4.99495 15.6703 4.99495 15.5199C4.99495 14.6612 4.99098 13.8029 4.99693 12.9442C4.99991 12.4838 5.19884 12.2169 5.5992 12.21C6.6415 12.1916 7.6838 12.204 8.75934 12.204C8.75934 12.6064 8.75934 12.9809 8.75934 13.3892C8.24985 13.3892 7.75326 13.3892 7.24872 13.3892C7.56772 14.6428 9.57443 15.8404 11.285 15.8007C12.5257 15.772 13.5968 15.3111 14.4734 14.4285C15.349 13.547 15.7578 12.457 15.8188 11.2178Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      <span className="text-base text-qgray font-medium capitalize">
                        {langCntnt && langCntnt.compare}
                      </span>
                    </a>
                  </Link>
                )}

                <span className="w-[18px] h-[18px] rounded-full  absolute -top-1.5 left-4 flex justify-center items-center text-[9px]">
                  {compareProducts ? compareProducts.products.length : 0}
                </span>
              </div> */}
              {/* <div className='favorite relative'>
                <Link href='/wishlist' passHref>
                  <a
                    rel='noopener noreferrer'
                    className='flex space-x-4 items-center'
                  >
                    <span className='cursor-pointer text-[#6E6D79]'>
                      <svg
                        width='23'
                        height='22'
                        viewBox='0 0 23 22'
                        className='fill-current'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M11.4048 3.54989C11.6188 3.30247 11.807 3.07783 12.0028 2.86001C15.0698 -0.54838 20.3879 0.51717 22.1581 4.60443C23.4189 7.5161 22.8486 10.213 20.9966 12.6962C19.6524 14.498 17.95 15.9437 16.2722 17.4108C15.0308 18.4964 13.7741 19.5642 12.5247 20.6408C11.6987 21.3523 11.1109 21.3607 10.2924 20.6397C8.05184 18.6657 5.79232 16.7125 3.59037 14.6964C2.35873 13.5686 1.33274 12.2553 0.638899 10.7086C-0.626827 7.88722 0.0325472 4.41204 2.22314 2.41034C4.84019 0.0185469 8.81764 0.369176 11.1059 3.19281C11.1968 3.30475 11.2908 3.41404 11.4048 3.54989Z' />
                      </svg>
                    </span>
                    <span className='text-base text-qgray font-medium capitalize'>
                      {langCntnt && langCntnt.Wishlist}
                    </span>
                  </a>
                </Link>
                <span className='w-[18px] h-[18px] rounded-full  absolute -top-1.5 left-4 flex justify-center items-center text-[9px]'>
                  {wishlists ? wishlists.data.length : 0}
                </span>
              </div> */}
              <div className='cart-wrapper group relative py-4'>
                <div className='cart relative cursor-pointer'>
                  <Link href='/cart' passHref>
                    <a
                      rel='noopener noreferrer'
                      className='flex space-x-4 items-center'
                    >
                      <span className='cursor-pointer text-[#6E6D79]'>
                        <ThinBag className='fill-current' />
                      </span>
                      <span className='text-base text-qgray font-medium'>
                        {langCntnt && langCntnt.Cart}
                      </span>
                    </a>
                  </Link>
                  <span className='w-[18px] h-[18px] rounded-full  absolute -top-1.5 left-4 flex justify-center items-center text-[9px]'>
                    {cartItems ? cartItems.length : 0}
                  </span>
                </div>

                <Cart className='absolute -right-[45px] top-14 z-50 hidden group-hover:block rounded' />
              </div>
              <div>
                {auth ? (
                  <>
                    {user && (
                      <button onClick={profilehandler} type='button'>
                        <div className='flex space-x-4 items-center'>
                          <div className='w-[52px] h-[52px] rounded-full bg-qyellow relative overflow-hidden'>
                            {user && user.image ? (
                              <Image
                                layout='fill'
                                objectFit='cover'
                                src={
                                  process.env.NEXT_PUBLIC_BASE_URL + user.image
                                }
                                alt='user'
                              />
                            ) : (
                              <Image
                                layout='fill'
                                objectFit='cover'
                                src={
                                  process.env.NEXT_PUBLIC_BASE_URL +
                                  defaultImage
                                }
                                alt='user'
                              />
                            )}
                          </div>
                          <div className='flex flex-col space-y-3'>
                            <h3 className='text-md text-qblack font-semibold text-start leading-none'>
                              {user.name}
                            </h3>
                            <p className='text-sm text-start text-qgray leading-none'>
                              {user.phone}
                            </p>
                          </div>
                        </div>
                      </button>
                    )}
                  </>
                ) : (
                  <Link href='/login' passHref>
                    <a rel='noopener noreferrer'>
                      <span className='cursor-pointer text-[#6E6D79]'>
                        <ThinPeople className='fill-current' />
                      </span>
                    </a>
                  </Link>
                )}
              </div>

              {profile && (
                <>
                  <div
                    onClick={() => setProfile(false)}
                    className='w-full h-full fixed top-0 left-0 z-30'
                    style={{ zIndex: "35", margin: "0" }}
                  ></div>
                  <div
                    className='w-[208px] h-[267px] bg-white absolute right-0 top-14 z-40 border-t-[3px] border-qpurple flex flex-col justify-between rounded'
                    style={{
                      boxShadow: " 0px 15px 50px 0px rgba(0, 0, 0, 0.14)",
                    }}
                  >
                    <div className='menu-item-area w-full  p-5'>
                      <ul className='w-full  flex flex-col space-y-7'>
                        <li className='text-base text-qgray'>
                          <span className='line-clamp-1'>
                            {langCntnt && langCntnt.Hi},{" "}
                            {auth && auth.user.name}{" "}
                          </span>
                        </li>
                        <li className='text-base text-qgray cursor-pointer hover:text-qblack hover:font-semibold'>
                          <Link href='/profile#dashboard' passHref>
                            <a rel='noopener noreferrer'>
                              <span className='capitalize'>
                                {langCntnt && langCntnt.profile}
                              </span>
                            </a>
                          </Link>
                        </li>
                        <li className='text-base text-qgray cursor-pointer hover:text-qblack hover:font-semibold'>
                          <Link href='/contact' passHref>
                            <a rel='noopener noreferrer'>
                              <span className='capitalize'>
                                {langCntnt && langCntnt.Support}
                              </span>
                            </a>
                          </Link>
                        </li>
                        <li className='text-base text-qgray cursor-pointer hover:text-qblack hover:font-semibold'>
                          <Link href='/faq' passHref>
                            <a rel='noopener noreferrer'>
                              <span className='capitalize'>
                                {langCntnt && langCntnt.FAQ}
                              </span>
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className='w-full h-10 flex justify-center items-center border-t border-qborder'>
                      <button
                        onClick={logout}
                        type='button'
                        className='text-qblack text-base font-semibold'
                      >
                        {langCntnt && langCntnt.Sign_Out}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
