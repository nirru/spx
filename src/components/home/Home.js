import React from "react";
import {connect} from "react-redux";
import {dispatchVoteAction, fetchData, fetchHideData} from "../../service/feedService";
import {dispatchNextPage, dispatchPrevPage} from "../../service/pageService";
import {FeedList} from "./FeedList";
import {elapsedTime, getHostName} from "./Utility";
import {FeedGraph} from "../footer/FeedGraph";

class Home extends React.Component{
    componentDidMount( ) {
        if ( this.props.feeds.length <= 0 ) {
            // this.props.fetchData( );
        }
    }
    goToNextFeeds = (page)=>{
        this.props.dispatchNextPage(page + 1);
    }

    goToPrevFeeds = (page) => {
        if (page > 1)
        this.props.dispatchPrevPage(page - 1);
    }

    render() {
        const { feeds } = this.props;
        return(
            <div id="page">
                <main className="wrapper">
                    <div className="term-grid grid-header">
                        <label>Comments</label>
                        <label>Vote Count</label>
                        <label>Up Votes</label>
                        <label className="news_details">News Details</label>
                    </div>
                    <FeedList hits={feeds.hits}
                              getHostName = {getHostName}
                              elapsedTime = {elapsedTime}
                              hide        = {this.props.fetchHideData}
                              upVote      = {this.props.dispatchVoteAction}

                    />

                    <div className="btn-next-prev">
                        <button className="next" onClick={()=>this.goToPrevFeeds(feeds.page)}>Previous</button>

                        <button className="next" onClick={()=>this.goToNextFeeds(feeds.page)}>Next</button>
                    </div>
                </main>
                <FeedGraph feeds={feeds.hits}/>
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
    fetchHideData,
    dispatchNextPage,
    dispatchPrevPage,
    dispatchVoteAction
};

export default connect( mapStateToProps, mapDispatchToProps )( Home );
