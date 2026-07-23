import React, { useEffect, useState } from 'react'
import { CreatDept, deleteDept, getDept } from '../api/dept'
import { useNavigate } from 'react-router-dom'

const Department = () => {
  const [name, setName] = useState('')
  const [departments, setDepartments] = useState([])
  const navigate = useNavigate()

  const fetchDepts = async () => {
    try {
      const res = await getDept()
      setDepartments(res.data.Department || [])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { fetchDepts() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return alert('Enter department name')
    try {
      await CreatDept({ name })
      setName('')
      fetchDepts()
    } catch (error) {
      alert(error.response?.data?.message || 'Something went wrong')
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteDept(id)
      setDepartments(prev => prev.filter(d => d._id !== id))
    } catch (error) {
      alert(error.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Departments</h2>
        <button onClick={() => navigate('/dashboard')} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Department name"
          className="flex-1 border rounded p-2"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
      </form>

      <table className="w-full border border-gray-300 text-center">
        <thead className="bg-cyan-200">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {departments.length > 0 ? departments.map((dept, i) => (
            <tr key={dept._id}>
              <td className="border p-2">{i + 1}</td>
              <td className="border p-2">{dept.name}</td>
              <td className="border p-2">
                <button onClick={() => handleDelete(dept._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="3" className="p-4">No departments found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Department
