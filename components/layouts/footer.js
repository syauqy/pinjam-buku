import React from "react";
import { JalaLogo } from "../icons/jala-logo";
import { FooterLink } from "../ui/footer-link";
// import GooglePlayBtn from "../icons/google-play-btn";
import Image from "next/image";

import {
  productsContent,
  solutionsContent,
  companiesContent,
} from "../../lib/menus/responsive";
import { contactsContent, officeContent } from "../../lib/menus/contact";
import { resourcesContent } from "../../lib/menus/resources";
import { socials, stores } from "../../lib/menus/socials";
import { footerContent } from "../../lib/menus/footer";

export function Footer({ locale }) {
  const products = productsContent[locale];
  const solutions = solutionsContent[locale];
  const companies = companiesContent[locale];
  const contacts = contactsContent[locale];
  const office = officeContent[locale];
  const resources = resourcesContent[locale];
  const {
    product_title,
    solution_title,
    resources_title,
    company_title,
    support_title,
  } = footerContent[locale];
  return (
    <footer className="bg-jala-600 py-20 text-white md:px-0 px-4 space-y-8">
      <div className="container max-w-5xl mx-auto items-center justify-between flex pb-10">
        <div className="md:hidden space-y-8">
          <div className="space-y-4 px-4 md:px-0">
            <JalaLogo color="#FFF" />
          </div>
          <div className="gap-8 grid grid-cols-2">
            <div className="space-y-2 px-4">
              <div className="font-medium text-base mb-2">{product_title}</div>
              <ul className="space-y-1">
                {products.map((item) => (
                  <li className="font-light text-base" key={item.name}>
                    <FooterLink href={item.href}>{item.name}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-2 px-4">
              <ul className="space-y-4">
                <li>
                  <div className="font-medium text-base mb-2">
                    {solution_title}
                  </div>
                  <ul className="space-y-1">
                    {solutions.map((item) => (
                      <li className="font-light text-base" key={item.name}>
                        <FooterLink href={item.href}>{item.name}</FooterLink>
                      </li>
                    ))}

                    {/* <li className="font-light text-base">Pasca Produksi</li>
                    <li className="font-light text-base">
                      Operasional Budidaya
                    </li> */}
                  </ul>
                </li>
              </ul>
            </div>
            <div className="px-4">
              <div className="font-medium text-base mb-2">{company_title}</div>
              <ul className="space-y-1">
                {companies.map((item) => (
                  <li className="font-light text-base" key={item.name}>
                    <FooterLink href={item.href}>{item.name}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-2 px-4">
              <ul className="space-y-4">
                <li>
                  <div className="font-medium text-base mb-2">
                    {resources_title}
                  </div>
                  <ul className="space-y-1">
                    {resources.map((item) => (
                      <li className="font-light text-base" key={item.name}>
                        <FooterLink href={item.href}>{item.name}</FooterLink>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
            <div className="space-y-2 px-4 col-span-2">
              <ul className="space-y-4">
                <li>
                  <div className="font-medium text-base mb-2">
                    {office.title}
                  </div>
                  <div className="space-y-1 font-light">{office.address}</div>
                </li>
              </ul>
            </div>
            <div className="space-y-2 px-4 col-span-2">
              <ul className="space-y-4">
                <li>
                  <div className="font-medium text-base mb-2">
                    {support_title}
                  </div>
                  <ul className="space-y-1">
                    {contacts.map((item) => (
                      <li className="font-light text-base" key={item.name}>
                        {`${item.icon} ${item.number} (${item.name})`}
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
            <div className="px-4 col-span-2 grid grid-cols-2 gap-4">
              {stores.map((item) => (
                <a
                  href={item.href}
                  key={item.name}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  <Image src={item.icon} aria-hidden="true" alt={item.name} />
                </a>
              ))}
            </div>
          </div>
        </div>
        {/*big screen */}
        <div className="md:gap-8 md:grid md:grid-cols-4 hidden">
          <div className="space-y-2 px-4">
            <div className="mb-10">
              <JalaLogo color="#FFF" />
            </div>
            <ul className="lg:block hidden">
              <li>
                <div className="font-medium text-base mb-2">{office.title}</div>
                <div className="font-light text-sm">{office.address}</div>
              </li>
            </ul>
            <ul className="space-y-4 lg:block hidden">
              <li>
                <div className="font-medium text-base mb-2">
                  {support_title}
                </div>
                <ul className="space-y-1">
                  {contacts.map((item) => (
                    <li className="font-light text-sm" key={item.name}>
                      {`${item.icon} ${item.number} (${item.name})`}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
          <div className="space-y-2 px-4">
            <div className="font-medium text-base mb-2">{product_title}</div>
            <ul className="space-y-1">
              {products.map((item) => (
                <li className="font-light text-base" key={item.name}>
                  <FooterLink href={item.href}>{item.name}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2 px-4">
            <ul className="space-y-4">
              <li>
                <div className="font-medium text-base mb-2">
                  {solution_title}
                </div>
                <ul className="space-y-1">
                  {solutions.map((item) => (
                    <li className="font-light text-base" key={item.name}>
                      <FooterLink href={item.href}>{item.name}</FooterLink>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <div className="font-medium text-base mb-2">
                  {resources_title}
                </div>
                <ul className="space-y-1">
                  {resources.map((item) => (
                    <li className="font-light text-base" key={item.name}>
                      <FooterLink href={item.href}>{item.name}</FooterLink>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
          <div className="px-4">
            <div className="font-medium text-base mb-2">{company_title}</div>
            <ul className="space-y-1">
              {companies.map((item) => (
                <li className="font-light text-base" key={item.name}>
                  <FooterLink href={item.href}>{item.name}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="px-4 hidden lg:grid grid-cols-2">
            {stores.map((item) => (
              <a
                href={item.href}
                key={item.name}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="hover:opacity-70"
              >
                <Image src={item.icon} aria-hidden="true" alt={item.name} />
              </a>
            ))}
          </div>
          <div className="px-4 col-span-3 col-start-2 gap-4 lg:hidden hidden md:grid grid-cols-2">
            <ul className="space-y-4">
              <li>
                <div className="font-medium text-base mb-2">{office.title}</div>
                <div className="space-y-1 font-light">{office.address}</div>
              </li>
            </ul>
            <ul className="space-y-4">
              <li>
                <div className="font-medium text-base mb-2">
                  {support_title}
                </div>
                <ul className="space-y-1">
                  {contacts.map((item) => (
                    <li className="font-light text-base" key={item.name}>
                      {`${item.icon} ${item.number} (${item.name})`}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
          <div className="hidden lg:hidden md:grid grid-cols-2 col-start-2 col-span-2">
            {stores.map((item) => (
              <a
                href={item.href}
                key={item.name}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="hover:opacity-70"
              >
                <Image src={item.icon} aria-hidden="true" alt={item.name} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="container max-w-5xl mx-auto items-center justify-between md:flex px-4 space-y-4">
        <div className="md:grid md:grid-flow-col flex gap-4 md:gap-4 items-center">
          {socials.map((item) => (
            <a href={item.href} key={item.name} className="hover:opacity-75">
              <item.icon aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="font-light text-sm">
          © 2022 PT. Atnic Ekotekno Wicaksana
        </div>
      </div>
    </footer>
  );
}
