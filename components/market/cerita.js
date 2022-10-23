import React from "react";
import * as dayjs from "dayjs";
import Image from "next/image";
import { UsersIcon, LocationMarkerIcon } from "@heroicons/react/outline";
import { BadgeCheckIcon } from "@heroicons/react/solid";
import Recipes from "../../components/market/recipes";

import MarketFooter from "../../components/market/market-footer";
import MapTambak from "../../components/market/map";

export default function Cerita({ udang, setShowStory, showStory }) {
  console.log("cerita", udang, setShowStory, showStory);
  const handleStory = () => {
    setShowStory(!showStory);
  };
  return (
    <>
      <div className="relative">
        <Image
          className="w-full"
          src={udang.image[0].thumbnails.large.url}
          alt={udang.image[0].filename}
          layout="responsive"
          priority="true"
          width={udang.image[0].thumbnails.large.width}
          height={udang.image[0].thumbnails.large.height}
        />
        <div className="absolute inset-0">
          <div className="absolute inset-0 top-1/2 bg-gradient-to-t from-gray-900"></div>
          <div className="absolute inset-x-0 bottom-0">
            <h1 className="text-3xl font-bold text-white px-4 pb-4">
              {udang.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="p-5 pb-6 w-full bg-opacity-50 min-h-screen">
        <div className="space-y-4 text-gray-700">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-1 text-center">
              <div className="">
                <p className="text-gray-500 text-sm">Umur Budidaya</p>
                <p className="text-gray-800 text-lg font-semibold">
                  {udang.age} hari
                </p>
              </div>
              <div className=" border-l border-gray-300">
                <p className="text-gray-500 text-sm">Size</p>
                <p className="text-gray-800 text-lg font-semibold">
                  {udang.size}
                </p>
              </div>
              <div className=" border-l border-gray-300">
                <p className="text-gray-500 text-sm">Tanggal Panen</p>
                <p className="text-gray-800 text-lg font-semibold">
                  {dayjs(udang.harvest_date).format("D MMM YYYY")}
                </p>
              </div>
            </div>
            <div>
              <button onClick={handleStory}>Lihat Story</button>
            </div>

            <div className="py-2">
              <p className="text-gray-600 text-md font-light text-justify">
                {udang.description}
              </p>
            </div>
            <div>
              <h2 className="py-2 text-xl font-semibold">Proses</h2>
              <p className="text-gray-600 text-md font-light text-justify">
                {udang.process}
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-gray-200">
            <h1 className="text-3xl font-bold">Petambak</h1>
            <div className="flex items-center py-2 space-x-4">
              <div className="relative">
                <Image
                  className="rounded-full h-24 w-24"
                  src={udang.farmer.image[0].thumbnails.large.url}
                  alt={udang.farmer.image[0].filename}
                  width={80}
                  height={80}
                />
                <BadgeCheckIcon className="absolute bottom-0.5 right-0.5 w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-gray-700 text-lg font-semibold">
                  {udang.farmer.first_name} {udang.farmer.last_name}
                </p>
                <div className="flex items-center space-x-1">
                  <LocationMarkerIcon className="w-5 h-5" />
                  <p className="text-gray-600 text-md font-light">
                    {udang.farmer.location}
                  </p>
                </div>
              </div>
            </div>
            <div className="py-2">
              <p className="text-gray-600 text-md font-light text-justify">
                {udang.farmer.description}
              </p>
            </div>
            <div className="py-2">
              <h3 className="text-lg font-semibold py-2">
                {udang.farmer.first_name} adalah Petambak JALA
              </h3>
              <p className="text-gray-600 text-md font-light text-justify">
                Petambak JALA berbudidaya menggunakan teknologi dan berbasiskan
                data.
              </p>
            </div>
          </div>
          <div className="space-y-2 pt-4 border-t border-gray-200">
            <h1 className="text-3xl font-bold">Tambak {udang.farm.name}</h1>
            <div className="space-y-4">
              <div className="py-4">
                <Image
                  className="rounded-md"
                  src={udang.farm.image[0].thumbnails.large.url}
                  alt={udang.farm.image[0].filename}
                  layout="responsive"
                  width={udang.farm.image[0].thumbnails.large.width}
                  height={udang.farm.image[0].thumbnails.large.height}
                />
              </div>
              <div className="grid grid-cols-3 gap-1 text-center">
                <div className="">
                  <p className="text-gray-500 text-sm">Jumlah Kolam</p>
                  <p className="text-gray-800 text-lg font-semibold">
                    {udang.farm.pond_number}
                  </p>
                </div>
                <div className=" border-l border-gray-300">
                  <p className="text-gray-500 text-sm">Luas Kolam</p>
                  <p className="text-gray-800 text-lg font-semibold">
                    {udang.farm.pond_area} m²
                  </p>
                </div>
                <div className=" border-l border-gray-300">
                  <p className="text-gray-500 text-sm">Jumlah Tebar</p>
                  <p className="text-gray-800 text-lg font-semibold">
                    {udang.farm.stocking_density}{" "}
                    <span className="font-light text-sm">ekor</span>
                  </p>
                </div>
              </div>
              <div className="py-2">
                <p className="text-gray-600 text-md font-light text-justify">
                  {udang.farm.description}
                </p>
              </div>
              <div>
                <h2 className="py-2 text-xl font-semibold">Lokasi</h2>
                <div className="space-y-2">
                  <MapTambak
                    latitude={udang.farm.latitude}
                    longitude={udang.farm.longitude}
                  />
                  <div className="flex items-center capitalize space-x-1 font-light text-sm">
                    <p>{udang.farm.district}</p>
                    <span>&middot;</span>
                    <p>{udang.farm.regency}</p>
                    <span>&middot;</span>
                    <p>{udang.farm.province}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2 pt-4 border-t border-gray-200">
            <h1 className="text-3xl font-bold">Supplier</h1>
            <div className="flex items-center py-2 space-x-4">
              <div className="relative">
                <Image
                  className="h-24 w-24 rounded-full"
                  src={udang.supplier.image[0].thumbnails.large.url}
                  alt={udang.supplier.image[0].filename}
                  width={80}
                  height={80}
                />
                <BadgeCheckIcon className="absolute bottom-0 right-0 w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-gray-700 text-lg font-semibold">
                  {udang.supplier.name}
                </p>
                <div className="flex space-x-1 items-center text-gray-500 font-light">
                  <LocationMarkerIcon className="h-5 w-5 font-light" />
                  <p className="text-md">{udang.supplier.location}</p>
                </div>
                <div className="flex space-x-1 items-center text-gray-500 font-light">
                  <UsersIcon className="h-5 w-5" />
                  <p className="text-md">{udang.supplier.team} Pekerja</p>
                </div>
              </div>
            </div>
            <div className="py-2">
              <p className="text-gray-600 text-md font-light text-justify">
                {udang.supplier.description}
              </p>
            </div>
          </div>
          <Recipes recipes={udang.recipes} />
          <MarketFooter />
        </div>
      </div>
    </>
  );
}
