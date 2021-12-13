import React from 'react';
import placeHouse from './root/placeHouse.png';

class PreviewProperty extends React.Component {

  getHouseImgScr = () => {
    if (typeof this.props.mainImg === 'undefined') {
      console.log("placeHouse");
      return placeHouse
    } else {
      console.log(this.props.mainImg);
      return this.props.mainImg
    }
  }
  render() {
    return (< div >
      <section className="one-fourth" id="html" >
        <img src={this.getHouseImgScr()} alt="placeHouse" />
      </section> </div>
    );
  }
}

export default PreviewProperty;