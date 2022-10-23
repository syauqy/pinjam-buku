import React from "react";
import axios from "axios";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import Image from "next/image";

export function Recipes(recipes) {
  //   console.log("resep", recipes);
  return (
    <>
      <div className="space-y-2 pt-4 border-t border-gray-200 ">
        <h1 className="text-3xl font-bold">Rekomendasi Resep Udang</h1>
        <div className="py-2">
          <p className="text-gray-600 text-md font-light">
            Beberapa resep udang yang bisa Anda coba di rumah.
          </p>
        </div>
        <div className="py-2 relative overflow-x-auto scrollbar-hidden">
          <div className="flex space-x-4">
            {recipes.recipes.map((recipe) => (
              <div
                className="rounded-lg shadow-md shrink-0 w-7/12 lg:w-5/12"
                key={recipe.id}
              >
                <div className="space-y-2">
                  <a
                    href={recipe.fields.link}
                    rel="nofollow noreferrer"
                    target="_blank"
                    className="object-cover"
                  >
                    <div className="h-48 object-cover relative">
                      <Image
                        className="object-cover w-full h-full"
                        objectFit="cover"
                        layout="fill"
                        src={recipe.fields.image[0].thumbnails.large.url}
                        alt={recipe.fields.image[0].filename}
                      />
                      <div className="absolute inset-0">
                        <div className="absolute inset-0 top-1/3 bg-gradient-to-t from-gray-900"></div>
                        <div className="absolute inset-x-0 bottom-0">
                          <div className="px-4 pb-2">
                            <div className="flex space-x-2 items-center">
                              <p className="text-white text-xs font-normal text-justify uppercase">
                                {recipe.fields.source}
                              </p>

                              <ExternalLinkIcon className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-lg text-white font-bold ">
                              {recipe.fields.name}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                  <div className="px-4 pb-4">
                    <p className="text-gray-600 text-sm font-light">
                      {recipe.fields.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Recipes;
