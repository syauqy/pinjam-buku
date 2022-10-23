import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { PageLayout } from "@/components/layouts/page";
import { NextSeo } from "next-seo";
import { PageContent } from "@/components/layouts/page-content";
import ContainerLayout from "@/components/layouts/container";
import { SunIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import * as dayjs from "dayjs";
import Rating from "react-rating";
import { RatingStar } from "@/components/icons/rating-star";

import { TagLabel } from "@/components/ui/tag-label";

export default function Home({ books }) {
  const router = useRouter();

  console.log(books);

  return (
    <PageLayout>
      <NextSeo title={`Scan Buku | Pinjam Buku JALA`} />
      <PageContent>
        <ContainerLayout className="sm:max-w-xl space-y-2 h-screen ">
          <div className="p-5 py-6 mt-5 mb-10 w-full min-h-screen">
            <div className="space-y-4 text-gray-700">
              <div className="space-y-6">
                <h1 className="font-inter text-4xl font-black">Pinjam Buku</h1>
                <p className="font-light text-sm">
                  Mau pinjam buku untuk dibaca di rumah? Temukan buku buku
                  menarik yang dikumpulkan secara sukarela oleh warga JALA.
                </p>
              </div>
              <div className="space-y-2">
                <h2 className="font-inter text-xl font-medium">Daftar Buku</h2>
                {books.map((book) => (
                  <div
                    className="border shadow-sm px-6 py-4 flex flex-row gap-4 rounded-2xl cursor-pointer"
                    key={book.id}
                    onClick={() => router.push(`/book/${book.fields.slug}`)}
                  >
                    <div className="shrink-0 ">
                      {book.fields.image && (
                        <Image
                          src={book.fields.image[0].url}
                          alt={book.fields.image[0].filename}
                          height={150}
                          width={100}
                          className=" bg-slate-200 shadow-2xl"
                        />
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="text-lg font-inter font-medium">
                        {book.fields.title}
                      </div>
                      <div className="text-sm font-light">
                        by{" "}
                        <span className="font-medium">
                          {book.fields.author}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center">
                          {[...Array(book.fields.rating)].map((star, i) => (
                            <RatingStar
                              className={"w-5 h-5 text-yellow-400"}
                              key={`${i}`}
                            />
                          ))}
                          {[...Array(5 - book.fields.rating)].map((star, i) => (
                            <RatingStar
                              className={"w-5 h-5 text-gray-300"}
                              key={`${i}`}
                            />
                          ))}
                          <p className="ml-2 text-sm font-bold">
                            {book.fields.rating} of 5
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        <TagLabel
                          className={clsx(
                            book.fields.status == "Booked"
                              ? "bg-red-400/50 text-white"
                              : "bg-green-400/70 text-white",
                            "text-sm"
                          )}
                        >
                          {book.fields.status}
                        </TagLabel>
                      </div>
                      {book.fields.status == "Booked" &&
                        book.fields.estimasi_kembali && (
                          <div className="text-sm font-light">
                            Estimasi dikembalikan pada
                            <span className="font-medium ml-1">
                              {dayjs(book.fields.estimasi_kembali[0]).format(
                                "D MMM YYYY"
                              )}
                            </span>
                          </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="fixed z-90 bottom-5 inset-x-0  w-full">
                <Link href={"/scanner"}>
                  <div className="bg-jala-primary px-8 py-4 w-1/2 mx-auto rounded-full drop-shadow-lg flex justify-center items-center text-white text-lg font-inter hover:bg-jala-insight hover:drop-shadow-2xl hover:animate-bounce duration-300">
                    Pinjam Buku
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </ContainerLayout>
      </PageContent>
    </PageLayout>
  );
}

export const getStaticProps = async () => {
  const { data: books } = await axios({
    method: "get",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
      "Content-Type": "application/json",
    },
    url: `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/books`,
  });

  return {
    props: {
      books: books.records,
    },
    revalidate: 1,
  };
};
