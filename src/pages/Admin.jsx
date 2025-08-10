import { useEffect, useState } from 'react';

export default function Admin() {
  const [entries, setEntries] = useState([]);
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState('');

  const fetchEntries = async () => {
  setError('');
  try {
    const res = await fetch('http://localhost:5000/api/forms', {
      headers: { 'x-admin-password': pwd } // send admin pwd
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data?.error || 'Unauthorized or failed');
    }

    const data = await res.json();
    setEntries(data);
    setPwd(''); // Clear password after success ✅
    
  } catch (err) {
    setError(err.message);
    setEntries([]);
  }
};

  const deleteEntry = async (id) => {
    if (!confirm('Delete this entry?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/forms/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': pwd }
      });
      if (!res.ok) throw new Error('Delete failed');
      setEntries(entries.filter(e => e._id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="p-6 mt-6 bg-primary">
      <h2 className="text-center text-xl font-bold mb-4 mt-12">Admin</h2>

      <div className="mb-4 flex flex-col sm:flex-row justify-center items-center gap-2">
  <input
    type="password"
    placeholder="Admin password"
    value={pwd}
    onChange={(e) => setPwd(e.target.value)}
    className="border p-2 rounded w-full sm:w-64"
  />
  <button
    onClick={fetchEntries}
    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full sm:w-64 transition"
  >
    Load entries
  </button>
  {error && <div className="text-red-500 mt-2 w-full text-center">{error}</div>}
</div>


      <div className="overflow-x-auto">
  <table className="min-w-full border border-gray-300 bg-white text-black">
    <thead className="bg-gray-100">
      <tr>
        <th className="px-4 py-2 border border-gray-300 text-left">Name</th>
        <th className="px-4 py-2 border border-gray-300 text-left">EPC</th>
        <th className="px-4 py-2 border border-gray-300 text-left">Phone</th>
        <th className="px-4 py-2 border border-gray-300 text-left">Address</th>
        <th className="px-4 py-2 border border-gray-300 text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      {entries.map((e) => (
        <tr key={e._id} className="hover:bg-gray-50">
          <td className="px-4 py-2 border border-gray-300">{e.name}</td>
          <td className="px-4 py-2 border border-gray-300">{e.epcName}</td>
          <td className="px-4 py-2 border border-gray-300">{e.number}</td>
          <td className="px-4 py-2 border border-gray-300">{e.officeAddress}</td>
          <td className="px-4 py-2 border border-gray-300">
            <button
              onClick={() => deleteEntry(e._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
}
