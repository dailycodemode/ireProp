const axios = require("axios");
const cheerio = require("cheerio");

getReversedString = (s) => {
  return s.split("").reverse().join("");
}

getSplitDeail = (summaryDetail, needle) => {
  if (summaryDetail.includes(needle)){
    const myArray = summaryDetail.trim().split(" ");
    let i = myArray.indexOf(needle);
    if (i == -1) {
      i = myArray.indexOf(needle + 's');
    }
    // console.log(myArray, i);
    return myArray[i-1];
  }else{
    console.log('needle not found:' + needle);
    return("");
  } 
}

getSize = (summaryDetail, needle) => {
  if (summaryDetail.includes(needle)){
    let i = summaryDetail.indexOf(needle);
    let subDetail = summaryDetail.slice(0, i);
    let arr_subDetail = subDetail.trim().split(" ");
    return(arr_subDetail.at(-1));
  }else{
    console.log('needle not found:' + needle);
    return("");
  }  
  return "";
}

getHouseType = (summaryDetail, descriptionContent) => {
  // console.log('get house type');
  if (summaryDetail.includes('semi-detached house')){
    return 'semi'
  } else if (summaryDetail.includes('bungalow')) {
    return('bung');
  } else if (summaryDetail.includes('detached house')) {
    return('deta');
  } else if (summaryDetail.includes('end of terrace house')) {
    return('eot');
  } else if (summaryDetail.includes('apartment')) {
    return('apar');
  } else if (summaryDetail.includes('terraced house')) {
    return('terr');
  } else if (summaryDetail.includes('country house')) {
    return('coun');
  } else if (summaryDetail.includes('duplex')) {
    return('dupl');
  } else if (summaryDetail.includes('townhouse')) {
    return('town');
  } else if (summaryDetail.includes('cottage')) {
    return('cott');
  } else if (summaryDetail.includes('farm')) {
    return('farm');
  } else if (summaryDetail.includes('cottage')) {
    return('cott');
  } else if (summaryDetail.includes('dormer')) {
    return('dorm');
  }
  console.log('still could not get house type');
  if (descriptionContent.includes('bungalow')){
    return 'bung'
  } else if (descriptionContent.includes('semi-detached')) {
    return('semi');
  } else if (descriptionContent.includes('detached house')) {
    return('deta');
  } else if (descriptionContent.includes('end of terrace house')) {
    return('eot');
  } else if (descriptionContent.includes('apartment')) {
    return('apar');
  } else if (descriptionContent.includes('terraced house')) {
    return('terr');
  } 

  return ""
}

getRefreshDate = (summaryDetail) => {
  let i = summaryDetail.indexOf('Refreshed on ') + 13;
  const d = new Date(summaryDetail.slice(i).trim());
  return(d);
}
async function scrapePageSummaryDetails(url) {
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
      return(summary)
    } catch (err) {
      console.error(err);
    }
  }

module.exports.scrapePageSummaryDetails = scrapePageSummaryDetails;