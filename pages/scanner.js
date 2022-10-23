import axios from "axios";
import Image from "next/image";
import { useCallback, useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { PageLayout } from "@/components/layouts/page";
import { NextSeo } from "next-seo";
import { PageContent } from "@/components/layouts/page-content";
import { SecondaryBackLink } from "@/components/ui/secondary-back-link";
import ContainerLayout from "@/components/layouts/container";
import { BottomSheet } from "react-spring-bottom-sheet";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { RatingStar } from "@/components/icons/rating-star";
import * as dayjs from "dayjs";
import { useForm } from "react-hook-form";

import { TagLabel } from "@/components/ui/tag-label";

import "react-spring-bottom-sheet/dist/style.css";

const BarcodeScanner = dynamic(
  () => import("@/components/ui/barcode-scanner"),
  { ssr: false }
);

export default function Scan({ books }) {
  const sheetRef = useRef();
  const [data, setData] = useState("Scan the book's barcode");
  const [stopStream, setStopStream] = useState(false);
  const [identified, setIndentified] = useState(false);
  const [bookData, setBookData] = useState({});
  const [open, setOpen] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/kembali`,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
      data: {
        records: {
          fields: [
            {
              firstName: "Fred",
              lastName: "Flintstone",
            },
          ],
        },
      },
    });
  };

  const scaningBook = useCallback(
    (data) => {
      if (data) {
        console.log(books);
        const book = books.find((i) => {
          return i.fields.isbn === data.codeResult.code;
        });
        if (book != undefined) {
          setData(book.fields.title);
          setIndentified(true);
          // setStopStream(true);
          setBookData(book);
          setOpen(true);
          // router.push(`/book/${book.fields.slug}`);
        } else {
          setData(
            `Barcode is ${data.codeResult.code}, not registered in JALA database`
          );
          setIndentified(false);
        }
      }
    },
    [books]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      // detect window screen width function
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  }, []);

  function onDismiss() {
    setOpen(false);
    setIndentified(false);
    setStopStream(false);
  }

  return (
    <PageLayout>
      <NextSeo title={`Scan Buku | Pinjam Buku JALA`} />
      <PageContent>
        <ContainerLayout className="sm:max-w-xl space-y-2 h-screen ">
          <div className="p-5 py-6 mb-10 w-full min-h-screen space-y-6">
            <SecondaryBackLink path={"/"}>Kembali</SecondaryBackLink>
            <div className="space-y-6">
              <div className="rounded-2xl h-full bg-slate-100 overflow-hidden relative">
                <BarcodeScanner onDetected={scaningBook} stop={stopStream} />
                <div
                  className={clsx(
                    identified ? "bg-jala-insight" : "bg-red-300",
                    "absolute text-white bottom-0 px-8 py-4 w-full text-center"
                  )}
                >
                  {data}
                </div>
              </div>
            </div>
            {/* <button onClick={() => setOpen(true)}>Open</button> */}
            {bookData?.fields && (
              <BottomSheet
                open={open}
                onDismiss={onDismiss}
                ref={sheetRef}
                snapPoints={() => windowSize.height * 0.9}
                className=""
              >
                <div
                  className={clsx(
                    "grid grid-flow-row place-items-start text-gray-900 text-xl",
                    "pb-8 px-8 pt-4 gap-4"
                  )}
                >
                  <div className="space-y-6 text-gray-700">
                    <div
                      className="flex justify-center items-center bg-cover bg-no-repeat bg-center"
                      style={{
                        backgroundImage: `url(${bookData.fields.image[0].url})`,
                      }}
                    >
                      <div className="rounded-lg filter-none blur-none w-full h-full justify-center items-center flex backdrop-blur-sm  bg-white/30 py-4">
                        <Image
                          src={bookData.fields.image[0].url}
                          alt={bookData.fields.image[0].filename}
                          height={150}
                          width={100}
                        />
                      </div>
                    </div>
                    <div className="space-y-2 text-center">
                      <h1 className="text-2xl font-bold">
                        {bookData.fields.title}
                      </h1>
                      <div className="text-sm font-light">
                        by{" "}
                        <span className="font-medium">
                          {bookData.fields.author}
                        </span>
                      </div>
                      <div class="flex justify-center items-center">
                        {[...Array(bookData.fields.rating)].map((star, i) => (
                          <RatingStar
                            className={"w-5 h-5 text-yellow-400"}
                            key={`${i}`}
                          />
                        ))}
                        {[...Array(5 - bookData.fields.rating)].map(
                          (star, i) => (
                            <RatingStar
                              className={"w-5 h-5 text-gray-300"}
                              key={`${i}`}
                            />
                          )
                        )}
                        <p className="ml-2 text-sm font-bold">
                          {bookData.fields.rating} of 5
                        </p>
                      </div>
                      <div className="flex justify-center">
                        <TagLabel
                          className={clsx(
                            bookData.fields.status == "Booked"
                              ? "bg-red-400/50 text-white"
                              : "bg-green-400/70 text-white",
                            "text-sm"
                          )}
                        >
                          {bookData.fields.status}
                        </TagLabel>
                      </div>

                      <div className="flex flex-wrap items-center text-xs justify-center text-center font-light">
                        <p className="">{bookData.fields.pages} halaman</p>
                        <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                        <p className="">
                          Diterbitkan{" "}
                          {dayjs(bookData.fields.published_date).format(
                            "D MMM YYYY"
                          )}
                        </p>

                        <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                        <p className="">{bookData.fields.language}</p>
                        <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                        <p>ISBN {bookData.fields.isbn}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="space-y-2">
                        <h2 className="text-lg font-medium">Deskripsi Buku</h2>
                        <p className="text-gray-600 text-sm font-light line-clamp-6">
                          {bookData.fields.synopsis}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {bookData.fields.status == "Available" ? (
                        <h2 className="text-lg font-medium">Pinjam Buku</h2>
                      ) : (
                        <div className="space-y-2">
                          <h2 className="text-lg font-medium">
                            Kembalikan Buku
                          </h2>
                          <form onSubmit={handleSubmit(onSubmit)}>
                            {/* register your input into the hook by invoking the "register" function */}
                            <input
                              defaultValue="test"
                              {...register("example")}
                            />

                            {/* include validation with required or other standard HTML validation rules */}
                            <input
                              {...register("exampleRequired", {
                                required: true,
                              })}
                            />
                            {/* errors will return when field validation fails  */}
                            {errors.exampleRequired && (
                              <span>This field is required</span>
                            )}

                            <input type="submit" />
                          </form>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </BottomSheet>
            )}
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
