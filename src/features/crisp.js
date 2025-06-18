import React, { Component } from "react";

import { Crisp } from "crisp-sdk-web";

class CrispChat extends Component {
  componentDidMount () {
    Crisp.configure("82709ffd-5266-4663-830b-29328d67cbed");
  }

  render () {
    return null;
  }
}
export default CrispChat