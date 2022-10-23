import React from "react";
import Link from "next/link";
// import { useRouter } from "next/router";

import { SolutionPopover } from "../navbar/solution-popover";
import { ProductPopover } from "../navbar/product-popover";
import { CompanyPopover } from "../navbar/company-popover";
import { ResponsivePopover } from "../navbar/responsive-popover";
import { LanguangeSelector } from "../navbar/languange-selector";

import { navbarContent } from "../../lib/lang/navbar";
import { JalaLogoBlue } from "../icons/jala-blue";

export function Navbar({ locale, locales, asPath }) {
  const {
    products,
    product_categories,
    solutions,
    pricing,
    company,
    signin,
    signup,
  } = navbarContent[locale];
  // console.log(navbar);
  return (
    <header className="md:fixed top-0 left-0 right-0 z-40 px-6 py-5 shadow-lg bg-white">
      {/* <div className="absolute inset-0 opacity-50"></div> */}
      <nav className="max-w-5xl mx-auto items-center justify-between flex">
        <div className="flex space-x-4 items-center">
          <div className="">
            <Link href="/">
              <a>
                <JalaLogoBlue aria-hidden="true" />
              </a>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 items-center justify-items-end lg:hidden">
          <LanguangeSelector
            locale={locale}
            locales={locales}
            asPath={asPath}
          />
          <ResponsivePopover
            locale={locale}
            signin={signin}
            signup={signup}
            product_title={products}
            solution_title={solutions}
          />
        </div>
        <div className="hidden lg:inline-flex items-center space-x-8 text-gray-700 text-base font-medium">
          <>
            <div>
              <ProductPopover
                locale={locale}
                title={products}
                subtitle={product_categories}
              />
            </div>
            <div>
              <SolutionPopover locale={locale} title={solutions} />
            </div>
            <Link href="https://jala.tech/pricing/">
              <a className="text-gray-700 text-opacity-90 text-base font-medium hover:text-opacity-100 hover:underline-offset-4 hover:decoration-jala-500 hover:text-jala-500 decoration-2 transition ease-in duration-100 hover:underline  ">
                {pricing}
              </a>
            </Link>
            <div>
              <CompanyPopover locale={locale} title={company} />
            </div>
            <Link href="https://app.jala.tech/login">
              <a className="text-blue-500 hover:bg-jala-500/5 rounded-md py-1 px-2">
                {signin}
              </a>
            </Link>
            <Link href="https://app.jala.tech/register">
              <a className="bg-blue-500 hover:bg-jala-600 rounded-md py-1 px-4 text-white">
                {signup}
              </a>
            </Link>
            <div>
              <LanguangeSelector
                locale={locale}
                locales={locales}
                asPath={asPath}
              />
            </div>
          </>
        </div>
      </nav>
    </header>
  );
}
