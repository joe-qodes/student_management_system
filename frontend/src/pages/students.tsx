import { useEffect, useState } from 'react';

type Student = {
  name: string;
  email: string;
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/students")
      .then(res => res.json())
      .then(setStudents)
      .catch(err => console.error("Fetch error:", err));
  }, []);

  const addStudent = async () => {
    await fetch("http://localhost:8080/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    setName("");
    setEmail("");

    const res = await fetch("http://localhost:8080/students");
    setStudents(await res.json());
  };

  return (
    <div style={{ backgroundColor: '#f5f5dc', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#333' }}>
      <h1 style={{ color: '#4682B4', marginBottom: '1rem' }}>Student List</h1>

      <div style={{ marginBottom: '1.5rem' }}>
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{
            padding: '0.5rem',
            marginRight: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{
            padding: '0.5rem',
            marginRight: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <button
          onClick={addStudent}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#4682B4',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add
        </button>
      </div>

      {/* Header Row */}
      <div style={{
        display: 'flex',
        backgroundColor: '#4682B4',
        color: 'white',
        fontWeight: 'bold',
        padding: '0.75rem 1rem',
        borderRadius: '6px 6px 0 0'
      }}>
        <div style={{ width: '40px' }}>#</div>
        <div style={{ flex: 1 }}>Name</div>
        <div style={{ flex: 2 }}>Email</div>
      </div>

      {/* Student Rows */}
      <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: 0 }}>
        {students.map((s, i) => (
          <li key={i} style={{
            display: 'flex',
            padding: '0.75rem 1rem',
            borderBottom: '1px solid #ccc',
            backgroundColor: i % 2 === 0 ? '#fff' : '#f0f0e6',
          }}>
            <div style={{ width: '40px' }}>{i + 1}</div>
            <div style={{ flex: 1 }}>{s.name}</div>
            <div style={{ flex: 2 }}>{s.email}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
