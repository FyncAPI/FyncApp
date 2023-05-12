import * as React from "react";
import { SvgXml } from "react-native-svg";

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Zm3.5-13.5-5 2-2 5 5-2 2-5Z"/>
</svg>

`;

export default function TestXml() {
  return <SvgXml xml={xml} width="100%" height="100%" />;
}
