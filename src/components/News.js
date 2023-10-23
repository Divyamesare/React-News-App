import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    pageSize: 12,
    country: "us",
    category: "sports",
  };

  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async update() {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=d2efbac716ef4cd29f9d62237244d3f7&page=${
      this.state.page
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page: this.state.page,
      articles: parsedData.articles,
      loading: false,
    });
  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=d2efbac716ef4cd29f9d62237244d3f7`

    this.update();
  }

  goToPrev = async () => {
    // console.log("clicked on Prev")
    this.setState({page : this.state.page-1});
    this.update();
  };

  goToNext = async () => {
    // console.log("clicked on Next");

    this.setState({page : this.state.page+1});
    this.update();
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">News 24/7 -Top Headlines</h1>

        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>

        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            onClick={this.goToPrev}
            className="btn btn-dark"
          >
            &larr; Previous{" "}
          </button>

          <button
            type="button"
            onClick={this.goToNext}
            className="btn btn-dark"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
