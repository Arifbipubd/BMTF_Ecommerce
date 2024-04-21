/** @format */

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Multivendor from "../../../Shared/Multivendor";
import languageModel from "../../../../../utils/languageModel";
import React from "react";
// import FontAwesomeCom from "../../../Helpers/icons/FontAwesomeCom";
import Image from "next/image";

export default function Navbar({ className }) {
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const categoryList = websiteSetup && websiteSetup.payload.productCategories;
  const mageMenuList = websiteSetup && websiteSetup.payload.megaMenuCategories;
  const megaMenuBanner = websiteSetup && websiteSetup.payload.megaMenuBanner;
  const customPages = websiteSetup && websiteSetup.payload.customPages;
  const [categoryToggle, setToggle] = useState(false);
  const [subCatHeight, setHeight] = useState(null);
  const handler = () => {
    setToggle(!categoryToggle);
  };

  useEffect(() => {
    let categorySelector = document.querySelector(".category-dropdown");
    setHeight(categorySelector.offsetHeight);
  }, [categoryToggle]);
  const [langCntnt, setLangCntnt] = useState(null);
  useEffect(() => {
    setLangCntnt(languageModel());
  }, []);
  return (
    <div
      className={`nav-widget-wrapper w-full  h-[70px] relative z-30  ${
        className || ""
      }`}
    >
      <div className='container-x mx-auto h-full'>
        <div className='w-full h-full relative'>
          <div className='w-full h-full flex justify-between items-center'>
            <div className='category-and-nav flex xl:space-x-7 space-x-3 items-center'>
              <div className='category rounded-t-md relative'>
                <button
                  onClick={handler}
                  type='button'
                  className='w-full h-full flex justify-between items-center'
                >
                  <div className='flex space-x-3 items-center'>
                    <span className='text-white flex justify-center items-center w-[48px] h-[48px] bg-qpurple shadow-2xl rounded-full'>
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
                    </span>
                    <span className='text-sm font-600 text-white'>
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
                    boxShadow: " 0px 15px 50px 0px rgba(0, 0, 0, 0.14)",
                  }}
                  className={`category-dropdown  w-[270px] absolute left-0 top-[60px]  ${
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
                                        process.env.NEXT_PUBLIC_BASE_URL +
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
                              {item.active_sub_categories.length > 0 &&
                                item.active_sub_categories.map((subItem) => (
                                  <li
                                    key={subItem.id}
                                    className='category-item'
                                  >
                                    <Link
                                      href={{
                                        pathname: "/products",
                                        query: { sub_category: subItem.slug },
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
                                        subItem.active_child_categories.length >
                                        0
                                          ? "bg-white"
                                          : ""
                                      }`}
                                      style={{ height: `${subCatHeight}px` }}
                                    >
                                      <ul className=''>
                                        {subItem.active_child_categories
                                          .length > 0 &&
                                          subItem.active_child_categories.map(
                                            (subsubitem) => (
                                              <li
                                                key={subsubitem.id}
                                                className='category-item'
                                              >
                                                <Link
                                                  href={{
                                                    pathname: "/products",
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
                                                          {subsubitem.name}
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
                                ))}
                            </ul>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className='nav'>
              <ul className='nav-wrapper flex xl:space-x-10 space-x-5'>
                <li>
                  <Link href='/' passHref>
                    <a rel='noopener noreferrer'>
                      <span className='flex items-center text-sm font-600 cursor-pointer '>
                        <span>Home</span>
                      </span>
                    </a>
                  </Link>
                </li>
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
                  <Link href='/products' passHref>
                    <a rel='noopener noreferrer'>
                      <span className='flex items-center text-sm font-600 cursor-pointer capitalize'>
                        <span>Our Products</span>
                      </span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href='/blogs' passHref>
                    <a rel='noopener noreferrer'>
                      <span className='flex items-center text-sm font-600 cursor-pointer capitalize'>
                        <span>Blogs</span>
                      </span>
                    </a>
                  </Link>
                </li>
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
      </div>
    </div>
  );
}
