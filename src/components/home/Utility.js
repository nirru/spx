import {inDays, inHours, inMonths, inWeeks, inYears} from "../../utility/DateDiff";

export const getHostName = (url) => {
    const match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
        return match[2];
    }
    else {
        return null;
    }
}

export const elapsedTime = (milli) => {
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