import React, { useState } from 'react';

const categories = [
  'All',
  'Engineering',
  'Productivity',
  'Modern',
  'Dreaming',
  'Guide',
  'Design',
  'Other'
];

const CategoryStrip = ({ activeCategory, onCategoryChange }) => {

  return (
    <div className="w-full py-6 mt-6 px-6">
      <div className="flex items-center gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden w-fit" style={{ scrollbarWidth: 'none' }}>
          {categories.map((category) => (
            <button
              key={category}
              className={`cursor-pointer font-medium text-sm px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap ${
                activeCategory === category 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
    </div>
  );
};

export default CategoryStrip;




// import React, { useState } from 'react';

// const categories = [
//   'All',
//   'Engineering',
//   'Productivity',
//   'Modern',
//   'Dreaming',
//   'Guide',
//   'Design',
//   'Other'
// ];

// const CategoryStrip = ({ activeCategory, onCategoryChange }) => {

//   return (
//     <div className="w-full py-4 mt-4">
//       <div className="flex items-center gap-8 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
//         {categories.map((category) => (
//           <button
//             key={category}
//             className={`cursor-pointer text-text-secondary font-medium text-[0.95rem] pb-2 border-b-2 transition-all duration-150 whitespace-nowrap hover:text-text-primary ${
//               activeCategory === category 
//                 ? 'text-accent-primary border-accent-primary' 
//                 : 'border-transparent'
//             }`}
//             onClick={() => onCategoryChange(category)}
//           >
//             {category}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryStrip;
