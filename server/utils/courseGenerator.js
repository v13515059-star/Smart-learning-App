const youtubeCourseTemplates = [
  {
    title: 'Introduction to Machine Learning',
    description: 'A comprehensive guide to understanding machine learning concepts, algorithms, and practical applications.',
    thumbnail: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '2h 30m',
    lessons: 12,
    category: 'technology',
    difficulty: 'intermediate',
    tags: ['machine learning', 'ai', 'data science'],
    notes: [
      {
        title: 'What is Machine Learning?',
        content: `Machine Learning is a subset of artificial intelligence (AI) that focuses on the use of data and algorithms to imitate the way that humans learn, gradually improving its accuracy.

## Key Concepts

### Definition
Machine learning is a method of data analysis that automates analytical model building. It is a branch of artificial intelligence based on the idea that systems can learn from data, identify patterns and make decisions with minimal human intervention.

### Types of Machine Learning
1. **Supervised Learning**: Uses labeled training data
2. **Unsupervised Learning**: Finds hidden patterns in data
3. **Reinforcement Learning**: Learns through interaction with environment

### Applications
- Image recognition
- Natural language processing
- Recommendation systems
- Autonomous vehicles`,
        duration: '15 min read'
      }
    ],
    quizzes: [
      {
        title: 'Machine Learning Basics',
        questions: [
          {
            question: 'What is the main goal of supervised learning?',
            options: [
              'To find hidden patterns in data',
              'To learn from labeled training data',
              'To maximize rewards through trial and error',
              'To reduce the dimensionality of data'
            ],
            correctAnswer: 1,
            explanation: 'Supervised learning uses labeled training data to learn a mapping function from inputs to outputs.'
          }
        ]
      }
    ],
    flashcards: [
      {
        question: 'What is the main goal of supervised learning?',
        answer: 'To learn a mapping function from input variables to output variables using labeled training data.',
        category: 'Fundamentals'
      }
    ]
  },
  {
    title: 'Web Development with React',
    description: 'Master modern React development with hooks, state management, and component architecture.',
    thumbnail: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '3h 15m',
    lessons: 18,
    category: 'technology',
    difficulty: 'intermediate',
    tags: ['react', 'javascript', 'web development'],
    notes: [
      {
        title: 'React Fundamentals',
        content: `React is a JavaScript library for building user interfaces, particularly web applications.

## Core Concepts
- Components: Reusable pieces of UI
- JSX: Syntax extension for JavaScript
- Virtual DOM: Efficient DOM updates
- Props and State: Data management`,
        duration: '18 min read'
      }
    ],
    quizzes: [
      {
        title: 'React Fundamentals Quiz',
        questions: [
          {
            question: 'What is JSX?',
            options: [
              'A new programming language',
              'A syntax extension for JavaScript',
              'A React component',
              'A state management library'
            ],
            correctAnswer: 1,
            explanation: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript.'
          }
        ]
      }
    ],
    flashcards: [
      {
        question: 'What is the Virtual DOM?',
        answer: 'A JavaScript representation of the actual DOM that React uses to efficiently update the UI.',
        category: 'Core Concepts'
      }
    ]
  }
];

const pdfCourseTemplates = {
  javascript: {
    title: 'Advanced JavaScript Concepts',
    description: 'Deep dive into closures, prototypes, async programming, and modern ES6+ features.',
    thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '2h 15m',
    lessons: 14,
    category: 'technology',
    difficulty: 'advanced',
    tags: ['javascript', 'programming', 'es6'],
    notes: [
      {
        title: 'Understanding Closures',
        content: `Closures are one of the most powerful features in JavaScript.

## What is a Closure?
A closure is a function that has access to variables in its outer scope even after the outer function has returned.

## Practical Examples
- Counter functions
- Module patterns
- Event handlers`,
        duration: '16 min read'
      }
    ],
    quizzes: [
      {
        title: 'JavaScript Closures',
        questions: [
          {
            question: 'What is a closure in JavaScript?',
            options: [
              'A way to close browser windows',
              'A function that has access to variables in its outer scope',
              'A method to end function execution',
              'A type of loop structure'
            ],
            correctAnswer: 1,
            explanation: 'A closure is a function that has access to variables in its outer scope even after the outer function has returned.'
          }
        ]
      }
    ],
    flashcards: [
      {
        question: 'What is lexical scoping?',
        answer: 'The ability of a function scope to access variables from the parent scope.',
        category: 'Scoping'
      }
    ]
  },
  python: {
    title: 'Python Data Science Fundamentals',
    description: 'Learn data analysis, visualization, and machine learning with Python.',
    thumbnail: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpg?auto=compress&cs=tinysrgb&w=800',
    duration: '3h 30m',
    lessons: 20,
    category: 'technology',
    difficulty: 'intermediate',
    tags: ['python', 'data science', 'machine learning'],
    notes: [
      {
        title: 'Python Programming Essentials',
        content: `Python is a versatile programming language perfect for data science.

## Key Features
- Simple syntax
- Rich ecosystem
- Powerful libraries
- Great for beginners`,
        duration: '22 min read'
      }
    ],
    quizzes: [
      {
        title: 'Python Programming Quiz',
        questions: [
          {
            question: 'What is the difference between a list and a tuple in Python?',
            options: [
              'Lists are faster than tuples',
              'Lists are mutable, tuples are immutable',
              'Tuples can only store numbers',
              'There is no difference'
            ],
            correctAnswer: 1,
            explanation: 'Lists are mutable (can be changed) while tuples are immutable (cannot be changed).'
          }
        ]
      }
    ],
    flashcards: [
      {
        question: 'What is a Python list comprehension?',
        answer: 'A concise way to create lists using a single line of code.',
        category: 'Data Structures'
      }
    ]
  },
  database: {
    title: 'Database Management Principles',
    description: 'Master database design, SQL queries, and data management.',
    thumbnail: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '2h 45m',
    lessons: 16,
    category: 'technology',
    difficulty: 'intermediate',
    tags: ['database', 'sql', 'data management'],
    notes: [
      {
        title: 'Database Design Principles',
        content: `Learn the fundamentals of database design and management.

## Key Concepts
- Entity-Relationship modeling
- Normalization
- Indexing
- Query optimization`,
        duration: '18 min read'
      }
    ],
    quizzes: [
      {
        title: 'Database Knowledge Test',
        questions: [
          {
            question: 'What is the purpose of database normalization?',
            options: [
              'To make databases faster',
              'To reduce data redundancy and improve integrity',
              'To increase storage space',
              'To make queries more complex'
            ],
            correctAnswer: 1,
            explanation: 'Database normalization reduces data redundancy and improves data integrity.'
          }
        ]
      }
    ],
    flashcards: [
      {
        question: 'What is a primary key?',
        answer: 'A unique identifier for each record in a database table.',
        category: 'Database Design'
      }
    ]
  },
  web: {
    title: 'Modern Web Development',
    description: 'Learn HTML, CSS, JavaScript, and modern web frameworks.',
    thumbnail: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '3h 00m',
    lessons: 18,
    category: 'technology',
    difficulty: 'beginner',
    tags: ['web development', 'html', 'css', 'javascript'],
    notes: [
      {
        title: 'Web Development Fundamentals',
        content: `Master the building blocks of modern web development.

## Core Technologies
- HTML: Structure
- CSS: Styling
- JavaScript: Interactivity
- Frameworks: React, Vue, Angular`,
        duration: '25 min read'
      }
    ],
    quizzes: [
      {
        title: 'Web Development Quiz',
        questions: [
          {
            question: 'What is responsive web design?',
            options: [
              'Design that responds to user clicks',
              'Design that adapts to different screen sizes',
              'Design that loads quickly',
              'Design with animations'
            ],
            correctAnswer: 1,
            explanation: 'Responsive web design adapts to different screen sizes and devices.'
          }
        ]
      }
    ],
    flashcards: [
      {
        question: 'What is the DOM?',
        answer: 'Document Object Model - a programming interface for HTML documents.',
        category: 'Web Fundamentals'
      }
    ]
  },
  general: {
    title: 'Comprehensive Learning Course',
    description: 'Structured learning materials extracted from your document.',
    thumbnail: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '2h 30m',
    lessons: 15,
    category: 'general',
    difficulty: 'beginner',
    tags: ['learning', 'education', 'study'],
    notes: [
      {
        title: 'Key Learning Concepts',
        content: `This course contains structured learning materials based on your uploaded content.

## Learning Objectives
- Understand core principles
- Apply knowledge practically
- Develop critical thinking
- Master key concepts`,
        duration: '20 min read'
      }
    ],
    quizzes: [
      {
        title: 'Knowledge Assessment',
        questions: [
          {
            question: 'What is active learning?',
            options: [
              'Learning while exercising',
              'Engaging with material through activities',
              'Learning quickly',
              'Learning without teachers'
            ],
            correctAnswer: 1,
            explanation: 'Active learning involves engaging with material through activities and critical thinking.'
          }
        ]
      }
    ],
    flashcards: [
      {
        question: 'What is spaced repetition?',
        answer: 'A learning technique that involves reviewing information at increasing intervals.',
        category: 'Learning Methods'
      }
    ]
  }
};

const extractYouTubeVideoId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const generateCourseContent = (type, data) => {
  if (type === 'youtube') {
    const videoId = extractYouTubeVideoId(data.url);
    const templateIndex = videoId ? 
      Math.abs(videoId.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % youtubeCourseTemplates.length : 
      0;
    
    const template = youtubeCourseTemplates[templateIndex];
    
    return {
      ...template,
      type: 'youtube',
      progress: Math.floor(Math.random() * 50) + 25
    };
  }
  
  if (type === 'pdf') {
    const fileName = data.filename.toLowerCase();
    let templateKey = 'general';
    
    if (fileName.includes('javascript') || fileName.includes('js') || fileName.includes('react')) {
      templateKey = 'javascript';
    } else if (fileName.includes('python') || fileName.includes('data') || fileName.includes('ml')) {
      templateKey = 'python';
    } else if (fileName.includes('database') || fileName.includes('sql') || fileName.includes('db')) {
      templateKey = 'database';
    } else if (fileName.includes('web') || fileName.includes('html') || fileName.includes('css')) {
      templateKey = 'web';
    }
    
    const template = pdfCourseTemplates[templateKey];
    
    return {
      ...template,
      title: `${template.title} - ${data.filename.replace('.pdf', '')}`,
      type: 'pdf',
      progress: 0
    };
  }
  
  throw new Error('Invalid course type');
};

module.exports = { generateCourseContent };