

// const Feedback = () => {
//   return (
//     <div className='p-4 text-white  bg-violet-900 text-2xl rounded-md'>Feedback</div>
    
//   )
// }

import React, { useState } from 'react';
import { Heading } from '../../components/Heading';

const Feedback = () => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (comment.trim()) {
      // Handle form submission logic here
      console.log('Comment submitted:', comment);
      setComment(''); // Clear textarea after submission
    } else {
      // You can add a validation message or handle empty comment
      alert('Please enter a comment.');
    }
  };

  const handleCancel = () => {
    setComment(''); // Clear textarea when canceling
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full mb-4 border border-[#00bbf1] rounded-lg bg-white">
        <div className="px-4 py-2 text-2xl bg-white rounded-t-lg">
          <label htmlFor="comment" className="sr-only">Enter your valuable feedback here</label>
          <textarea
            id="comment"
            rows="9"
            value={comment}
            onChange={handleCommentChange}
            className="w-full px-0 md:text-2xl lg:text-2xl text-black bg-white border-0 focus:ring-0"
            placeholder="Enter your valuable feedback here..."
            required
          />
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-t border-[#00bbf1]">
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-base font-bold text-center text-white bg-[#00bbf1] rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-[#0f4b8a]"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex items-center py-3.5 px-4 text-base font-bold text-center text-black bg-gray-200 rounded-lg focus:ring-4 focus:ring-gray-400 hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default Feedback