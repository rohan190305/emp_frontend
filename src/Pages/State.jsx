import React, { useEffect, useState } from 'react'
import { CreateState, getState } from '../api/state'
import { useNavigate } from 'react-router-dom'

const State = () => {
  const [name, setName] = useState('')
  const [states, setStates] = useState([])
  const navigate = useNavigate()

  const fetchStates = async () => {
    try {
      const res = await getState()
      setStates(res.data.State || [])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { fetchStates() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return alert('Enter state name')
    try {
      await CreateState({ name })
      setName('')
      fetchStates()
    } catch (error) {
      alert(error.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage States</h2>
        <button onClick={() => navigate('/dashboard')} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="State name"
          className="flex-1 border rounded p-2"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
      </form>

      <table className="w-full border border-gray-300 text-center">
        <thead className="bg-cyan-200">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Name</th>
          </tr>
        </thead>
        <tbody>
          {states.length > 0 ? states.map((st, i) => (
            <tr key={st._id}>
              <td className="border p-2">{i + 1}</td>
              <td className="border p-2">{st.name}</td>
            </tr>
          )) : (
            <tr><td colSpan="2" className="p-4">No states found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default State
