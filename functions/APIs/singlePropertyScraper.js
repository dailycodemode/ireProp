const axios = require("axios");
const cheerio = require("cheerio");

getReversedString = (s) => {
  return s.split("").reverse().join("");
}

getSplitDeail = (summaryDetail, needle) => {
  if (summaryDetail.includes(needle)){
    const myArray = summaryDetail.trim().split(" ");
    let i = myArray.indexOf(needle);
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
}

getHouseType = (summaryDetail, descriptionContent) => {
  if (summaryDetail.includes('semi-detached house')){
    return 'semi'
  }else if (summaryDetail.includes('Bungalow')) {
    return('bung');
  } 

  if (descriptionContent.includes('bungalow')){
    return 'bung'
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
      const summaryDetails = $(".PropertyInfoStrip__Detail");
      const descriptionContent = $(".PropertyDetails__DescriptionContent");
      const mainImage = $(".PropertyMediaTabs__MainImage");
      // console.log(descriptionContent.text());
      let summary = {}
      // console.log(summaryDetails.text());
      summary.beds = getSplitDeail(summaryDetails.text(), 'bed');
      summary.baths = getSplitDeail(summaryDetails.text(), 'bath');
      summary.size = getSize(summaryDetails.text(), 'm 2');
      summary.houseType = getHouseType(summaryDetails.text().toLowerCase(), descriptionContent.text().toLowerCase());
      summary.refreshDate = getRefreshDate(summaryDetails.text());
      summary.mainImg = mainImage[0].attribs.src;
      
      console.log(summary);
      return(summary)
    } catch (err) {
      console.error(err);
    }
  }

module.exports.scrapePageSummaryDetails = scrapePageSummaryDetails;