import moment from "moment";
export default function formatDate(date) {

    const dateFormat = moment(date).format('YYYY-MM-DD');
    return dateFormat;


}