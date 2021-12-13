import React from 'react';
import placeHouse from './root/placeHouse.png';
class PreviewProperty extends React.Component {

  getHouseImgScr = () => {
    let { onePost } = this.props.onePageDetails;
    if (typeof onePost === 'undefined') {
      return placeHouse
    } else {
      return onePost.mainImg
    }
  }

  getHouseType = (type) => {
    switch (type) {
      case "semi":
        return "Semi-Detached House"
        break;
      case "apar":
        return "Aparment"
        break;
      default:
        return type
    }
  }
  render() {
    let { onePost } = this.props.onePageDetails;

    const renderSummaryDetails = () => {
      if (typeof onePost !== 'undefined') {
        // console.log('will display table');
        return (
          <div>
            <table>
              <thead>
                <tr>
                  {typeof onePost.houseType ? <td>{this.getHouseType(onePost.houseType)}</td> : null}
                  {typeof onePost.beds ? <td>{onePost.beds} bed</td> : null}
                  {typeof onePost.baths ? <td>{onePost.baths} bath</td> : null}
                  {typeof onePost.size ? <td>{onePost.size} m<sup>2</sup></td> : null}
                </tr>
              </thead>
            </table>
          </div>)
          ;
      }
      return null;
    }

    return (< div >
      <section className="one-fourth" id="html" >
        <img src={this.getHouseImgScr()} alt="placeHouse" />
      </section>
      {renderSummaryDetails()}
    </div>

    );
  }
}

export default PreviewProperty;

