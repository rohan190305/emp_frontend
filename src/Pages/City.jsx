import React, { useEffect, useState } from 'react'
import { createCity, getCity } from '../api/city'
import { getState } from '../api/state'
import { useNavigate } from 'react-router-dom'

const City = () => {
  const [name, setName] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const [stateRes, cityRes] = await Promise.all([getState(), getCity()])
      setStates(stateRes.data.State || [])
      setCities(cityRes.data.City || [])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { fetchData() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return alert('Enter city name')
    if (!selectedState) return alert('Select a state')
    try {
      await createCity({ name, state: selectedState })
      setName('')
      setSelectedState('')
      fetchData()
    } catch (error) {
      alert(error.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Cities</h2>
        <button onClick={() => navigate('/dashboard')} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="City name"
          className="flex-1 border rounded p-2"
        />
        <select
          value={selectedState}
          onChange={e => setSelectedState(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">Select State</option>
          {states.map(st => (
            <option key={st._id} value={st._id}>{st.name}</option>
          ))}
        </select>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
      </form>

      <table className="w-full border border-gray-300 text-center">
        <thead className="bg-cyan-200">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">City</th>
            <th className="border p-2">State</th>
          </tr>
        </thead>
        <tbody>
          {cities.length > 0 ? cities.map((ct, i) => (
            <tr key={ct._id}>
              <td className="border p-2">{i + 1}</td>
              <td className="border p-2">{ct.name}</td>
              <td className="border p-2">{ct.state?.name}</td>
            </tr>
          )) : (
            <tr><td colSpan="3" className="p-4">No cities found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default City
