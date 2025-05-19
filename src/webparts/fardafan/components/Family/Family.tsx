import * as React from "react";
import { IFardafanProps } from "./IFardafanProps";
import FamilyForm from "./components/FamilyForm";
import styles from "./Fardafan.module.scss";

interface FamilyState {
  formsData: Record<string, any>;
}

export default class Family extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      formsData: {},
    };
  }

  handleFormChange = (guid: string, data: any): void => {
    this.setState((prevState) => ({
      formsData: {
        ...prevState.formsData,
        [guid]: data,
      },
    }));
  };

  getDigest = async (): Promise<string> => {
    const response = await fetch(
      `http://sharepoint.fardafan.com/HR/_api/contextinfo`,
      {
        method: "POST",
        headers: {
          Accept: "application/json;odata=verbose",
        },
      }
    );

    const json = await response.json();
    return json.d.GetContextWebInformation.FormDigestValue;
  };

  handleSubmitAll = async (): Promise<void> => {
    const webUrl = "http://sharepoint.fardafan.com/HR"; // ✅ مسیر درست

    const digest = await this.getDigest();

    for (const guid in this.state.formsData) {
      if (Object.prototype.hasOwnProperty.call(this.state.formsData, guid)) {
        const data = this.state.formsData[guid];
        const payload = {
          __metadata: { type: "SP.Data.HRFamilyInfoListItem" },
          Title: data.fullName,
          birthDate: data.birthDate,
          job: data.job,
          education: data.education,
          phoneNumber: data.phoneNumber,
          address: data.address || "",
          GUID0: guid,
          relation: data.relation,
        };

        try {
          const response = await fetch(
            `${webUrl}/_api/web/lists(guid'E7392A60-8890-40CE-9E5B-899A9F80482D')/items`,
            {
              method: "POST",
              headers: {
                Accept: "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose",
                "X-RequestDigest": digest,
              },
              body: JSON.stringify(payload),
            }
          );

          if (response.ok) {
            console.log("✅ ثبت شد:", guid);
          } else {
            const error = await response.text();
            console.error("❌ خطا در ثبت", guid, error);
          }
        } catch (err) {
          console.error("❌ خطای شبکه در ثبت", guid, err);
        }
      }
    }
  };

  render(): React.ReactElement<IFardafanProps> {
    return (
      <div className={styles.test}>
        <FamilyForm
          GUID="1"
          relation="همسر"
          onDataChange={this.handleFormChange}
        />
        <FamilyForm
          GUID="2"
          relation="فرزند"
          onDataChange={this.handleFormChange}
        />
        <FamilyForm
          GUID="3"
          relation="پدر"
          onDataChange={this.handleFormChange}
        />

        <button onClick={this.handleSubmitAll}>ثبت همه</button>
      </div>
    );
  }
}
