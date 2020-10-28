import {
  MoreOutlined,
  HeartOutlined,
  SendOutlined,
  PushpinOutlined,
  HeartFilled,
} from "@ant-design/icons";
import "./App.css";
import { useState, useEffect } from "react";
import moment from "moment";
import api from "./api";

function App() {
  const [posts, setPosts] = useState([]);
  const [isLiked, setIsLiked] = useState(localStorage.getItem("isLiked"));
  const [input, setInput] = useState();
  const [revCont, setRevCont] = useState();
  const [reviews, setReviews] = useState();

  const toggleLike = async (like, id) => {
    let res = await api.put("/", { like, id });
    setPosts(res.data.data);
  };

  const addReview = async (id, user, content) => {
    let res = await api.post("/reviews/", { id, user, content });
    setReviews(res.data.data);
  };

  const getReview = async () => {
    let res = await api.get("/reviews/");
    console.log(res.data.data);
    setReviews(res.data.data);
  };

  const getPost = async () => {
    // let url = process.env.REACT_APP_BACKEND;
    let res = await api.get("/");
    // let data = await response.json();
    // console.log(data.data);
    setPosts(res.data.data);
  };

  useEffect(() => {
    getPost();
    getReview();
  }, [isLiked, revCont]);

  return (
    posts &&
    posts.map((post) => (
      <div className="body">
        {console.log(posts)}
        <div className="container">
          <div className="header">
            <div className="leftHeader">
              <img alt="" src={post.author.avatarUrl} className="image" />
              <div className="avatarCont">
                <div>
                  <b>{post.author.name}</b>
                </div>
                <div>{post.location}</div>
              </div>
            </div>
            <MoreOutlined style={{ fontSize: "25px" }} />
          </div>
          <div className="mainpic">
            <img alt="" src={post.imageUrl} />
          </div>
          <div className="emoArev">
            <div className="emo">
              <div>
                {!isLiked ? (
                  <HeartOutlined
                    style={{ fontSize: "25px" }}
                    onClick={() => {
                      setIsLiked(true);
                      localStorage.setItem("isLiked", true);
                      console.log("like ne", isLiked);
                      toggleLike("true", post._id);
                    }}
                  />
                ) : (
                  <HeartFilled
                    style={{ color: "red", fontSize: "25px" }}
                    onClick={() => {
                      setIsLiked(false);
                      localStorage.setItem("isLiked", false);
                      console.log("like ne", isLiked);
                      toggleLike("false", post._id);
                    }}
                  />
                )}
                <span>{post.likeCount}</span>
              </div>
              <SendOutlined style={{ fontSize: "25px" }} />
              <PushpinOutlined style={{ fontSize: "25px" }} />
            </div>
            <br />
            <div className="like">
              <img
                alt=""
                src="https://i.insider.com/5e5d2aa1fee23d10847a28f8?width=750&format=jpeg"
                className="likeimg"
              />{" "}
              &nbsp;{" "}
              <span>
                Like by&nbsp;<b>trump</b>&nbsp;and&nbsp; <b>12 others</b>
              </span>
            </div>
            <br />
            <div className="like">
              <b>{post.author.name}</b>&nbsp;
              {post.caption}
            </div>
            <br />
            <div className="like hour">
              <b>{moment(post.createdAt).fromNow()}</b>
            </div>
            {reviews &&
              reviews.map((rev) => (
                <div>
                  {rev.user} : "{rev.content}"
                </div>
              ))}
          </div>
          <div className="comment">
            <input
              placeholder="Add a comment..."
              onChange={(e) => setInput(e.target.value)}
            />{" "}
            <button
              type="button"
              onClick={() => {
                setRevCont(input);
                console.log(revCont);
                addReview(post._id, "Anonymous User", input);
              }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    ))
  );
}

export default App;
