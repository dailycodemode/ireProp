import React from 'react';
import placeHouse from './root/placeHouse.png';
class PreviewProperty extends React.Component {

  getHouseImgScr = () => {

    let {onePost} =  this.props.onePageDetails;
    if (typeof onePost === 'undefined') {
      return placeHouse
    } else {
      return onePost.mainImg
    }
  }

  render() {
    let {onePost} =  this.props.onePageDetails;

    const renderSummaryDetails = () => {
      if (typeof onePost !== 'undefined') {
        console.log('will display table');
        return( 
        <div>
          <table>
          <thead>
            <tr>
              {typeof onePost.beds !== 'undefined' ? <td>{onePost.beds} bed</td> : null}
              {typeof onePost.baths !== 'undefined' ? <td>{onePost.baths} bath</td> : null}
              {typeof onePost.size !== 'undefined' ? <td>{onePost.size} m2</td> : null}
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

