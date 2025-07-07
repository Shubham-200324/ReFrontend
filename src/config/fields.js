export const RESUME_TYPES = {
  FRESHER: 'fresher',
  EXPERIENCED: 'experienced'
};

export const FIELD_TYPES = {
  TEXT: 'text',
  EMAIL: 'email',
  TEL: 'tel',
  TEXTAREA: 'textarea',
  ARRAY: 'array',
  SELECT: 'select',
  FILE: 'file'
};

export const resumeFieldsConfig = {
  [RESUME_TYPES.FRESHER]: {
    title: 'Fresher Resume',
    description: 'Perfect for students and recent graduates',
    fields: [
      {
        id: 'fullName',
        label: 'Full Name',
        type: FIELD_TYPES.TEXT,
        required: true,
        placeholder: 'John Doe',
        validation: {
          minLength: 2,
          maxLength: 50
        }
      },
      {
        id: 'email',
        label: 'Email Address',
        type: FIELD_TYPES.EMAIL,
        required: true,
        placeholder: 'john.doe@example.com',
        validation: {
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        }
      },
      {
        id: 'phone',
        label: 'Phone Number',
        type: FIELD_TYPES.TEL,
        required: true,
        placeholder: '+1 (555) 123-4567',
        validation: {
          minLength: 10
        }
      },
      {
        id: 'location',
        label: 'Location',
        type: FIELD_TYPES.TEXT,
        required: false,
        placeholder: 'City, State, Country'
      },
      {
        id: 'linkedin',
        label: 'LinkedIn Profile (Optional)',
        type: FIELD_TYPES.TEXT,
        required: false,
        placeholder: 'https://linkedin.com/in/johndoe'
      },
      {
        id: 'website',
        label: 'Portfolio Website (Optional)',
        type: FIELD_TYPES.TEXT,
        required: false,
        placeholder: 'https://johndoe.com'
      },
      {
        id: 'summary',
        label: 'Professional Summary',
        type: FIELD_TYPES.TEXTAREA,
        required: true,
        placeholder: 'Brief professional summary highlighting your key strengths and career objectives...',
        rows: 4,
        validation: {
          minLength: 50,
          maxLength: 500
        }
      },
      {
        id: 'education',
        label: 'Education',
        type: FIELD_TYPES.ARRAY,
        required: true,
        minItems: 1,
        template: {
          institution: {
            label: 'College/University Name',
            type: FIELD_TYPES.TEXT,
            required: true,
            placeholder: 'University of Technology'
          },
          degree: {
            label: 'Degree',
            type: FIELD_TYPES.TEXT,
            required: true,
            placeholder: 'Bachelor of Science'
          },
          field: {
            label: 'Field of Study',
            type: FIELD_TYPES.TEXT,
            required: true,
            placeholder: 'Computer Science'
          },
          graduationDate: {
            label: 'Graduation Date',
            type: FIELD_TYPES.TEXT,
            required: true,
            placeholder: 'May 2024'
          },
          gpa: {
            label: 'CGPA',
            type: FIELD_TYPES.TEXT,
            required: false,
            placeholder: '3.8/4.0'
          },
          achievements: {
            label: 'Achievements/Activities',
            type: FIELD_TYPES.TEXTAREA,
            required: false,
            placeholder: 'Honors, awards, relevant coursework, or activities...',
            rows: 3
          }
        }
      },
      {
        id: 'projects',
        label: 'Projects',
        type: FIELD_TYPES.ARRAY,
        required: true,
        minItems: 1,
        template: {
          name: {
            label: 'Project Title',
            type: FIELD_TYPES.TEXT,
            required: true,
            placeholder: 'E-commerce Platform'
          },
          description: {
            label: 'Project Description',
            type: FIELD_TYPES.TEXTAREA,
            required: true,
            placeholder: 'Describe the project, your role, key features, and outcomes...',
            rows: 3
          },
          technologies: {
            label: 'Tech Stack',
            type: FIELD_TYPES.TEXT,
            required: true,
            placeholder: 'React, Node.js, MongoDB, AWS'
          },
          link: {
            label: 'Project Link (Optional)',
            type: FIELD_TYPES.TEXT,
            required: false,
            placeholder: 'https://github.com/username/project'
          }
        }
      },
      {
        id: 'skills',
        label: 'Skills',
        type: FIELD_TYPES.TEXTAREA,
        required: true,
        placeholder: 'List your technical skills, programming languages, tools, frameworks, etc. (e.g., JavaScript, React, Node.js, Python, AWS, Docker)',
        rows: 3,
        validation: {
          minLength: 10
        }
      },
      {
        id: 'existingResume',
        label: 'Upload Existing Resume (Optional)',
        type: FIELD_TYPES.FILE,
        required: false,
        accept: '.pdf',
        maxSize: 10 * 1024 * 1024, // 10MB
        description: 'Upload your existing resume to enhance the AI generation'
      },
      {
        id: 'hobbies',
        label: 'Hobbies & Interests',
        type: FIELD_TYPES.TEXTAREA,
        required: false,
        placeholder: 'Your hobbies, interests, or activities outside of work...',
        rows: 2
      },
      {
        id: 'languages',
        label: 'Languages',
        type: FIELD_TYPES.TEXT,
        required: false,
        placeholder: 'English (Native), Spanish (Intermediate), French (Basic)'
      }
    ]
  },
  [RESUME_TYPES.EXPERIENCED]: {
    title: 'Experienced Professional Resume',
    description: 'Perfect for professionals with work experience',
    fields: [
      {
        id: 'fullName',
        label: 'Full Name',
        type: FIELD_TYPES.TEXT,
        required: true,
        placeholder: 'John Doe',
        validation: {
          minLength: 2,
          maxLength: 50
        }
      },
      {
        id: 'email',
        label: 'Email Address',
        type: FIELD_TYPES.EMAIL,
        required: true,
        placeholder: 'john.doe@example.com',
        validation: {
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        }
      },
      {
        id: 'phone',
        label: 'Phone Number',
        type: FIELD_TYPES.TEL,
        required: true,
        placeholder: '+1 (555) 123-4567',
        validation: {
          minLength: 10
        }
      },
      {
        id: 'location',
        label: 'Location',
        type: FIELD_TYPES.TEXT,
        required: false,
        placeholder: 'City, State, Country'
      },
      {
        id: 'linkedin',
        label: 'LinkedIn Profile (Optional)',
        type: FIELD_TYPES.TEXT,
        required: false,
        placeholder: 'https://linkedin.com/in/johndoe'
      },
      {
        id: 'portfolio',
        label: 'Portfolio Website (Optional)',
        type: FIELD_TYPES.TEXT,
        required: false,
        placeholder: 'https://johndoe.com'
      },
      {
        id: 'summary',
        label: 'Professional Summary',
        type: FIELD_TYPES.TEXTAREA,
        required: true,
        placeholder: 'Brief professional summary highlighting your key strengths and career objectives...',
        rows: 4,
        validation: {
          minLength: 50,
          maxLength: 500
        }
      },
      {
        id: 'education',
        label: 'Education',
        type: FIELD_TYPES.ARRAY,
        required: true,
        minItems: 1,
        template: {
          institution: {
            label: 'College/University Name',
            type: FIELD_TYPES.TEXT,
            required: true,
            placeholder: 'University of Technology'
          },
          degree: {
            label: 'Degree',
            type: FIELD_TYPES.TEXT,
            required: true,
            placeholder: 'Bachelor of Science'
          },
          field: {
            label: 'Field of Study',
            type: FIELD_TYPES.TEXT,
            required: true,
            placeholder: 'Computer Science'
          },
          graduationDate: {
            label: 'Graduation Date',
            type: FIELD_TYPES.TEXT,
            required: true,
            placeholder: 'May 2020'
          },
          gpa: {
            label: 'CGPA',
            type: FIELD_TYPES.TEXT,
            required: false,
            placeholder: '3.8/4.0'
          },
          achievements: {
            label: 'Achievements/Activities',
            type: FIELD_TYPES.TEXTAREA,
            required: false,
            placeholder: 'Honors, awards, relevant coursework, or activities...',
            rows: 3
          }
        }
      },
      {
        id: 'experience',
        label: 'Work Experience',
        type: FIELD_TYPES.ARRAY,
        required: true,
        minItems: 1,
        template: {
          company: {
            label: 'Company Name',
            type: FIELD_TYPES.TEXT,
            required: true,
            placeholder: 'Tech Solutions Inc.'
          },
          position: {
            label: 'Job Title',
            type: FIELD_TYPES.TEXT,
            required: true,
            placeholder: 'Senior Software Engineer'
          },
          location: {
            label: 'Location',
            type: FIELD_TYPES.TEXT,
            required: false,
            placeholder: 'San Francisco, CA'
          },
          startDate: {
            label: 'Start Date',
            type: FIELD_TYPES.TEXT,
            required: true,
            placeholder: 'January 2022'
          },
          endDate: {
            label: 'End Date',
            type: FIELD_TYPES.TEXT,
            required: false,
            placeholder: 'Present (leave empty if current)'
          },
          current: {
            label: 'Current Position',
            type: FIELD_TYPES.SELECT,
            required: false,
            options: [
              { value: false, label: 'No' },
              { value: true, label: 'Yes' }
            ]
          },
          description: {
            label: 'Job Description & Achievements',
            type: FIELD_TYPES.TEXTAREA,
            required: true,
            placeholder: 'Describe your responsibilities, key achievements, and impact...',
            rows: 4
          }
        }
      },
      {
        id: 'projects',
        label: 'Projects',
        type: FIELD_TYPES.ARRAY,
        required: false,
        minItems: 0,
        template: {
          name: {
            label: 'Project Title',
            type: FIELD_TYPES.TEXT,
            required: true,
            placeholder: 'E-commerce Platform'
          },
          description: {
            label: 'Project Description',
            type: FIELD_TYPES.TEXTAREA,
            required: true,
            placeholder: 'Describe the project, your role, key features, and outcomes...',
            rows: 3
          },
          technologies: {
            label: 'Tech Stack',
            type: FIELD_TYPES.TEXT,
            required: true,
            placeholder: 'React, Node.js, MongoDB, AWS'
          },
          link: {
            label: 'Project Link (Optional)',
            type: FIELD_TYPES.TEXT,
            required: false,
            placeholder: 'https://github.com/username/project'
          }
        }
      },
      {
        id: 'skills',
        label: 'Skills',
        type: FIELD_TYPES.TEXTAREA,
        required: true,
        placeholder: 'List your technical skills, programming languages, tools, frameworks, etc. (e.g., JavaScript, React, Node.js, Python, AWS, Docker)',
        rows: 3,
        validation: {
          minLength: 10
        }
      },
      {
        id: 'existingResume',
        label: 'Upload Existing Resume (Optional)',
        type: FIELD_TYPES.FILE,
        required: false,
        accept: '.pdf',
        maxSize: 10 * 1024 * 1024, // 10MB
        description: 'Upload your existing resume to enhance the AI generation'
      },
      {
        id: 'certifications',
        label: 'Certifications',
        type: FIELD_TYPES.ARRAY,
        required: false,
        minItems: 0,
        template: {
          name: {
            label: 'Certification Name',
            type: FIELD_TYPES.TEXT,
            required: true,
            placeholder: 'AWS Certified Solutions Architect'
          },
          issuer: {
            label: 'Issuing Organization',
            type: FIELD_TYPES.TEXT,
            required: true,
            placeholder: 'Amazon Web Services'
          },
          date: {
            label: 'Date Earned',
            type: FIELD_TYPES.TEXT,
            required: true,
            placeholder: 'March 2023'
          },
          link: {
            label: 'Verification Link (Optional)',
            type: FIELD_TYPES.TEXT,
            required: false,
            placeholder: 'https://credly.com/badges/...'
          }
        }
      },
      {
        id: 'languages',
        label: 'Languages',
        type: FIELD_TYPES.TEXT,
        required: false,
        placeholder: 'English (Native), Spanish (Intermediate), French (Basic)'
      }
    ]
  }
}; 