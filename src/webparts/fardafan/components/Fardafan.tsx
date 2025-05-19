import * as React from "react";
import { IFardafanProps } from "./IFardafanProps";
import styles from "./Fardafan.module.scss";
import Personal from "./Personal/components/PersonalForm";
require("./font.css");

export default class Fardafan extends React.Component<IFardafanProps, {}> {
  public render(): React.ReactElement<IFardafanProps> {
    return (
      <div className={styles.container}>
        <Personal />
      </div>
    );
  }
}
