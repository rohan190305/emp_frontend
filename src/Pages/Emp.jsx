import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CreateEmp, editEmp, getEmpById } from '../api/emp'
import { useNavigate, useParams } from 'react-router-dom'
import { API_URI } from '../constants/api'

const BASE = API_URI

const Emp = () => {
  const [department, setDepartment] = useState([])
  const [stateList, setStateList] = useState([])
  const [cities, setCities] = useState([])
  const [preview, setPreview] = useState("")
  const [formData, setFormData] = useState({
    profilePicture: null,
    name: "", email: "", phone: "", gender: "",
    address: "", state: "", city: "", pincode: "",
    isPermanent: false, department: "",
  })
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const init = async () => {
      try {
        const [deptRes, stateRes] = await Promise.all([
          axios.get(`${BASE}/Dept/getDept`),
          axios.get(`${BASE}/State/getState`),
        ])
        setDepartment(deptRes.data.Department || [])
        setStateList(stateRes.data.State || [])

        if (id) {
          const response = await getEmpById(id)
          const emp = response.data.EmpById
          if (!emp) return

          setFormData({
            profilePicture: null,
            name: emp.name || "",
            email: emp.email || "",
            phone: emp.phone || "",
            gender: emp.gender || "",
            address: emp.address || "",
            state: emp.state?._id?.toString() || "",
            city: emp.city?._id?.toString() || "",
            pincode: emp.pincode || "",
            isPermanent: emp.isPermanent || false,
            department: emp.department?._id?.toString() || "",
          })

          setPreview(emp.ProfilePicture)

          if (emp.state?._id) {
            const cityRes = await axios.get(`${BASE}/City/getCityByState/${emp.state._id}`)
            setCities(cityRes.data.cities || [])
          }
        }
      } catch (error) {
        console.log('init error:', error)
      }
    }
    init()
  }, [])

  const handleChange = async (e) => {
    const { name, value, type, checked, files } = e.target

    if (type === "file") {
      setFormData({ ...formData, profilePicture: files[0] })
      setPreview(URL.createObjectURL(files[0]))
      return
    }

    if (name === "state") {
      setFormData({ ...formData, state: value, city: "" })
      try {
        const cityRes = await axios.get(`${BASE}/City/getCityByState/${value}`)
        setCities(cityRes.data.cities || [])
      } catch (error) {
        console.log(error)
      }
      return
    }

    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.state) return alert("Please select a state")
    if (!formData.city) return alert("Please select a city")
    if (!formData.department) return alert("Please select a department")

    try {
      const employeeData = new FormData()
      employeeData.append("profilePicture", formData.profilePicture)
      employeeData.append("name", formData.name)
      employeeData.append("email", formData.email)
      employeeData.append("phone", formData.phone)
      employeeData.append("gender", formData.gender)
      employeeData.append("address", formData.address)
      employeeData.append("state", formData.state)
      employeeData.append("city", formData.city)
      employeeData.append("pincode", formData.pincode)
      employeeData.append("isPermanent", formData.isPermanent)
      employeeData.append("department", formData.department)

      if (id) {
        await editEmp(id, employeeData)
        alert("Employee Updated Successfully")
      } else {
        await CreateEmp(employeeData)
        alert("Employee Created Successfully")
      }
      navigate("/dashboard")
    } catch (error) {
      console.log(error)
      alert(error.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded shadow'>
      <h2 className='text-3xl font-bold mb-6'>{id ? "Edit Employee" : "Create Employee"}</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleSubmit}>

        <div className="md:col-span-2 flex flex-col items-center">
          {preview && <img src={preview} alt="Preview" className="w-28 h-28 rounded-full object-cover border mb-3" />}
          <input type="file" accept="image/*" name="profilePicture" onChange={handleChange} className="border p-2 rounded w-full" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Name" className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter Phone Number" className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border rounded p-2">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Address</label>
          <textarea name="address" value={formData.address} onChange={handleChange} rows="3" placeholder="Enter Address" className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block mb-1 font-medium">State</label>
          <select name="state" value={formData.state} onChange={handleChange} className="w-full border rounded p-2">
            <option value="">Select State</option>
            {stateList.map((st) => (
              <option key={st._id} value={st._id}>{st.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">City</label>
          <select name="city" value={formData.city} onChange={handleChange} className="w-full border rounded p-2">
            <option value="">Select City</option>
            {cities.map((ct) => (
              <option key={ct._id} value={ct._id}>{ct.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Pincode</label>
          <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Enter Pincode" className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Department</label>
          <select name="department" value={formData.department} onChange={handleChange} className="w-full border rounded p-2">
            <option value="">Select Department</option>
            {department.map((dp) => (
              <option key={dp._id} value={dp._id}>{dp.name}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2 flex items-center gap-3">
          <input type="checkbox" id="isPermanent" name="isPermanent" checked={formData.isPermanent} onChange={handleChange} />
          <label htmlFor="isPermanent">Permanent Employee</label>
        </div>

        <div className="md:col-span-2">
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition">
            {id ? "Edit Employee" : "Create Employee"}
          </button>
        </div>

      </form>
    </div>
  )
}

export default Emp
