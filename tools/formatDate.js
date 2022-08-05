import moment from "moment";
export default function formatDate(date) {

    const dateFormat = moment(date).format('L');
    return dateFormat;


}