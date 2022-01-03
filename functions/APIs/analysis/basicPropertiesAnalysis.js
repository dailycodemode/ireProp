const basicPropAnalysis = (arrProps, houseType) => {
    // console.log(arrProps);
    let filteredProps = relevantProperties(arrProps, houseType);
    let prices = pricesOfFilteredProps(filteredProps)
    let median = getMedians(prices);
    let avg = getAvg(prices);
    let objAnalysis = {
        "median": median,
        "avg": avg
    }
    return objAnalysis;
}

module.exports.basicPropAnalysis = basicPropAnalysis;

const getMedians = (values) => {
    values.sort(function (a, b) {
        return a - b;
    });
    let half = Math.floor(values.length / 2);

    if (values.length % 2)
        return values[half];
    else
        return (values[half - 1] + values[half]) / 2.0;
}

const getAvg = (values) => {
    const total = values.reduce((acc, c) => acc + c, 0);
    return total / values.length;
}

const relevantProperties = (arrProps, houseType) => {

    var filteredProps = arrProps.filter(function (prop) {
        return prop.propType == houseType
            && prop.curPrice != 'poa';
    });
    return filteredProps;
}

const pricesOfFilteredProps = (filteredProps) => {
    const arrPrices = filteredProps.map(
        (x) => {
            return (Number(x.curPrice))
        }
    );
    return (arrPrices);
}
