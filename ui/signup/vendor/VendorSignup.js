import React from "react";
import { useState } from "react";
import styles from "./VendorSignup.module.css";
const VendorSignup = () => {
  const [vendorData, setVendorData] = useState({
    identity: {
      brandName: { value: "", error: "" },
      ownerFullName: { value: "", error: "" },
      serviceType: { value: [], error: "" },
      phoneNumber: { value: "", error: "" },
      email: { value: "", error: "" },
    },
    serviceData: {
      commercialRegister: { value: "", error: "" },
      idNumber: { value: "", error: "" },
      serviceDescription: { value: "", error: "" },
      serviceTime: { value: "", error: "" },
      serviceDate: { value: "", error: "" },
    },
    samplesAndPackages: {
      packages: {
        value: [],
        error: "",
      },
      samples: {
        value: [],
        error: "",
      },
      logo: {
        value: "",
        error: "",
      },
    },
    commercialVerification: {
      commercialRegisterImage: { value: "", error: "" },
      nationalId: { value: "", error: "" },
      otherData: { value: "", error: "" },
    },
    paymentData: {
      payment_type: { value: "", error: "" },
      //   paymentMethod: { value: [], error: "" },
      termsForRefund: { value: false, error: "" },
    },
    otherLinksAndData: {
      instagramLink: { value: "", error: "" },
      websiteLink: { value: "", error: "" },
      cv: { value: "", error: "" },
    },
  });

  return <div></div>;
};

export default VendorSignup;
