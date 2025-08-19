// import React, { Component } from 'react';
// import Newsitems from './Newsitems';
// import Spinner from './Spinner';
// import PropTypes from 'prop-types';

// export default class News extends Component {
//   static defaultProps = {
//     country: 'in',
//     pageSize: 8,
//     category: 'general'
//   };

//   static propTypes = {
//     country: PropTypes.string,
//     pageSize: PropTypes.number,
//     category: PropTypes.string
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       articles: [],
//       loading: false,
//       page: 1,
//       totalresult: 0
//     };
//     document.title=`${this.props.category} - News`;
//   }

//   async componentDidMount() {
//     this.setState({ loading: true });
//     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bb2385b795f64fb2a05831b6118df1a3&page=${this.state.page}&pageSize=${this.props.pageSize}`;
//     let data = await fetch(url);
//     let parsedata = await data.json();
//     this.setState({ 
//       articles: parsedata.articles, 
//       totalresult: parsedata.totalResults,
//       loading: false
//     });
//   }

//   handlepreclick = async () => {
//     if (this.state.page <= 1) return;

//     this.setState({ loading: true });
//     let prevPage = this.state.page - 1;
//     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bb2385b795f64fb2a05831b6118df1a3&page=${prevPage}&pageSize=${this.props.pageSize}`;
//     let data = await fetch(url);
//     let parsedata = await data.json();

//     this.setState({
//       page: prevPage,
//       articles: parsedata.articles,
//       loading: false
//     });
//   }

//   handlenextclick = async () => {
//     if (this.state.page + 1 > Math.ceil(this.state.totalresult / this.props.pageSize)) return;

//     this.setState({ loading: true });
//     let nextPage = this.state.page + 1;
//     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bb2385b795f64fb2a05831b6118df1a3&page=${nextPage}&pageSize=${this.props.pageSize}`;
//     let data = await fetch(url);
//     let parsedata = await data.json();

//     this.setState({
//       page: nextPage,
//       articles: parsedata.articles,
//       loading: false
//     });
//   }

//   render() {
//     return (
//       <div className='container my-3'> 
//         <h2 className="text-center my-3">Top {this.props.category} Headlines</h2>

//         {this.state.loading && <Spinner />}

//         {!this.state.loading &&
//           <div className="row">
//             {this.state.articles.map((element) => {
//               return (
//                 <div className="col-md-4" key={element.url}>
//                   <Newsitems
//                     title={element.title ? element.title.slice(0, 40) : ""}
//                     description={element.description ? element.description.slice(0, 80) : ""}
//                     imageurl={element.urlToImage}
//                     newsurl={element.url}
//                   />
//                 </div>
//               );
//             })}
//           </div>
//         }

//         <div className="container d-flex justify-content-between my-2">
//           <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlepreclick}>
//             &larr; Previous
//           </button>
//           <button type="button" className="btn btn-dark" onClick={this.handlenextclick}>
//             Next &rarr;
//           </button>
//         </div>
//       </div>
//     );
//   }
// }
                                            // INfinte scroll code below

import React, { useEffect, useState } from 'react';
import Newsitems from './Newsitems';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResult, setTotalResult] = useState(0);

  const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

  useEffect(() => {
    document.title = `${capitalize(props.category)} - News`;
    fetchNews(); // Initial fetch
    // eslint-disable-next-line
  }, []);

  const fetchNews = async () => {
    props.setprogress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=bb2385b795f64fb2a05831b6118df1a3&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setprogress(30);
    let parsedData = await data.json();
    props.setprogress(70);
    setArticles(parsedData.articles);
    setTotalResult(parsedData.totalResults);
    setLoading(false);
    props.setprogress(100);
  };

  const fetchMoreData = async () => {
    if (articles.length >= totalResult) return;

    const nextPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=bb2385b795f64fb2a05831b6118df1a3&page=${nextPage}&pageSize=${props.pageSize}`;
    const data = await fetch(url);
    const parsedData = await data.json();

    if (!parsedData.articles || parsedData.articles.length === 0) {
      setTotalResult(articles.length); // Prevent more fetches
      return;
    }

    setArticles(articles.concat(parsedData.articles));
    setPage(nextPage);
  };

  return (
    <div className='container my-3'>
      <h2 className="text-center my-3">Top {capitalize(props.category)} Headlines</h2>

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResult}
        loader={<Spinner />}
        endMessage={
          <p style={{ textAlign: 'center', marginTop: '20px' }}>
            <b>Yay! You have seen all the news</b>
          </p>
        }
      >
        <div className="row">
          {articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <Newsitems
                title={element.title ? element.title.slice(0, 40) : ""}
                description={element.description ? element.description.slice(0, 80) : ""}
                imageurl={element.urlToImage}
                newsurl={element.url}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setprogress: PropTypes.func
};

export default News;
