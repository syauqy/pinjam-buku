import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { PageLayout } from "@/components/layouts/page";
import { NextSeo } from "next-seo";
import { PageContent } from "@/components/layouts/page-content";
import ContainerLayout from "@/components/layouts/container";
import { SunIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import dynamic from "next/dynamic";

const BarcodeScannerComponent = dynamic(
  () => import("@steima/react-qr-barcode-scanner"),
  { ssr: false }
);

export default function Scan({ books }) {
  const [data, setData] = useState("Scan the book's barcode");
  const [identified, setIndentified] = useState(false);
  const router = useRouter();
  // const [windowStatus, setWindowStatus] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const [stopStream, setStopStream] = useState(false);

  // console.log(data);

  const scaningBook = useCallback(
    (err, result) => {
      // console.log(err, result);
      if (result) {
        const book = books.find((i) => {
          return i.fields.isbn == result;
        });

        if (book != undefined) {
          setData(book.fields.title);
          setIndentified(true);
          setStopStream(true);
          router.push(`/book/${book.fields.slug}`);
        } else {
          setData(`Barcode is ${result.text}, not registered in JALA database`);
          setIndentified(false);
        }
        // setData(result.text);
        // console.log(result.text);
      } else {
        console.log(err);
        setData("Scan the book's barcode");
        setIndentified(false);
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
            <BarcodeScannerComponent
              torch={torchOn}
              onUpdate={scaningBook}
              onError={(error) => {
                console.log(error);
              }}
              stopStream={stopStream}
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

          <button
            onClick={() => setTorchOn(!torchOn)}
            className="rounded-full py-3 px-5 border-2 "
          >
            Switch Torch {torchOn ? "Off" : "On"}
          </button>
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
