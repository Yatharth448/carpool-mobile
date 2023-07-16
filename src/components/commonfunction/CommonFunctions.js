export const convertToKms = (val) => {

    const km = Number(val) / 1000;
    return String(km.toFixed(1) + " km")

}