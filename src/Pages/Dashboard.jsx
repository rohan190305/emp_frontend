import React, { useEffect, useState } from "react";
import { deleteEmp, getAllEmp } from "../api/emp";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const [data, setData] = useState([]);
 const nevigate =useNavigate();
  const getData = async () => {
    try {
      const response = await getAllEmp();
      console.log(response.data); // Check API response
      setData(response.data.Emp);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteEmployee = async(id)=>{
    try {
      await deleteEmp(id);
      setData((prev)=> prev.filter((Emp)=> Emp._id !== id)),
      alert("employee deleted successfully")
    } catch (error) {
      console.log("Error deleting employee:", error);
      
    }
  }


  return (
    <div className="max-w-7xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-4">Employee Dashboard</h1>

      <div className="flex justify-center gap-3 mb-6">
        <button onClick={() => nevigate('/emp')} className="bg-green-600 text-white px-4 py-2 rounded">+ Add Employee</button>
      </div>

      <table className="w-full border border-gray-300 text-center">
        <thead className="bg-cyan-200">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Department</th>
            <th className="border p-2">State</th>
            <th className="border p-2">City</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item._id}>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.email}</td>
                <td className="border p-2">{item.phone}</td>
                <td className="border p-2">{item.department?.name}</td>
                <td className="border p-2">{item.state?.name}</td>
                <td className="border p-2">{item.city?.name}</td>
                <td className="border p-2">
                 <button
  onClick={() => nevigate(`/emp/${item._id}`)}
  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
>
  Edit
</button>

                  <button onClick={()=>deleteEmployee(item._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="p-4 text-center">
                No Employees Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;