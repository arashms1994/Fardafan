import * as React from "react";
import { familyFormProps } from "./familyFormProps";
import styles from "./familyForm.module.scss";

export default class FamilyForm extends React.Component<familyFormProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      birthDate: "",
      job: "",
      education: "",
      phoneNumber: "",
      relation: props.relation,
    };
  }

  handleChange = (key: string, value: string) => {
    this.setState({ [key]: value }, () => {
      if (this.props.onDataChange) {
        this.props.onDataChange(this.props.GUID, this.state);
      }
    });
  };

  render(): React.ReactElement<familyFormProps> {
    return (
      <form className={styles.familyFormContainer}>
        <h1>اطلاعات {this.state.relation}</h1>

        <label>نام</label>
        <input type="text" onChange={(e) => this.handleChange("fullName", e.currentTarget.value)} />

        <label>تاریخ تولد</label>
        <input type="text" onChange={(e) => this.handleChange("birthDate", e.currentTarget.value)} />

        <label>شغل</label>
        <input type="text" onChange={(e) => this.handleChange("job", e.currentTarget.value)} />

        <label>تحصیلات</label>
        <input type="text" onChange={(e) => this.handleChange("education", e.currentTarget.value)} />

        <label>شماره همراه</label>
        <input type="text" onChange={(e) => this.handleChange("phoneNumber", e.currentTarget.value)} />
      </form>
    );
  }
}
