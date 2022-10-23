import axios from "axios";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { PageLayout } from "@/components/layouts/page";
import { NextSeo } from "next-seo";
import { PageContent } from "@/components/layouts/page-content";
import ContainerLayout from "@/components/layouts/container";
import { SunIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";

export default function Home({ books }) {
  const router = useRouter();

  console.log(books);

  return (
    <PageLayout>
      <NextSeo title={`Scan Buku | Pinjam Buku JALA`} />
      <PageContent>
        <ContainerLayout className="sm:max-w-xl space-y-2 h-screen ">
          <div className="p-5 py-6 mt-10 w-full min-h-screen">
            <div className="space-y-4 text-gray-700">
              <div className="space-y-3">
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
                      <Image
                        src={book.fields.image[0].url}
                        alt={book.fields.image[0].filename}
                        height={150}
                        width={100}
                        className="rounded-lg bg-slate-200 shadow-2xl"
                      />
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
                      <div className="text-sm">{book.fields.status}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center items-center">
                {/* <Image
                  src={image[0].url}
                  alt={image[0].filename}
                  height={image[0].height / 2}
                  width={image[0].width / 2}
                  className="rounded-lg bg-slate-200 shadow-2xl"
                /> */}
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold"></h1>
                <p className="text-gray-600 text-md line-clamp-6"></p>
              </div>
              {/* <div className="space-y-2">
                <h1 className="text-xl font-medium">Buat Story Baru</h1>
                <div className="flex items-center space-x-2 text-sm md:text-base">
                  <p>Untuk tambah story baru, pilih</p>
                  <a
                    href="https://airtable.com/shrhjnfCooJWsbBUD"
                    rel="noreferrer"
                    target="_blank"
                    className="flex items-center text-jala-trade font-medium"
                  >
                    Story Baru
                  </a>
                </div>
                <div className="flex items-center space-x-2 text-sm md:text-base">
                  <p>Untuk tambah petambak baru, pilih</p>
                  <a
                    href="https://airtable.com/shrxxeGrt4qyRTHQ2"
                    rel="noreferrer"
                    target="_blank"
                    className="flex items-center text-jala-trade font-medium"
                  >
                    Petambak Baru
                  </a>
                </div>
                <div className="flex items-center space-x-2 text-sm md:text-base">
                  <p>Untuk tambah tambak baru, pilih</p>
                  <a
                    href="https://airtable.com/shrjCLtKiJT3rIZrT"
                    rel="noreferrer"
                    target="_blank"
                    className="flex items-center text-jala-trade font-medium"
                  >
                    Tambak Baru
                  </a>
                </div>
                <div className="flex items-center space-x-2 text-sm md:text-base">
                  <p>Untuk tambah supplier baru, pilih</p>
                  <a
                    href="https://airtable.com/shr2QU7045HSzfLR6"
                    rel="noreferrer"
                    target="_blank"
                    className="flex items-center text-jala-trade font-medium"
                  >
                    Supplier Baru
                  </a>
                </div>
                <div className="flex items-center space-x-2 text-sm md:text-base">
                  <p>Untuk tambah resep udang baru, pilih</p>
                  <a
                    href="https://airtable.com/shrjyYWHM3QcftHII"
                    rel="noreferrer"
                    target="_blank"
                    className="flex items-center text-jala-trade font-medium"
                  >
                    Resep Baru
                  </a>
                </div>
              </div> */}
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
