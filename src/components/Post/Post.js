import React from "react";
import "./Post.css";

const post = (props) => (
  <article className="Post">
    <p>Id: {props.id}</p>
    <div>
      <p>Name: {props.name}</p>
    </div>
  </article>
);

export default post;
