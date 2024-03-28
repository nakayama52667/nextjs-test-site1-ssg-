import React from 'react'
import styled from "styled-components";

const Heading02 = styled.h2`

font-size: 26px;
margin: 90px 0 50px;
text-align: center;
min-height: 70px;
display: flex;
align-items: center;
justify-content: center;
position: relative;

  &::after {
    content: "";
    width: 30px;
    border-bottom: 1px solid rgb(119, 119, 119);
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
`


export default Heading02