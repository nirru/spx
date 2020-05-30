import React from "react";
export const FeedList = ({hits,getHostName,elapsedTime,hide,upVote}) => {
    return (
        <>
            {hits.map((item,index)=> {
                return <div className="term-grid" key={index}>
                    <label className="comments">{item.num_comments !== null  ? item.num_comments : 0}</label>
                    <label className="vote_counts">{item.points !== undefined  ? item.points : 0}</label>
                    <label className="up_votes">
                        <img className="up_votes_img"
                             src="../../assets/up_arrow.png"
                             alt="upvotes"
                             onClick={()=> upVote(item.objectID)}/>
                    </label>
                    <label className="news_details">
                        {item.title !== null  ? item.title : 'N/A'}
                        <span className="info">
                                    {item.url !== null ?
                                        <a href={item.url} target="_blank">
                                            {item.url && getHostName(item.url)}
                                        </a> : 'N/A'}
                            &nbsp; by &nbsp;
                            <strong className="author">{item.author !== null ? item.author : "N/A"}</strong>
                            &nbsp; {item.created_at && elapsedTime(item.created_at)}
                            &nbsp;
                            <span onClick={()=>hide(item.objectID)}>hide</span>
                                </span>
                    </label>
                </div>
            })}
        </>
    )
}