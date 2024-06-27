import React from "react";
import { IComment } from "../interface/types";

const Card = ({ profile }: { profile: IComment }) => {
  return (
    <div>
      <div className="card card-compact bg-base-100 w-96 shadow-xl">
        <figure>
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src={`${profile.authorProfileImageUrl}`} />
            </div>
          </div>
        </figure>
        <div className="card-body flex justify-center items-center">
          <h2 className="card-title">{profile.authorDisplayName}</h2>
          <p>{profile.likeCount}</p>
          <p>{profile.textDisplay}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
