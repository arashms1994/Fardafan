import * as React from "react";
import { familyFormProps, FormField } from "./familyFormProps";
import styles from "./familyForm.module.scss";

export default class FamilyForm extends React.Component<familyFormProps, any> {
  constructor(props) {
    super(props);

    const initialState: any = {};
    props.fields.forEach((field: FormField) => {
      initialState[field.key] = "";
    });

    initialState.relation = props.relation;
    initialState.rowNumber = props.rowNumber;

    this.state = initialState;
  }

  handleChange = (key: string, value: string) => {
    this.setState({ [key]: value }, () => {
      this.props.onDataChange(this.props.GUID, this.state);
    });
  };

  render(): React.ReactElement<familyFormProps> {
    return (
      <form className={styles.familyFormContainer}>
        <h1>اطلاعات {this.state.relation}</h1>

        {this.props.fields.map((field) => (
          <div key={field.key}>
            <label>{field.label}</label>
            <input
              type={field.type}
              value={this.state[field.key]}
              onChange={(e) =>
                this.handleChange(field.key, e.currentTarget.value)
              }
            />
          </div>
        ))}
      </form>
    );
  }
}
