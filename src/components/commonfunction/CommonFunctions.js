import moment from 'moment';
export const convertToKms = (val) => {

    const km = Number(val) / 1000;
    return String(km.toFixed(1) + " km")

}

export const calculatedJourneyEndTime = (startTime, approxTime) => {

       
    let finishTime = new Date(startTime)
    let newDate = new Date(finishTime.getTime() + approxTime * 1000)
    return (moment(newDate).format('HH:mm'))
    

}