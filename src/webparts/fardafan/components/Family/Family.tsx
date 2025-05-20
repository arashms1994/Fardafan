import * as React from "react";
import FamilyForm from "./components/FamilyForm";
import styles from "./Fardafan.module.scss";

interface FamilyState {
  formsData: { [guid: string]: any };
  formsOrder: { guid: string; relation: string; rowNumber: number }[];
  newRelation: string;
}

const DEFAULT_RELATIONS = ["همسر", "فرزند", "پدر", "مادر", "خواهر", "برادر"];
let formCounter = 100;

export default class Family extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      formsData: {},
      formsOrder: DEFAULT_RELATIONS.map((relation, index) => ({
        guid: (index + 1).toString(),
        relation,
        rowNumber: index + 1,
      })),
      newRelation: "",
    };
  }

  handleFormChange = (guid: string, data: any): void => {
    const updatedData = { ...this.state.formsData };
    updatedData[guid] = data;
    this.setState({ formsData: updatedData });
  };

  handleAddForm = (): void => {
    if (!this.state.newRelation) return;

    const guid = (formCounter++).toString();
    const newForm = {
      guid,
      relation: this.state.newRelation,
      rowNumber: this.state.formsOrder.length + 1,
    };

    this.setState((prevState) => ({
      formsOrder: [...prevState.formsOrder, newForm],
      newRelation: "",
    }));
  };

  handleRelationSelect = (e) => {
    this.setState({ newRelation: e.currentTarget.value });
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
    const webUrl = "http://sharepoint.fardafan.com/HR";
    const digest = await this.getDigest();
    const data = this.state.formsData;

    for (const guid in data) {
      if (Object.prototype.hasOwnProperty.call(data, guid)) {
        const form = data[guid];

        const payload = {
          __metadata: { type: "SP.Data.HRFamilyInfoListItem" },
          Title: form.fullName,
          birthDate: form.birthDate,
          job: form.job,
          education: form.education,
          phoneNumber: form.phoneNumber,
          address: form.address || "",
          GUID0: guid,
          relation: form.relation,
          rowNumber: form.rowNumber,
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

  render(): React.ReactElement<any> {
    const familyFormFields = [
      { key: "fullName", label: "نام", type: "text" },
      { key: "birthDate", label: "تاریخ تولد", type: "text" },
      { key: "job", label: "شغل", type: "text" },
      { key: "education", label: "تحصیلات", type: "text" },
      { key: "phoneNumber", label: "شماره همراه", type: "number" },
      { key: "address", label: "آدرس", type: "text" },
    ];

    return (
      <div className={styles.test}>
        <div className={styles.formContainer}>
          {this.state.formsOrder.map((form) => (
            <FamilyForm
              key={form.guid}
              GUID={form.guid}
              relation={form.relation}
              rowNumber={form.rowNumber}
              onDataChange={this.handleFormChange}
              fields={familyFormFields}
            />
          ))}
        </div>

        <div className={styles.addForm}>
          <select
            value={this.state.newRelation}
            onChange={this.handleRelationSelect}
          >
            <option value="">تعیین رابطه </option>
            <option value="فرزند">فرزند</option>
            <option value="خواهر">خواهر</option>
            <option value="برادر">برادر</option>
          </select>
          <div onClick={this.handleAddForm}>افزودن فرم+</div>
        </div>

        <button onClick={this.handleSubmitAll} style={{ marginTop: "20px" }}>
          ذخیره همه
        </button>
      </div>
    );
  }
}
