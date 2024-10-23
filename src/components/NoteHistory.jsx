

// import React from 'react';
// import { useSelector } from 'react-redux';

// const NoteHistory = () => {
//   const { data: notes, status, error } = useSelector((state) => state.notes);

//   if (status === 'loading') return <p>Loading notes...</p>;
//   if (status === 'failed') return <p>Error: {error}</p>;

//   return (
//     <div className="mt-4">
//       <h3 className="text-lg font-semibold">Note History:</h3>
//       {notes.length > 0 ? (
//         <ul className="space-y-2">
//           {notes.map((note, index) => (
//             <li key={index} className="border p-2 rounded">
//               <p><strong>Content:</strong> {note.content}</p>
//               <p><strong>Created At:</strong> {new Date(note.createdAt).toLocaleString()}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No notes found for the selected numbers.</p>
//       )}
//     </div>
//   );
// };

// export default NoteHistory;



// final code 
// import React from 'react';
// import { useSelector } from 'react-redux';

// const NoteHistory = () => {
//   const { data: notes, status, error } = useSelector((state) => state.notes);

//   if (status === 'loading') return <p>Loading notes...</p>;
//   if (status === 'failed') return <p>Error: {error}</p>;

//   return (
//     <div className="mt-4">
//       {/* <h3 className="text-lg font-semibold">History</h3> */}
//       {notes && notes.length > 0 ? (
//         <ul className="space-y-2">
//           {notes.map((note, index) => (
//             <li key={note.notesHistoryId || index} className="border p-2 rounded">
//               <p>{note.notes}</p>
//               <p className="text-sm text-gray-500">
//                 Created on: {new Date(note.createdOn).toLocaleString()}
//               </p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No notes found for the selected numbers.</p>
//       )}
//     </div>
//   );
// };

// export default NoteHistory;



import React from 'react';
import { useSelector } from 'react-redux';

const NoteHistory = () => {
  const { data: notes, status, error } = useSelector((state) => state.notes);

  if (status === 'loading') return <p>Loading notes...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className="mt-4">
      {/* <h3 className="text-lg font-semibold">History</h3> */}
      {notes && notes.length > 0 ? (
        <ul className="space-y-2">
          {notes.map((note, index) => (
            <li key={note.notesHistoryId || index} className="p-2 rounded"> {/* Removed the border class */}
              <p>{note.notes}</p>
              <p className="text-sm text-gray-500">
                Created on: {new Date(note.createdOn).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm">No notes found for the selected numbers.</p>
      )}
    </div>
  );
};

export default NoteHistory;
