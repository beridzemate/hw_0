import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState('');
  const [group, setGroup] = useState('');
  
  useEffect(() => {
    // აიღეთ სტუდენტების მონაცემები localStorage-დან, თუ უკვე არსებობენ
    const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
    setStudents(storedStudents);
  }, []);

  const addStudent = () => {
    const newStudent = { name, surname, age, group };
    const updatedStudents = [...students, newStudent];
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    clearForm();
  };

  const editStudent = (index) => {
    const studentToEdit = students[index];
    setName(studentToEdit.name);
    setSurname(studentToEdit.surname);
    setAge(studentToEdit.age);
    setGroup(studentToEdit.group);
    removeStudent(index); // წაშლას მერე შეგეძლება ჩაანაცვლო
  };

  const removeStudent = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };

  const clearForm = () => {
    setName('');
    setSurname('');
    setAge('');
    setGroup('');
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="Group"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        />
        <button onClick={addStudent}>Add Student</button>
      </div>

      <h3>Students List</h3>
      <ul>
        {students.map((student, index) => (
          <li key={index}>
            {student.name} {student.surname}, Age: {student.age}, Group: {student.group}
            <button onClick={() => editStudent(index)}>Edit</button>
            <button onClick={() => removeStudent(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
