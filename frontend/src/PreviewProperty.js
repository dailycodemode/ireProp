import React from 'react';
import placeHouse from './root/placeHouse.png';

class PreviewProperty extends React.Component {
  render() {
    return (< div >
      <section className="one-fourth" id="html" >
        <img src={placeHouse} alt="placeHouse" />
      </section> </div>
    );
  }
}

export default PreviewProperty;