import axios from "axios";
import { PageLayout } from "@/components/layouts/page";
import { NextSeo } from "next-seo";
import { PageContent } from "@/components/layouts/page-content";
import { SecondaryBackLink } from "@/components/ui/secondary-back-link";
import ContainerLayout from "@/components/layouts/container";
import Image from "next/image";

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

          <div className="p-5 pb-6 w-full min-h-screen">
            <SecondaryBackLink path={"/"}>Kembali</SecondaryBackLink>
            <div className="space-y-4 text-gray-700">
              <div className="flex justify-center items-center">
                <Image
                  src={image[0].url}
                  alt={image[0].filename}
                  height={image[0].height / 2}
                  width={image[0].width / 2}
                  className="rounded-lg bg-slate-200 shadow-2xl"
                />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">{title}</h1>
                <p className="text-gray-600 text-md line-clamp-6">{synopsis}</p>
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
