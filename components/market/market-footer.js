// import { JalaLogoBlue } from "../../components/icons/jala-blue";
import { LinkIcon, ExternalLinkIcon } from "@heroicons/react/outline";
import * as dayjs from "dayjs";
import Link from "next/link";

export default function MarketFooter() {
  const year = dayjs().format("YYYY");
  return (
    <div className="space-y-2 pt-4 border-t border-gray-200">
      <div className="py-2">
        <a href="https://jala.tech" target="_blank" rel="noreferrer">
          {/* <JalaLogoBlue aria-hidden="true" /> */}
        </a>
      </div>

      <p className="text-gray-700 text-md font-light">
        © {year} PT Jala Akuakultur Lestari Alamku
      </p>
      <div className="flex items-center py-2 space-x-4">
        <div>
          <p className="text-gray-700 text-sm font-light">
            Informasi udang traceable diatas disediakan oleh{" "}
            <a
              href="https://jala.tech"
              className="inline-flex text-jala-500 items-center hover:font-semibold"
            >
              JALA Tech{" "}
              <span>
                <ExternalLinkIcon className="h-4 w-4 ml-1 " />
              </span>
            </a>
            . Startup yang membantu petambak udang untuk meningkatkan hasil
            budidaya mereka dan menciptakan budidaya yang berkelanjutan dengan
            menggunakan teknologi dan analisis budidaya berbasis data.
          </p>
        </div>
      </div>
    </div>
  );
}
