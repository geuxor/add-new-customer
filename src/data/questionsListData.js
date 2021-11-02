import optionsCountryList from "./options_countries"
import optionsRoles from "./options_roles"
import optionsNatureOfBusiness from "./options_natureOfBusiness"

const questionsList = [
  {
    id: 1,
    headline: "Welcome",
    title: "You need to upload and completeKYC & Due Diligence. Input your basic information about the customer and add the UBO. And upload KYC documents and make Due diligence.",
  },
  {
    id: 2,
    headline: "Company Details",
    title: "What is the maximum file upload size?",
    inputs: [
      { label: "Company", name: "company", placeholder: "", type: "text", required: true, error: "Company is required" },
      { label: "Country", name: "country", placeholder: "", type: "select", options: optionsCountryList, required: true, error: "Country is required" },
      { label: "Address", name: "address", placeholder: "", type: "text", required: true, error: "Address is required" },
      { label: "Apartment, suit, etc.", name: "apartment", placeholder: "", type: "text", required: false },
      { label: "Postal code/zip", name: "postcode", placeholder: "", type: "text", required: true, error: "Postal code/zip" },
      { label: "City", name: "city", placeholder: "", type: "text", required: true, error: "City is required" },
      { label: "Website", name: "website", placeholder: "", type: "text", required: false },
      { label: "Company registration from official register", name: "registration-nr", placeholder: "", type: "text", required: true, error: "Company registration is required" }
    ]
  },
  {
    id: 3,
    headline: "Ultimate Beneficial Owner(s)",
    title: "Who is the Ultimate Beneficial Owner(s)?",
    description: "UBO of a legal entity are the natural persons who directly or indirectly hold or control a stake of at least 25% in the capital or of at least 25% of th evoting rights of the company, or who undertake the de jure or de facto management of the legal entity.",
    subdescription: "Details of the person(s) acting as a representative(s) (the undersigned)",
    inputs: [
      { id: 1, label: "Full name", name: "full-name", placeholder: "", type: "text", required: true, error: "Full name is required" },
      { id: 2, label: "Role", name: "role", placeholder: "", type: "select", options: optionsRoles, required: true, error: "Role is required" },
      { id: 3, label: "Address", name: "address", placeholder: "", type: "text", required: true, error: "Address is required" },
      { id: 4, label: "Apartment, suit, etc.", name: "apartment", placeholder: "", type: "text", required: false },
      { id: 5, label: "Postal code/zip", name: "postcode", placeholder: "", type: "text", required: true, error: "Postal code/zip" },
      { id: 6, label: "City", name: "city", placeholder: "", type: "text", required: true, error: "City is required" },
      { id: 7, label: "Email", name: "email", placeholder: "", type: "email", required: true, error: "Email is required" },
      { id: 8, label: "Upload Passport on UBO", name: "passport", placeholder: "e.g. PNG, JPG- file size max 1mb", type: "file", required: true, error: "Passport is required" },
      { id: 9, label: "Upload Utility bill on UBO", name: "utility", placeholder: "e.g. PNG, JPG- file size max 1mb", type: "file", required: true, error: "Utility Bill is required" }
    ],
    allowMultiple: true
  },
  {
    id: 4,
    headline: "Nature of business",
    title: "What is the nature of the business transaction?",
    inputs: [
      { id: 1, label: "Choose the type of nature of business?", name: "business-nature", placeholder: "", type: "select", options: optionsNatureOfBusiness, required: true, error: "Nature of Business is required" },
    ]
  },
  {
    id: 5,
    headline: "Estimated monthly volume",
    title: "What is the estimated monthly volume in €",
    inputs: [
      { id: 1, label: "Estimated monthly volume in €", name: "volume-eur", placeholder: "", type: "number", required: true, error: "Estimated Volume is required" },
      { id: 2, label: "Estimated average transaction size in €", name: "transaction-size", placeholder: "", type: "number", required: true, error: "Estimated Transaction Size is required" },
    ]
  },
  {
    id: 6,
    headline: "Customer approved",
    title: "Your customer is now approved"
  }

];

export default questionsList;