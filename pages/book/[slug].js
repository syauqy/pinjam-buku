import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { PageLayout } from "@/components/layouts/page";
import toast, { Toaster } from "react-hot-toast";
import { NextSeo } from "next-seo";
import { PageContent } from "@/components/layouts/page-content";
import { SecondaryBackLink } from "@/components/ui/secondary-back-link";
import ContainerLayout from "@/components/layouts/container";
import Image from "next/image";
import { RatingStar } from "@/components/icons/rating-star";
import Rating from "react-rating";
import { TagLabel } from "@/components/ui/tag-label";
import clsx from "clsx";
import { useForm } from "react-hook-form";
// import * as id from "dayjs/locale/id";
import * as dayjs from "dayjs";
// import { Dayjs } from "dayjs";

export default function BooksDetail({ book, bookRecords }) {
  const {
    title,
    pages,
    author,
    genres,
    image,
    isbn,
    language,
    published_date,
    rating,
    status,
    synopsis,
  } = book;
  // console.log(image);
  // console.log("book", book);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const [bookRating, setRating] = useState("kosong");
  // console.log("records", bookRecords);

  const postKembali = (data) => {
    axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/kembali`,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        fields: {
          name: bookRecords.fields.name,
          department: bookRecords.fields.department,
          pinjam: [bookRecords.id],
          // tanggal_kembali: dayjs(),
          tanggal_kembali: dayjs().format("YYYY-MM-DD"),
          books: [bookRecords.fields.books[0]],
          rating: bookRating,
          review: data.review,
        },
      }),
    })
      .then(function (response) {
        if (response.status == 200) {
          toast("Buku berhasil dikembalikan", {
            icon: "🙏",
          });
          router.push("/");
        }
        // console.log(response);
      })
      .catch(function (error) {
        toast.error(
          `Error ${error.response.status}: ${error.response.data.error.message}`
        );
        console.log(error);
      });
    // console.log(data.name, bookRating, data.review);
  };

  const postPinjam = () => {
    axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/kembali`,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        fields: {
          name: bookRecords.fields.name,
          department: bookRecords.fields.department,
          pinjam: [bookRecords.id],
          tanggal_kembali: dayjs().format("YYYY-MM-DD"),
          books: [bookRecords.fields.books[0]],
        },
      }),
    });
  };
  return (
    <PageLayout>
      <NextSeo title={`Scan Buku | Pinjam Buku JALA`} />
      <PageContent>
        <ContainerLayout className="sm:max-w-xl space-y-2 h-full ">
          {/* <h1></h1> */}

          <div className="p-5 py-6 mb-10 w-full min-h-screen space-y-6">
            <SecondaryBackLink path={"/"}>Kembali</SecondaryBackLink>
            <div className="space-y-6 text-gray-700">
              <div
                className="flex justify-center items-center bg-cover bg-no-repeat bg-center"
                style={{ backgroundImage: `url(${image[0].url})` }}
              >
                <div className="rounded-lg filter-none blur-none w-full h-full justify-center items-center flex backdrop-blur-sm  bg-white/30 py-4">
                  <Image
                    src={image[0].url}
                    alt={image[0].filename}
                    height={300}
                    width={200}
                  />
                </div>
              </div>
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">{title}</h1>
                <div className="text-sm font-light">
                  by <span className="font-medium">{author}</span>
                </div>
                <div className="flex justify-center items-center">
                  {[...Array(rating)].map((star, i) => (
                    <RatingStar
                      className={"w-5 h-5 text-yellow-400"}
                      key={`${i}`}
                    />
                  ))}
                  {[...Array(5 - rating)].map((star, i) => (
                    <RatingStar
                      className={"w-5 h-5 text-gray-300"}
                      key={`${i}`}
                    />
                  ))}
                  <p className="ml-2 text-sm font-bold">{rating} of 5</p>
                </div>
                <div className="flex justify-center">
                  <TagLabel
                    className={clsx(
                      status == "Booked"
                        ? "bg-red-400/50 text-white"
                        : "bg-green-400/70 text-white",
                      "text-sm"
                    )}
                  >
                    {status}
                  </TagLabel>
                </div>

                <div className="flex flex-wrap items-center text-xs justify-center text-center font-light">
                  <p className="">{pages} halaman</p>
                  <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                  <p className="">
                    Diterbitkan {dayjs(published_date).format("D MMM YYYY")}
                  </p>

                  <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                  <p className="">{language}</p>
                  <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                  <p>ISBN {isbn}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="space-y-2">
                  <h2 className="text-lg font-medium">Deskripsi Buku</h2>
                  <p className="text-gray-600 text-md line-clamp-6">
                    {synopsis}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {status == "Available" ? (
                  // <h2 className="text-lg font-medium">Pinjam Buku</h2>
                  <></>
                ) : (
                  <div className="space-y-2">
                    <h2 className="text-lg font-medium">Kembalikan Buku</h2>
                    {/* <button onClick={postKembali}>Kembalikan Buku</button> */}
                    <form
                      onSubmit={handleSubmit(postKembali)}
                      className="grid grid-cols-1 gap-4"
                    >
                      <label className="block">
                        <span className="text-gray-700 font-medium">
                          Nama Peminjam
                        </span>
                        <div className="text-gray-500 font-inter text-lg">
                          {bookRecords.fields.name}
                        </div>
                      </label>

                      <label className="block">
                        <span className="text-gray-700 font-medium">
                          Beri Penilaian
                        </span>
                        <div className="block w-full">
                          <Rating
                            initialRating={0}
                            emptySymbol={
                              <RatingStar
                                href="#icon-star-empty"
                                className="icon w-8 h-8 text-gray-300"
                              />
                            }
                            fullSymbol={
                              <RatingStar
                                href="#icon-star-full"
                                className="icon w-8 h-8 text-yellow-400"
                              />
                            }
                            onClick={(rating) => {
                              if (rating > 0) {
                                console.log(rating, bookRating);
                                setRating(rating);
                              }
                            }}
                          />
                        </div>
                      </label>

                      <label className="block">
                        <span className="text-gray-700 font-medium">
                          Review
                        </span>
                        <textarea
                          className="form-textarea mt-1 block w-full h-24 rounded-md border-gray-300 invalid:border-red-400"
                          rows="3"
                          placeholder="Kesanmu setelah membaca buku ini."
                          {...register("review", {
                            required: "Mohon isi review buku",
                          })}
                          aria-invalid={errors.review ? "true" : "false"}
                        ></textarea>
                        {errors.review && (
                          <p role="alert" className="text-red-500 mt-2 text-sm">
                            {errors.review?.message}
                          </p>
                        )}
                      </label>
                      <input
                        value="Kembalikan Buku"
                        type="submit"
                        className="hover:bg-white border-2 rounded-full mt-4 py-3 px-5 text-white  inline-flex items-center bg-jala-primary border-jala-primary hover:text-jala-primary text-center font-inter font-medium w-full justify-center"
                      />
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Toaster position="top-center" />

          {/* <div className="fixed z-90 bottom-5 inset-x-0  w-full">
            {status == "Available" ? (
              <Link href={"/scanner"}>
                <div className="bg-jala-primary px-8 py-4 w-2/3 md:w-1/3 mx-auto rounded-full drop-shadow-lg flex justify-center items-center text-white text-lg font-inter hover:bg-jala-insight hover:drop-shadow-2xl hover:animate-bounce duration-300">
                  Pinjam Buku
                </div>
              </Link>
            ) : (
              <div className="bg-red-400 px-8 py-4 w-2/3 md:w-1/3 mx-auto rounded-full drop-shadow-lg flex justify-center items-center text-white text-lg font-inter  cursor-not-allowed">
                Buku Dipinjam
              </div>
            )}
          </div> */}
        </ContainerLayout>
      </PageContent>
    </PageLayout>
  );
}

export const getStaticProps = async ({ params: { slug } }) => {
  const { data: book } = await axios({
    method: "get",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
      "Content-Type": "application/json",
    },
    url: `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/books?filterByFormula=slug=%22${slug}%22`,
  });

  const { data: bookRecords } = await axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/pinjam/${
      book.records[0]?.fields?.borrower
        ? book.records[0].fields.borrower[0]
        : ""
    }`,
    // url: `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/books?filterByFormula=slug=%22${slug}%22`,
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  return {
    props: {
      book: book.records[0].fields,
      bookRecords: bookRecords,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const { data: books } = await axios({
    method: "get",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
      "Content-Type": "application/json",
    },
    url: `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/books`,
  });

  const paths = books.records.map((book) => ({
    params: {
      slug: book.fields.slug,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
