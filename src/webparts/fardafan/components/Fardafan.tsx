import * as React from "react";

import { IFardafanProps } from "./IFardafanProps";
import { escape } from "@microsoft/sp-lodash-subset";
import styles from "./Fardafan.module.scss";
require("./font.css");
export default class Fardafan extends React.Component<IFardafanProps, {}> {
  public render(): React.ReactElement<IFardafanProps> {
    return <div className={styles.test}>hi</div>;
  }
}
