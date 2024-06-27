"use client";

import { ChangeEvent, useState } from "react";
import getVideoComments from "./actions/getAllComment";
import getVideoId from "./lib/getVideoId";
import Card from "./components/card";
import { IComment, IOptions } from "./interface/types";
import _ from "lodash";
import { Bounce, toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
export default function Home() {
  const [link, setLink] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [totalComments, setTotalComments] = useState(0);
  const [comments, setComments] = useState<IComment[]>([]);
  const [winner, setWinner] = useState<IComment>();

  const [options, setOptions] = useState<IOptions>({
    allowDuplicates: false,
    includeReplies: false,
  });

  const fetchComment = async () => {
    if (getVideoId(link) == null) {
      toast("Invalid URL", {
        type: "error",
      });
    } else {
      setisLoading(true);

      try {
        const videoId = getVideoId(link);
        const comments = await getVideoComments(videoId!, options);
        if (comments) {
          setComments(comments);
        }
        setSuccess(true);
        setTotalComments(comments!.length);
      } catch (error) {}

      setisLoading(false);
    }
  };

  const pickWinner = () => {
    if (comments) {
      const randomComment = _.sample(comments);
      setWinner(randomComment);
    }
  };

  const onInput = (event: ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  const toogleAllowDuplicates = () => {
    setOptions((prev) => ({
      ...prev,
      allowDuplicates: !prev.allowDuplicates,
    }));
  };
  const toogleIncludeReplies = () => {
    setOptions((prev) => ({
      ...prev,
      includeReplies: !prev.includeReplies,
    }));
  };

  return (
    <main className="flex  flex-col items-center justify-between p-24">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="light"
        transition={Bounce}
      />

      <div>
        <div className="relative mt-2 rounded-md shadow-sm ">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
          <input
            value={link}
            onChange={onInput}
            type="text"
            name="link"
            id="link"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Paste Youtube Link"
          />

          <div className="flex">
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  checked={options.allowDuplicates}
                  onChange={toogleAllowDuplicates}
                  type="checkbox"
                  className="toggle toggle-primary"
                />
                <span className="label-text ml-2"> Allow Duplicates</span>
              </label>
            </div>
            <div className="divider">|</div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  checked={options.includeReplies}
                  onChange={toogleIncludeReplies}
                  type="checkbox"
                  className="toggle toggle-primary"
                />
                <span className="label-text ml-2"> Include Replies</span>
              </label>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center flex-col">
          {isLoading && (
            <svg
              className=" animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 4335 4335"
              width="50"
              height="50"
            >
              <path
                fill="#008DD2"
                d="M3346 1077c41,0 75,34 75,75 0,41 -34,75 -75,75 -41,0 -75,-34 -75,-75 0,-41 34,-75 75,-75zm-1198 -824c193,0 349,156 349,349 0,193 -156,349 -349,349 -193,0 -349,-156 -349,-349 0,-193 156,-349 349,-349zm-1116 546c151,0 274,123 274,274 0,151 -123,274 -274,274 -151,0 -274,-123 -274,-274 0,-151 123,-274 274,-274zm-500 1189c134,0 243,109 243,243 0,134 -109,243 -243,243 -134,0 -243,-109 -243,-243 0,-134 109,-243 243,-243zm500 1223c121,0 218,98 218,218 0,121 -98,218 -218,218 -121,0 -218,-98 -218,-218 0,-121 98,-218 218,-218zm1116 434c110,0 200,89 200,200 0,110 -89,200 -200,200 -110,0 -200,-89 -200,-200 0,-110 89,-200 200,-200zm1145 -434c81,0 147,66 147,147 0,81 -66,147 -147,147 -81,0 -147,-66 -147,-147 0,-81 66,-147 147,-147zm459 -1098c65,0 119,53 119,119 0,65 -53,119 -119,119 -65,0 -119,-53 -119,-119 0,-65 53,-119 119,-119z"
              />
            </svg>
          )}
          {success && (
            <p>
              <span className=" text-green-500"> Complete</span>: Loaded `{" "}
              {totalComments}` Comments
            </p>
          )}

          {success ? (
            <button
              type="button"
              onClick={pickWinner}
              className="bg-indigo-500 m-2 p-2 pr-8 pl-8 cursor-pointer rounded-full text-white hover:scale-110 "
            >
              Pick A Winner
            </button>
          ) : (
            <button
              onClick={fetchComment}
              type="button"
              className={`  bg-indigo-500 m-2 p-2 pr-8 pl-8 cursor-pointer rounded-full text-white hover:scale-110 disabled  ${
                isLoading ? "btn-disabled" : ""
              }`}
            >
              Fetch
            </button>
          )}

          {winner && <Card profile={winner!} />}
        </div>
      </div>
    </main>
  );
}
