import * as React from "react";
import styles from "./Layout.module.scss";
import { hashHistory } from "react-router";

export class Layout extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
    };
    this.goEx = this.goEx.bind(this);
    this.goFa = this.goFa.bind(this);
    this.goPr = this.goPr.bind(this);
    this.goPe = this.goPe.bind(this);

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  goEx() {
    hashHistory.push("/experience");
  }

  goFa() {
    hashHistory.push("/family");
  }
  goPr() {
    hashHistory.push("/profession");
  }

  goPe() {
    hashHistory.push("/");
  }

  handleSearchChange(event) {
    this.setState({ searchQuery: event.target.value });
  }

  getButtonClass(targetPath) {
    const { pathname } = this.props.location;
    return pathname === targetPath ? styles.activeBtn : styles.btn;
  }

  public render() {
    const { pathname } = this.props.location;

    return (
      <div className={styles.Layout}>
        <header className={styles.Header}>
          <div className={styles.actionsContainer}>
            <button
              onClick={this.goEx}
              className={this.getButtonClass("/experience")}
            >
              سوابق و مهارت ها
            </button>
            <button
              onClick={this.goFa}
              className={this.getButtonClass("/family")}
            >
              اطلاعات خانواده
            </button>
            <button
              onClick={this.goPr}
              className={this.getButtonClass("/profession")}
            >
              اطلاعات شغلی
            </button>
            <button onClick={this.goPe} className={this.getButtonClass("/")}>
              اطلاعات شخصی
            </button>
          </div>
        </header>

        <main>
          {React.cloneElement(this.props.children, {
            searchQuery: this.state.searchQuery,
          })}
        </main>
      </div>
    );
  }
}
