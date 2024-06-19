const calculateMaxPrice = (adverts) => {
    return adverts.reduce(
      (max, advert) => (advert.price > max ? advert.price : max),
      0
    )
}
export default calculateMaxPrice