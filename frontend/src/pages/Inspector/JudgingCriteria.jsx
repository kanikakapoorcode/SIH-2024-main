import React from 'react'

const JudgingCriteria = () => {
  const rules = [
    { heading: "Student population", desc1: "Total number of students", desc2:"enrolled at the university.", image: "/src/assets/studentPopulationIcon.jpg" },
    { heading: "Student-Staff Ratio", desc1: "Ratio of the students to", desc2:"academic and support staff.", image: "/src/assets/studentStaffIcon.jpg" },
    { heading: "Teaching Quality", desc1: "Rating of the overall teaching", desc2:"quality at the university.", image: "/src/assets/teachingQualityIcon.jpg" },
    { heading: "Industry Impact", desc1: "Degree of engagement and", desc2:"influence within industries.",  image: "/src/assets/industaryImpactIcon.jpg" },
    { heading: "international. Outlook", desc1: "Percentage of international", desc2:"students at the university.",image: "/src/assets/internationalOutlookIcon.jpg" },
    { heading: "Lab Facilities", desc1: "Resources and spaces for", desc2:"practical, hands-on learning.", image: "/src/assets/labIcon.jpg" },
    { heading: "Building Age", desc1: "Number of years since the", desc2:"university was established.", image: "/src/assets/buildingAgeIcon.jpg" },
    { heading: "Infrastructure", desc1: "Physical and technological", desc2:"resources supporting the university.",image: "/src/assets/infrastructureIcon.jpg" },
  ]
  
  return (
    <div className='drop-shadow-md rounded-md p-4 flex flex-col bg-[#0f4b8a] items-center justify-center text-2xl text-white'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {
          rules.map(({ heading, desc1, desc2, image }) => (
            <div key={heading} className='p-4 rounded-md flex flex-col items-center'>
              <img src={image} alt={heading} className='rounded-md w-[150px] mb-4 h-[150px] p-2 bg-white object-contain' />
              <h2 className='font-bold text-2xl capitalize text-center'>{heading}</h2>
              <p className='text-lg text-center text-gray-300'>{desc1}</p>
              <p className='text-lg text-center text-gray-300'>{desc2}</p>
            </div>
          ))
        }
      </div>
    </div>

  )
}

export default JudgingCriteria