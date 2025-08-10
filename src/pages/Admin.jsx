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
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Admin</h2>

      <div className="mb-4">
        <input
          type="password"
          placeholder="Admin password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={fetchEntries} className="bg-blue-600 text-white px-3 py-1 rounded">
          Load entries
        </button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th>Name</th><th>EPC</th><th>Phone</th><th>Address</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(e => (
            <tr key={e._id}>
              <td>{e.name}</td>
              <td>{e.epcName}</td>
              <td>{e.number}</td>
              <td>{e.officeAddress}</td>
              <td>
                <button onClick={() => deleteEntry(e._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
