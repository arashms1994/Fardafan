import { getDigest } from "./GetDigest";

export async function updatePersonalInfo() {
  const listName = "HRPersonalInfo";
  const itemType = `SP.Data.${listName}ListItem`;
  const webUrl = "http://sharepoint.fardafan.com";
  const { title, currentItemId } = this.state;

  if (!title.trim()) {
    this.setState({ message: "لطفاً یک عنوان وارد کنید." });
    return;
  }

  getDigest()
    .then((digest) =>
      fetch(
        `${webUrl}/_api/web/lists/getbytitle('${listName}')/items(${currentItemId})`,
        {
          method: "POST",
          headers: {
            Accept: "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "X-RequestDigest": digest,
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE",
          },
          body: JSON.stringify({
            __metadata: { type: itemType },
            Title: title,
          }),
        }
      )
    )
    .then(() => {
      this.setState({
        message: `آیتم (${title}) ویرایش شد.`,
        title: "",
        isEditing: false,
        currentItemId: null,
      });
      this.loadItems();
    })
    .catch((err) => this.setState({ message: `خطا: ${err.message}` }));
}

export async function updateEducationInfo() {
  const listName = "HREducationInfo";
  const itemType = `SP.Data.${listName}ListItem`;
  const webUrl = "http://sharepoint.fardafan.com";
  const { title, currentItemId } = this.state;

  if (!title.trim()) {
    this.setState({ message: "لطفاً یک عنوان وارد کنید." });
    return;
  }

  getDigest()
    .then((digest) =>
      fetch(
        `${webUrl}/_api/web/lists/getbytitle('${listName}')/items(${currentItemId})`,
        {
          method: "POST",
          headers: {
            Accept: "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "X-RequestDigest": digest,
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE",
          },
          body: JSON.stringify({
            __metadata: { type: itemType },
            Title: title,
          }),
        }
      )
    )
    .then(() => {
      this.setState({
        message: `آیتم (${title}) ویرایش شد.`,
        title: "",
        isEditing: false,
        currentItemId: null,
      });
      this.loadItems();
    })
    .catch((err) => this.setState({ message: `خطا: ${err.message}` }));
}

export async function updateProfessionInfo() {
  const listName = "HRProfessionInfo";
  const itemType = `SP.Data.${listName}ListItem`;
  const webUrl = "http://sharepoint.fardafan.com";
  const { title, currentItemId } = this.state;

  if (!title.trim()) {
    this.setState({ message: "لطفاً یک عنوان وارد کنید." });
    return;
  }

  getDigest()
    .then((digest) =>
      fetch(
        `${webUrl}/_api/web/lists/getbytitle('${listName}')/items(${currentItemId})`,
        {
          method: "POST",
          headers: {
            Accept: "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "X-RequestDigest": digest,
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE",
          },
          body: JSON.stringify({
            __metadata: { type: itemType },
            Title: title,
          }),
        }
      )
    )
    .then(() => {
      this.setState({
        message: `آیتم (${title}) ویرایش شد.`,
        title: "",
        isEditing: false,
        currentItemId: null,
      });
      this.loadItems();
    })
    .catch((err) => this.setState({ message: `خطا: ${err.message}` }));
}

export async function updateFamilyInfo() {
  const listName = "HRFamilyInfo";
  const itemType = `SP.Data.${listName}ListItem`;
  const webUrl = "http://sharepoint.fardafan.com";
  const { title, currentItemId } = this.state;

  if (!title.trim()) {
    this.setState({ message: "لطفاً یک عنوان وارد کنید." });
    return;
  }

  getDigest()
    .then((digest) =>
      fetch(
        `${webUrl}/_api/web/lists/getbytitle('${listName}')/items(${currentItemId})`,
        {
          method: "POST",
          headers: {
            Accept: "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "X-RequestDigest": digest,
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE",
          },
          body: JSON.stringify({
            __metadata: { type: itemType },
            Title: title,
          }),
        }
      )
    )
    .then(() => {
      this.setState({
        message: `آیتم (${title}) ویرایش شد.`,
        title: "",
        isEditing: false,
        currentItemId: null,
      });
      this.loadItems();
    })
    .catch((err) => this.setState({ message: `خطا: ${err.message}` }));
}
