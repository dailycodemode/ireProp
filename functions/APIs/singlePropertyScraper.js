const axios = require("axios");
const cheerio = require("cheerio");

getReversedString = (s) => {
  return s.split("").reverse().join("");
}

getSplitDeail = (summaryDetail, needle) => {
  if (summaryDetail.includes(needle)) {
    const myArray = summaryDetail.trim().split(" ");
    let i = myArray.indexOf(needle);
    if (i == -1) {
      i = myArray.indexOf(needle + 's');
    }
    // console.log(myArray, i);
    return myArray[i - 1];
  } else {
    console.log('needle not found:' + needle);
    return ("");
  }
}

getSize = (summaryDetail, needle) => {
  if (summaryDetail.includes(needle)) {
    let i = summaryDetail.indexOf(needle);
    let subDetail = summaryDetail.slice(0, i);
    let arr_subDetail = subDetail.trim().split(" ");
    return (arr_subDetail.at(-1));
  } else {
    console.log('needle not found:' + needle);
    return ("");
  }
  return "";
}


getHouseType = (summaryDetail, descriptionContent) => {
  if (summaryDetail.includes('semi-detached house')) {
    return 'S'
  } else if (summaryDetail.includes('bungalow')) {
    return ('B');
  } else if (summaryDetail.includes('detached house')) {
    return ('H');
  } else if (summaryDetail.includes('end of terrace house')) {
    return ('E');
  } else if (summaryDetail.includes('apartment')) {
    return ('A');
  } else if (summaryDetail.includes('terraced house')) {
    return ('T');
  } else if (summaryDetail.includes('country house')) {
    return ('R');
  } else if (summaryDetail.includes('duplex')) {
    return ('D');
  } else if (summaryDetail.includes('townhouse')) {
    return ('Z');
  } else if (summaryDetail.includes('cottage')) {
    return ('C');
  } else if (summaryDetail.includes('farm')) {
    return ('I');
  } else if (summaryDetail.includes('dormer')) {
    return ('K');
  } else if (summaryDetail.includes('studio')) {
    return ('F');
  } else if (summaryDetail.includes('investment')) {
    return ('I');
  } else if (summaryDetail.includes('site')) {
    return ('L');
  } else if (summaryDetail.includes('mews')) {
    return ('M');
  } else if (summaryDetail.includes('period house')) {
    return ('O');
  } else if (summaryDetail.includes('penthouse')) {
    return ('P');
  }
  console.log('still could not get house type');
  if (descriptionContent.includes('bungalow')) {
    return 'B'
  } else if (descriptionContent.includes('semi-detached')) {
    return ('S');
  } else if (descriptionContent.includes('detached house')) {
    return ('H');
  } else if (descriptionContent.includes('end of terrace house')) {
    return ('E');
  } else if (descriptionContent.includes('apartment')) {
    return ('A');
  } else if (descriptionContent.includes('terraced house')) {
    return ('T');
  }

  return ""
}

getRefreshDate = (summaryDetail) => {
  let i = summaryDetail.indexOf('Refreshed on ') + 13;
  const d = new Date(summaryDetail.slice(i).trim());
  return (d);
}
async function scrapePageSummaryDetails(url) {
  console.log("----scrapePageSummaryDetails called-----");
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const summaryDetails = $(".PropertyInfoStrip__Detail").text();
    const descriptionContent = $(".PropertyDetails__DescriptionContent").text();
    const mainImage = $(".PropertyMediaTabs__MainImage");

    let summary = {}
    console.log(summaryDetails);
    summary.beds = getSplitDeail(summaryDetails.toLowerCase(), 'bed');
    summary.baths = getSplitDeail(summaryDetails.toLowerCase(), 'bath');
    summary.size = getSize(summaryDetails.toLowerCase(), 'm 2');
    summary.houseType = getHouseType(summaryDetails.toLowerCase(), descriptionContent.toLowerCase());
    summary.refreshDate = getRefreshDate(summaryDetails);
    summary.mainImg = mainImage[0].attribs.src;
    summary.url = url;

    console.log(summary);
    return (summary)
  } catch (err) {
    console.error(err);
  }
}

module.exports.scrapePageSummaryDetails = scrapePageSummaryDetails;