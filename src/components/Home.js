import React from "react";
import {Footer} from "./footer";
import {fetchData, fetchHideData} from "../store/store";
import {connect} from "react-redux";
import {inDays, inHours, inMonths, inWeeks, inYears} from "../utility/DateDiff";
import StateLoader from "../utility/StateLoader";
const stateLoader = new StateLoader();
class Home extends React.Component{
    componentDidMount( ) {
        if ( this.props.feeds.length <= 0 ) {
            this.props.fetchData( );
        }
    }
     getHostName = (url) => {
        const match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
        if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
            return match[2];
        }
        else {
            return null;
        }
    }

    hideData = () => {
        this.props.fetchHideData();
    }
    elapsedTime = (milli) => {
        const d1 = new Date(milli);
        const d2 = new Date();

        let difference = '0';
        if (inYears(d1,d2) > 0){
             difference =   inYears(d1,d2) + " year ago";
        } else if (inMonths(d1,d2) > 0){
             difference =  inMonths(d1,d2) + " month ago";
        }else if (inWeeks(d1,d2) > 0){
             difference = "Week" + inWeeks(d1,d2)  + " week ago";
        }else if (inDays(d1,d2) > 0){
             difference = "Days" + inDays(d1,d2) + " days ago";
        }else if (inHours(d1,d2) > 0){
             difference = "Hours" + inHours(d1,d2)  + " hours ago";
        } else {
             difference = '0'
        }

        return difference;


    }
    render() {
        const { feeds } = this.props;
        const feeds1 = stateLoader.loadState();
        console.log(feeds.hasOwnProperty('hits') );
        return(
            <div id="page">
                <main className="wrapper">
                    <div className="term-grid grid-header">
                        <label>Comments</label>
                        <label>Vote Count</label>
                        <label>Up Votes</label>
                        <label className="news_details">News Details</label>
                    </div>
                    {feeds.hasOwnProperty('hits') && feeds.hits.map((item,index)=>{
                        return <div className="term-grid" key={index}>
                            <label className="comments">{item.num_comments !== null  ? item.num_comments : 0}</label>
                            <label className="vote_counts">{item.point !== undefined  ? item.point : 0}</label>
                            <label className="up_votes">55</label>
                            <label className="news_details">
                                {item.title !== null  ? item.title : 'N/A'}
                                <span className="info">
                                    {item.url !== null ?
                                        <a href={item.url} target="_blank">
                                            {item.url && this.getHostName(item.url)}
                                    </a> : 'N/A'}
                                    &nbsp; by &nbsp;
                                  <strong className="author">{item.author !== null ? item.author : "N/A"}</strong>
                                   &nbsp; {item.created_at && this.elapsedTime(item.created_at)}
                                    &nbsp;
                                    <a href="javascript:void (0)" onClick={()=>this.hideData()}>hide</a>
                                </span>
                            </label>
                        </div>
                    })}
                    <div className="term-grid">
                        <label className="comments">36</label>
                        <label className="vote_counts">678</label>
                        <label className="up_votes">55</label>
                        <label className="news_details">News Details lo<span>sdsd</span></label>
                    </div>
                    <div className="term-grid">
                        <label className="comments">36</label>
                        <label className="vote_counts">678</label>
                        <label className="up_votes">55</label>
                        <label className="news_details">News Details lo</label>
                    </div>
                    <div className="term-grid">
                        <label className="comments">36</label>
                        <label className="vote_counts">678</label>
                        <label className="up_votes">55</label>
                        <label className="news_details">News Details lo</label>
                    </div>
                    <div className="btn-next-prev">
                        <button className="next">Previous</button>

                        <button className="next">Next</button>
                    </div>
                </main>
                <footer><Footer></Footer></footer>
            </div>
        )
    }
}

Home.serverFetch = fetchData; // static declaration of data requirements

const mapStateToProps = ( state ) => ( {
    feeds: state.data,

} );

const mapDispatchToProps = {
    fetchData,
    fetchHideData
};

export default connect( mapStateToProps, mapDispatchToProps )( Home );
