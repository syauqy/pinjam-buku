import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { PageLayout } from "@/components/layouts/page";
import { NextSeo } from "next-seo";
import { PageContent } from "@/components/layouts/page-content";
import ContainerLayout from "@/components/layouts/container";
import clsx from "clsx";
import dynamic from "next/dynamic";

const BarcodeScanner = dynamic(
  () => import("@/components/ui/barcode-scanner"),
  { ssr: false }
);

export default function Scan({ books }) {
  const [data, setData] = useState("Scan the book's barcode");
  const [identified, setIndentified] = useState(false);
  const router = useRouter();

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
          router.push(`/book/${book.fields.slug}`);
        } else {
          setData(`Barcode is ${data.codeResult.code}, not registered in JALA database`);
          setIndentified(false);
        }
        // setData(result.text);
        // console.log(result.text);
      }
    },
    [books, router]
  );

  return (
    <PageLayout>
      <NextSeo title={`Scan Buku | Pinjam Buku JALA`} />
      <PageContent>
        <ContainerLayout className="sm:max-w-xl space-y-2 h-screen ">
          <h1></h1>
          <div className="rounded-2xl overflow-hidden relative">
            <BarcodeScanner
              onDetected={scaningBook}
            />
            {/* <div id="camera"></div> */}
            <div
              className={clsx(
                identified ? "bg-jala-insight" : "bg-red-300",
                "absolute text-white bottom-0 px-8 py-4 w-full text-center"
              )}
            >
              {data}
            </div>
          </div>

          {/*<button*/}
          {/*  onClick={() => setTorchOn(!torchOn)}*/}
          {/*  className="rounded-full py-3 px-5 border-2 "*/}
          {/*>*/}
          {/*  Switch Torch {torchOn ? "Off" : "On"}*/}
          {/*</button>*/}
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
