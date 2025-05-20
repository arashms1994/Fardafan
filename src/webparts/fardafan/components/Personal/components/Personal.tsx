import * as React from "react";
import styles from "./Personal.module.scss";
import { updatePersonalInfo } from "../../api/UpdateData";
import { addPersonalInfo } from "../../api/AddData";
import Guid from "../../utils/CreateGuid";

export default class PersonalForm extends React.Component<any, any> {
  numericFields = [
    "nationalNumber",
    "idNumber",
    "passportNumber",
    "insuranceNumber",
    "supplementaryInsuranceDependents",
    "postalCode",
    "homePhoneNumber",
    "personalPhoneNumber",
  ];

  fields = [
    { name: "Title", label: "نام" },
    { name: "lastName", label: "نام خانوادگی" },
    { name: "coNumber", label: "شماره پرسنلی" },
    { name: "birthDate", label: "تاریخ تولد" },
    { name: "gender", label: "جنسیت" },
    { name: "idNumber", label: "کد ملی" },
    { name: "personalPhoneNumber", label: "شماره تلفن همراه" },
    { name: "email", label: "ایمیل" },
    { name: "nationalNumber", label: "شماره شناسنامه" },
    { name: "birthPlace", label: "محل تولد" },
    { name: "placeOfIssue", label: "محل صدور" },
    { name: "maritalStatus", label: "وضعیت تاهل" },
    { name: "marriageDate", label: "تاریخ عقد" },
    { name: "militaryStatus", label: "وضعیت خدمت" },
    { name: "endDateOfMilitary", label: "تاریخ پایان خدمت" },
    { name: "typeOfMilitaryExeption", label: "نوع معافیت" },
    { name: "religion", label: "دین" },
    { name: "denomination", label: "مذهب" },
    { name: "typeOfDriverLicense", label: "نوع گواهینامه رانندگی" },
    { name: "passportNumber", label: "شماره پاسپورت" },
    { name: "insuranceHistory", label: "سابقه بیمه" },
    { name: "insuranceNumber", label: "شماره بیمه" },
    { name: "supplementaryInsurance", label: "بیمه تکمیلی" },
    {
      name: "supplementaryInsuranceDependents",
      label: "افراد تحت تکفل در بیمه تکمیلی",
    },
    { name: "address", label: "آدرس" },
    { name: "postalCode", label: "کدپستی" },
    { name: "vehicle", label: "نحوه ایاب و ذهاب" },
    { name: "homePhoneNumber", label: "شماره تلفن منزل" },
    { name: "distanceToWork", label: "فاصله محل سکونت تا محل کار" },
    { name: "housingStatus", label: "وضعیت منزل مسکونی" },
  ];

  constructor(props: any) {
    super(props);
    this.state = {
      Title: "",
      lastName: "",
      coNumber: "",
      birthDate: "",
      nationalNumber: 0,
      idNumber: 0,
      birthPlace: "",
      placeOfIssue: "",
      gender: "",
      religion: "",
      denomination: "",
      militaryStatus: "",
      endDateOfMilitary: "",
      typeOfMilitaryExeption: "",
      typeOfDriverLicense: "",
      passportNumber: 0,
      insuranceHistory: "",
      insuranceNumber: 0,
      supplementaryInsurance: "",
      supplementaryInsuranceDepents: 0,
      maritalStatus: "",
      marriageDate: "",
      address: "",
      postalCode: 0,
      housingStatus: "",
      distanceToWork: "",
      vehicle: "",
      homePhoneNumber: 0,
      personalPhoneNumber: 0,
      email: "",
      isEditing: false,
      currentItemId: null,
      GUID0: Guid(),
      message: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e: any) {
    const { name, value } = e.target;
    let val: any = value;
    if (this.numericFields.indexOf(name) > -1) {
      val = value === "" ? 0 : Number(value);
    }
    this.setState({ [name]: val } as Pick<any, keyof any>);
  }

  async handleSubmit(e: any) {
    e.preventDefault();

    const { Title, isEditing, currentItemId } = this.state;

    if (!Title.trim()) {
      this.setState({ message: "لطفاً یک عنوان وارد کنید." });
      return;
    }

    const formData: any = {
      Title,
    };

    this.fields.forEach((field) => {
      formData[field.name] = this.state[field.name];
    });

    if (isEditing) {
      if (!currentItemId) {
        this.setState({ message: "آیتمی برای ویرایش انتخاب نشده است." });
        return;
      }
      try {
        await updatePersonalInfo(
          currentItemId,
          formData,
          (stateUpdate: any) => this.setState(stateUpdate),
          () => {
            if (this.props.onReload) this.props.onReload();
            this.setState({
              isEditing: false,
              currentItemId: null,
              Title: "",
              message: "",
            });
          }
        );
      } catch (error) {
        this.setState({ message: `خطا در بروزرسانی: ${error}` });
      }
    } else {
      try {
        await addPersonalInfo(
          formData,
          (stateUpdate: any) => this.setState(stateUpdate),
          () => {
            if (this.props.onReload) this.props.onReload();
            this.setState({
              Title: "",
              lastName: "",
              coNumber: "",
              birthDate: "",
              nationalNumber: 0,
              idNumber: 0,
              birthPlace: "",
              placeOfIssue: "",
              gender: "",
              religion: "",
              denomination: "",
              militaryStatus: "",
              endDateOfMilitary: "",
              typeOfMilitaryExeption: "",
              typeOfDriverLicense: "",
              passportNumber: 0,
              insuranceHistory: "",
              insuranceNumber: 0,
              supplementaryInsurance: "",
              supplementaryInsuranceDependents: 0,
              maritalStatus: "",
              marriageDate: "",
              address: "",
              postalCode: 0,
              housingStatus: "",
              distanceToWork: "",
              vehicle: "",
              homePhoneNumber: 0,
              personalPhoneNumber: 0,
              email: "",
              message: "",
            });
          },
            this.state.GUID0 
        );
      } catch (error) {
        this.setState({ message: `خطا در اضافه کردن: ${error}` });
      }
    }
  }

  async componentDidMount() {
    const GUID0 = Guid();
    this.setState({ GUID0 });
  }

  render() {
    return (
      <form
        className={styles.personalFormContainer}
        onSubmit={this.handleSubmit}
      >
        {this.fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              type="text"
              id={field.name}
              name={field.name}
              value={
                this.state[field.name] === null ||
                this.state[field.name] === undefined
                  ? ""
                  : this.state[field.name]
              }
              onChange={this.handleChange}
            />
          </div>
        ))}

        <button type="submit" className={styles.submitButton}>
          {this.state.isEditing ? "ویرایش" : "افزودن"}
        </button>

        {/* {this.state.message && (
          <div className={styles.message}>{this.state.message}</div>
        )} */}
      </form>
    );
  }
}
