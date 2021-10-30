import countryList from "./countryListData";
import roleList from "./roleListData"

const questionsList = [
  {
    headline: "Welcome",
    title: "You need to upload and completeKYC & Due Diligence. Input your basic information about the customer and add the UBO. And upload KYC documents and make Due diligence.",
  },
  {
    headline: "Company Details",
    title: "What is the maximum file upload size?",
    inputs: [
      { label: "Company", name: "company", placeholder: "", type: "text", required: true, error: "Company is required" },
      { label: "Country", name: "country", placeholder: "", type: "select", options: countryList, required: true, error: "Country is required" },
      { label: "Address", name: "address", placeholder: "", type: "text", required: true, error: "Address is required" },
      { label: "Apartment, suit, etc.", name: "apartment", placeholder: "", type: "text", required: false },
      { label: "Postal code/zip", name: "postcode", placeholder: "", type: "text", required: true, error: "Postal code/zip" },
      { label: "City", name: "city", placeholder: "", type: "text", required: true, error: "City is required" },
      { label: "Website", name: "website", placeholder: "", type: "text", required: true, error: "Website is required" },
      { label: "Company registration from official register", name: "registration-nr", placeholder: "", type: "text", required: false, error: "Company registration from official register is required" }
    ]
  },
  {
    headline: "Ultimate Beneficial Owner(s)",
    title: "Who is the Ultimate Beneficial Owner(s)?",
    description: "UBO of a legal entity are the natural persons who directly or indirectly hold or control a stake of at least 25% in the capital or of at least 25% of th evoting rights of the company, or who undertake the de jure or de facto management of the legal entity.",
    subdescription: "Details of the person(s) acting as a representative(s) (the undersigned)",
    inputs: [
      { label: "Full name", name: "full-name", placeholder: "", type: "text", required: true, error: "Full name is required" },
      { label: "Role", name: "role", placeholder: "", type: "select", options: roleList, required: true, error: "Role is required" },
      { label: "Address", name: "address", placeholder: "", type: "text", required: true, error: "Address is required" },
      { label: "Apartment, suit, etc.", name: "apartment", placeholder: "", type: "text", required: false },
      { label: "Postal code/zip", name: "postcode", placeholder: "", type: "text", required: true, error: "Postal code/zip" },
      { label: "City", name: "city", placeholder: "", type: "text", required: true, error: "City is required" },
      { label: "Email", name: "email", placeholder: "", type: "email", required: true, error: "Email is required" },
      { label: "Upload Passport on UBO", name: "passport", placeholder: "e.g. PNG, JPG- file size max 1mb", type: "file", required: true, error: "Passport is required" },
      { label: "Upload Utility bill on UBO", name: "utility", placeholder: "e.g. PNG, JPG- file size max 1mb", type: "file", required: true, error: "Utility Bill is required" }
    ]
  },
  {
    headline: "Nature of business",
    title: "What is the nature of the business transaction?",
  },
  {
    headline: "Estimated monthly volume",
    title: "What is the estimated monthly volume in €",
  },
  {
    headline: "Customer approved",
    title: "Your customer is now approved"
  }

];

export default questionsList;