import * as React from "react";
import styles from "./Layout.module.scss";
import { hashHistory } from "react-router";

export class Layout extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: "",
    };
    this.goHome = this.goHome.bind(this);
    this.goCart = this.goCart.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  goHome() {
    hashHistory.push("/");
  }

  goCart() {
    hashHistory.push("/cart");
  }

  handleSearchChange(event) {
    this.setState({ searchQuery: event.target.value });
  }

  public render() {
    const pathname = this.props.location.pathname;

    let pageTitle = "";
    if (pathname === "/") {
      pageTitle = "اطلاعات عمومی";
    } else if (pathname === "/cart") {
      pageTitle = "سبد خرید";
    } else if (pathname.startsWith("/product-details")) {
      pageTitle = "جزئیات محصول";
    } else if (pathname.startsWith("/order")) {
      pageTitle = "ثبت سفارش";
    } else {
      pageTitle = "صفحه ناشناخته";
    }

    return (
      <div className={styles.Layout}>
        <header className={styles.Header}>
          <h1>{pageTitle}</h1>

          <div className={styles.actionsContainer}>
            <button onClick={this.goCart} className={styles.btn}>
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
            </button>
            <button onClick={this.goHome} className={styles.btn}>
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5M4 15h3v-5H4zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zm3 0h-2v3h2z" />
              </svg>
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
