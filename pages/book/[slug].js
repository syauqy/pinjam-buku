import axios from "axios";
import { PageLayout } from "@/components/layouts/page";
import { NextSeo } from "next-seo";
import { PageContent } from "@/components/layouts/page-content";
import { SecondaryBackLink } from "@/components/ui/secondary-back-link";
import ContainerLayout from "@/components/layouts/container";
import Image from "next/image";
import { RatingStar } from "@/components/icons/rating-star";
import { TagLabel } from "@/components/ui/tag-label";
import clsx from "clsx";
// import * as id from "dayjs/locale/id";
import * as dayjs from "dayjs";
// import { Dayjs } from "dayjs";

export default function BooksDetail({ book }) {
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
  console.log(image);
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
                <div class="flex justify-center items-center">
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
                  <p class="ml-2 text-sm font-bold">{rating} of 5</p>
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
                  <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                  <p className="">
                    Diterbitkan {dayjs(published_date).format("D MMM YYYY")}
                  </p>

                  <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                  <p className="">{language}</p>
                  <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
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
            </div>
          </div>

          {/* <button
            onClick={() => setTorchOn(!torchOn)}
            className="rounded-full py-3 px-5 border-2 "
          >
            Switch Torch {torchOn ? "Off" : "On"}
          </button> */}
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

  return {
    props: {
      book: book.records[0].fields,
      // story,
      // farmer,
      // farm,
      // supplier,
      // recipes,
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
