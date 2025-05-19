import * as React from "react";
import { familyFormProps } from "./familyFormProps";
import styles from "./familyForm.module.scss";
export default class FamilyForm extends React.Component<familyFormProps, {}> {
  constructor(props) {
    super(props);
    this.state = {
      partnerFullName: "",
      birthDate: "",
      job: "",
      education: "",
      phoneNumber: "",
      relation: "همسر",
    };
  }
  public render(): React.ReactElement<familyFormProps> {
    return (
      <form className={styles.familyFormContainer}>
        <h1>اطلاعات همسر</h1>
        <label htmlFor="partnerFullName">نام همسر</label>
        <input
          type="text"
          onChange={(e) =>
            this.setState({ partnerFullName: e.currentTarget.value })
          }
        />
        <label htmlFor="partnerFullName"> تاریخ تولد</label>
        <input
          type="text"
          onChange={(e) => this.setState({ birhDate: e.currentTarget.value })}
        />
        <label htmlFor="partnerFullName"> شغل</label>
        <input
          type="text"
          onChange={(e) => this.setState({ job: e.currentTarget.value })}
        />
        <label htmlFor="partnerFullName"> تحصیلات</label>
        <input
          type="text"
          onChange={(e) => this.setState({ education: e.currentTarget.value })}
        />
        <label htmlFor="partnerFullName"> شماره همراه</label>
        <input
          type="text"
          onChange={(e) =>
            this.setState({ education: Number(e.currentTarget.value) })
          }
        />
      </form>
    );
  }
}
