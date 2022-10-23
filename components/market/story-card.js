import React from "react";
import { QRCode } from "react-qrcode-logo";
import Link from "next/link";
import * as dayjs from "dayjs";

export default function StoryCard({ udang }) {
  return (
    <>
      {udang.stories.map((story) => (
        <li
          key={story.id}
          className="space-y-4 p-5 w-full bg-white bg-opacity-50 rounded-lg shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-2 space-y-2 items-center">
            <div className="col-span-3 md:col-span-2 space-y-4 truncate">
              <p className=" text-lg text-gray-700 font-semibold">
                {story.title}
              </p>
              <Link className="" href={`/market/${story.slug}`}>
                <a className="text-xs text-jala-insight">
                  https://udang.jala.tech/market/{story.slug}
                </a>
              </Link>
              <div className="grid grid-cols-3 gap-1 text-center">
                <div className="">
                  <p className="text-gray-500 text-xs md:text-sm">
                    Umur Budidaya
                  </p>
                  <p className="text-gray-800 text-sm md:text-lg font-semibold">
                    {story.age} hari
                  </p>
                </div>
                <div className=" border-l border-gray-300">
                  <p className="text-gray-500 text-xs md:text-sm">Size</p>
                  <p className="text-gray-800 text-sm md:text-lg font-semibold">
                    {story.size}
                  </p>
                </div>
                <div className=" border-l border-gray-300">
                  <p className="text-gray-500 text-xs md:text-sm">
                    Tanggal Panen
                  </p>
                  <p className="text-gray-800 text-sm md:text-lg font-semibold">
                    {dayjs(story.harvest_date).format("D MMM YYYY")}
                  </p>
                </div>
              </div>
            </div>
            <div className="qrcode grid grid-cols-1 justify-items-center space-y-2">
              <QRCode
                value={`https://udang.jala.tech/market/${story.slug}`}
                fgColor="#3f7dc0"
                eyeRadius={5}
                id={story.id}
                ecLevel="Q"
                logoImage="/jalamarket-icon.png"
                logoWidth={50}
              />
              <button
                className="rounded-lg bg-jala-insight text-white py-2 px-4"
                onClick={() =>
                  saveQRImage(story.id, `QRCode-JALAMarket-${story.slug}`)
                }
              >
                Download
              </button>
            </div>
          </div>
        </li>
      ))}
    </>
  );
}

function saveQRImage(fileId, fileName) {
  const canvas = document.getElementById(fileId);
  const link = document.createElement("a");

  document.body.appendChild(link); // for Firefox
  link.setAttribute("href", canvas.toDataURL("image/jpg"));
  link.setAttribute("download", fileName);
  link.click();
  link.delete;
}
