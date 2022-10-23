import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { PageLayout } from "@/components/layouts/page";
import { NextSeo } from "next-seo";
import { PageContent } from "@/components/layouts/page-content";
import { SecondaryBackLink } from "@/components/ui/secondary-back-link";
import ContainerLayout from "@/components/layouts/container";
import clsx from "clsx";
import dynamic from "next/dynamic";

const BarcodeScanner = dynamic(
  () => import("@/components/ui/barcode-scanner"),
  { ssr: false }
);

export default function Scan({ books }) {
  const [data, setData] = useState("Scan the book's barcode");
  const [stopStream, setStopStream] = useState(false);
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
          setStopStream(true);
          router.push(`/book/${book.fields.slug}`);
        } else {
          setData(
            `Barcode is ${data.codeResult.code}, not registered in JALA database`
          );
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
          <div className="p-5 py-6 mb-10 w-full min-h-screen space-y-6">
            <SecondaryBackLink path={"/"}>Kembali</SecondaryBackLink>
            <div className="space-y-6">
              <div className="rounded-2xl h-[27rem] bg-slate-100 overflow-hidden relative">
                <BarcodeScanner onDetected={scaningBook} stop={stopStream} />
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
