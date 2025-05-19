import * as React from "react";
import styles from "./PersonalForm.module.scss";
import Guid from "../../utils/CreateGuid";

export default class Peronal extends React.Component<any, any> {
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
      GUID: Guid(),
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: any) {
    var name = e.currentTarget.name;
    var value = e.currentTarget.value;

    var numericFields = [
      "nationalNumber",
      "idNumber",
      "passportNumber",
      "insuranceNumber",
      "supplementaryInsuranceDependents",
      "postalCode",
      "homePhoneNumber",
      "personalPhoneNumber",
    ];

    if (numericFields.indexOf(name) !== -1) {
      value = Number(value);
    }

    this.setState({
      [name]: value,
    });
  }

  public render(): React.ReactElement<any> {
    let fields = [
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

    return (
      <form className={styles.personalFormContainer}>
        {fields.map(function (field) {
          return (
            <div key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              <input
                type="text"
                name={field.name}
                value={this.state[field.name]}
                onChange={this.handleChange}
              />
            </div>
          );
        }, this)}
      </form>
    );
  }
}
