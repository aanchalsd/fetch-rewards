import React, { Component } from "react";
import axios from "axios";
import Post from "../../components/Post/Post";
import "./FetchedData.css";

class FetchedData extends Component {
  state = {
    posts: [],
    postgrouped: [],
    show: { 1: false, 2: false, 3: false, 4: false },
    list1: false,
    list2: false,
    list3: false,
    list4: false,
  };

  groupBy = (xs, key) => {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  componentDidMount() {
    // using axios to fetch the data from api
    axios.get("/hiring.json").then((response) => {
      const posts = response.data;

    // sorting data first based on listId and then id (which is same as name)
      posts.sort(function (a, b) {
        if (a.listId === b.listId) {
          return a.id - b.id;
        }
        return a.listId > b.listId ? 1 : -1;
      });

      let postgrouped = this.groupBy([...posts], "listId");
      this.setState({ postgrouped: postgrouped });

      const updatedPosts = posts.map((post) => {
        return {
          key: posts.id,
          ...post,
        };
      });

      this.setState({ posts: updatedPosts });
    });
  }

  clickHandler = (id) => {
    let _flag = null;

    switch (id) {
      case "1":
        _flag = !this.state.list1;
        this.setState({ list1: _flag });
        break;

      case "2":
        _flag = !this.state.list2;
        this.setState({ list2: _flag });
        break;

      case "3":
        _flag = !this.state.list3;
        this.setState({ list3: _flag });
        break;

      case "4":
        _flag = !this.state.list4;
        this.setState({ list4: _flag });
        break;

      default:
        console.log(id + "we are in default");
    }
  };

  render() {
  
    return Object.keys(this.state.postgrouped).map((cat) => (
      <div key={cat.id}>
        <button
          className="ButtonStyle"
          onClick={(e) => this.clickHandler(cat)}
          href={"#" + cat}>

          <h3>ListId: {cat}</h3>
        </button>

        <h3>{this.state.show.cat}</h3>

        {(cat === "1" && this.state.list1) ||
        (cat === "2" && this.state.list2) ||
        (cat === "3" && this.state.list3) ||
        (cat === "4" && this.state.list4) ? (
          <div id={cat}>
            {this.state.postgrouped[cat].map((ord) => (
              <div key={ord.id} >
                {ord.name !== "" && ord.name !== null ? (
                  <Post
                    className="PostDisplay"
                    id={ord.id}
                    name={ord.name}
                  />
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    ));
  }
}

export default FetchedData;
