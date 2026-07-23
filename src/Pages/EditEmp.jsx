import { editEmp, getEmpById } from "../api/emp";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import React from 'react'

const EditEmp = () => {
    
const navigate = useNavigate();
const { id } = useParams();

const loadEmployee = async () => {
  const response = await getEmpById(id);

  const emp = response.data.EmpById;

  setFormData({
    profilePicture: null,
    name: emp.name,
    email: emp.email,
    phone: emp.phone,
    gender: emp.gender,
    address: emp.address,
    state: emp.state,
    city: emp.city,
    pincode: emp.pincode,
    isPermanent: emp.isPermanent,
    department: emp.department,
  });
};
useEffect(() => {
  loadMaster();

  if (id) {
    loadEmployee();
  }
}, []);
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const employeeData = new FormData();

    // Only send a new image if the user selected one
    if (formData.profilePicture) {
      employeeData.append("ProfilePicture", formData.profilePicture);
    }

    employeeData.append("name", formData.name);
    employeeData.append("email", formData.email);
    employeeData.append("phone", formData.phone);
    employeeData.append("gender", formData.gender);
    employeeData.append("address", formData.address);
    employeeData.append("state", formData.state);
    employeeData.append("city", formData.city);
    employeeData.append("pincode", formData.pincode);
    employeeData.append("isPermanent", formData.isPermanent);
    employeeData.append("department", formData.department);

    const response = await editEmp(id, employeeData);

    console.log("Update Response:", response.data);

    if (response.status === 200) {
      alert("Employee Updated Successfully");
      navigate("/dashboard");
    }

  } catch (error) {
    console.log(error);
    alert(error.response?.data?.message || "Something went wrong");
  }
};
  return (
    <div>EditEmp</div>
  )
}

export default EditEmp



