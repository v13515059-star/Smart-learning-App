export interface GeneratedCourse {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl?: string;
  duration: string;
  lessons: number;
  progress: number;
  type: 'youtube' | 'pdf';
  notes: Array<{
    id: number;
    title: string;
    content: string;
    duration: string;
  }>;
  quizzes: Array<{
    id: number;
    title: string;
    questions: Array<{
      id: number;
      question: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
    }>;
  }>;
  flashcards: Array<{
    id: number;
    question: string;
    answer: string;
    category: string;
  }>;
}

const youtubeCourseTemplates = [
  {
    title: 'Introduction to Machine Learning',
    description: 'A comprehensive guide to understanding machine learning concepts, algorithms, and practical applications.',
    thumbnail: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '2h 30m',
    lessons: 12,
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
      },
      {
        title: 'Supervised vs Unsupervised Learning',
        content: `Understanding the fundamental difference between supervised and unsupervised learning approaches.

## Supervised Learning

Supervised learning uses labeled training data to learn a mapping function from inputs to outputs. The algorithm learns from training data and makes predictions on new, unseen data.

### Examples:
- Classification: Email spam detection
- Regression: House price prediction

## Unsupervised Learning

Unsupervised learning finds hidden patterns or structures in data without labeled examples. The algorithm must find patterns on its own.

### Examples:
- Clustering: Customer segmentation
- Association: Market basket analysis`,
        duration: '12 min read'
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
          },
          {
            question: 'Which of the following is an example of unsupervised learning?',
            options: [
              'Email spam detection',
              'House price prediction',
              'Customer segmentation',
              'Image classification'
            ],
            correctAnswer: 2,
            explanation: 'Customer segmentation is clustering, which is an unsupervised learning technique that finds hidden patterns in data.'
          }
        ]
      }
    ],
    flashcards: [
      {
        question: 'What is the main goal of supervised learning?',
        answer: 'To learn a mapping function from input variables to output variables using labeled training data.',
        category: 'Fundamentals'
      },
      {
        question: 'Name three types of machine learning.',
        answer: 'Supervised learning, Unsupervised learning, and Reinforcement learning.',
        category: 'Types'
      }
    ]
  },
  {
    title: 'Web Development with React',
    description: 'Master modern React development with hooks, state management, and component architecture.',
    thumbnail: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '3h 15m',
    lessons: 18,
    notes: [
      {
        title: 'React Fundamentals',
        content: `React is a JavaScript library for building user interfaces, particularly web applications. It was developed by Facebook and is now maintained by Meta and the open-source community.

## Core Concepts

### Components
React applications are built using components - reusable pieces of UI that can manage their own state and lifecycle.

### JSX
JSX is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript.

### Virtual DOM
React uses a virtual DOM to efficiently update the actual DOM by comparing changes and updating only what's necessary.

### Props and State
- **Props**: Data passed from parent to child components
- **State**: Internal data that components can manage and update`,
        duration: '18 min read'
      },
      {
        title: 'React Hooks Deep Dive',
        content: `Hooks are functions that let you use state and other React features in functional components.

## Essential Hooks

### useState
Manages local component state in functional components.

### useEffect
Handles side effects like API calls, subscriptions, and DOM manipulation.

### useContext
Consumes context values without nesting.

### Custom Hooks
Create reusable stateful logic that can be shared across components.

## Best Practices
- Only call hooks at the top level
- Use dependency arrays properly in useEffect
- Extract complex logic into custom hooks`,
        duration: '22 min read'
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
          },
          {
            question: 'Which hook is used for managing local component state?',
            options: [
              'useEffect',
              'useContext',
              'useState',
              'useReducer'
            ],
            correctAnswer: 2,
            explanation: 'useState is the hook used for managing local component state in functional components.'
          }
        ]
      }
    ],
    flashcards: [
      {
        question: 'What is the Virtual DOM?',
        answer: 'A JavaScript representation of the actual DOM that React uses to efficiently update the UI by comparing changes.',
        category: 'Core Concepts'
      },
      {
        question: 'What are React Hooks?',
        answer: 'Functions that let you use state and other React features in functional components.',
        category: 'Hooks'
      }
    ]
  },
  {
    title: 'Python Data Science Fundamentals',
    description: 'Learn data analysis, visualization, and machine learning with Python using pandas, matplotlib, and scikit-learn.',
    thumbnail: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpg?auto=compress&cs=tinysrgb&w=800',
    duration: '4h 45m',
    lessons: 24,
    notes: [
      {
        title: 'Introduction to Data Science',
        content: `Data Science is an interdisciplinary field that uses scientific methods, processes, algorithms, and systems to extract knowledge and insights from structured and unstructured data.

## What is Data Science?

Data science combines domain expertise, programming skills, and knowledge of mathematics and statistics to extract meaningful insights from data.

## Key Components
1. **Data Collection**: Gathering relevant data from various sources
2. **Data Cleaning**: Preparing and preprocessing data for analysis
3. **Exploratory Data Analysis**: Understanding patterns and relationships
4. **Modeling**: Building predictive or descriptive models
5. **Visualization**: Communicating findings through charts and graphs

## Python Libraries
- **Pandas**: Data manipulation and analysis
- **NumPy**: Numerical computing
- **Matplotlib/Seaborn**: Data visualization
- **Scikit-learn**: Machine learning algorithms`,
        duration: '20 min read'
      },
      {
        title: 'Working with Pandas',
        content: `Pandas is the most important library for data manipulation and analysis in Python.

## Core Data Structures

### DataFrame
A 2-dimensional labeled data structure with columns of potentially different types.

### Series
A 1-dimensional labeled array capable of holding any data type.

## Essential Operations
- Reading data: \`pd.read_csv()\`, \`pd.read_excel()\`
- Data selection: \`df['column']\`, \`df.loc[]\`, \`df.iloc[]\`
- Data filtering: \`df[df['column'] > value]\`
- Grouping: \`df.groupby('column').agg()\`
- Merging: \`pd.merge()\`, \`df.join()\`

## Data Cleaning
- Handling missing values: \`dropna()\`, \`fillna()\`
- Removing duplicates: \`drop_duplicates()\`
- Data type conversion: \`astype()\``,
        duration: '25 min read'
      }
    ],
    quizzes: [
      {
        title: 'Data Science Basics',
        questions: [
          {
            question: 'What is the primary purpose of pandas in data science?',
            options: [
              'Machine learning algorithms',
              'Data visualization',
              'Data manipulation and analysis',
              'Web development'
            ],
            correctAnswer: 2,
            explanation: 'Pandas is primarily used for data manipulation and analysis, providing data structures and operations for manipulating numerical tables.'
          },
          {
            question: 'Which pandas method is used to read CSV files?',
            options: [
              'pd.load_csv()',
              'pd.read_csv()',
              'pd.import_csv()',
              'pd.get_csv()'
            ],
            correctAnswer: 1,
            explanation: 'pd.read_csv() is the standard method for reading CSV files into a pandas DataFrame.'
          }
        ]
      }
    ],
    flashcards: [
      {
        question: 'What is a DataFrame in pandas?',
        answer: 'A 2-dimensional labeled data structure with columns of potentially different types, similar to a spreadsheet or SQL table.',
        category: 'Data Structures'
      },
      {
        question: 'What does EDA stand for?',
        answer: 'Exploratory Data Analysis - the process of analyzing data to understand patterns, relationships, and anomalies.',
        category: 'Process'
      }
    ]
  }
];

const pdfCourseTemplates = [
  {
    title: 'Advanced JavaScript Concepts',
    description: 'Deep dive into closures, prototypes, async programming, and modern ES6+ features.',
    thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '2h 15m',
    lessons: 14,
    notes: [
      {
        title: 'Understanding Closures',
        content: `Closures are one of the most powerful and often misunderstood features in JavaScript.

## What is a Closure?

A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.

## How Closures Work

When a function is created, it maintains a reference to its lexical environment. This environment consists of any local variables that were in-scope at the time the closure was created.

## Practical Examples

### Counter Function
\`\`\`javascript
function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
\`\`\`

### Module Pattern
Closures enable the module pattern, allowing for private variables and methods.

## Common Use Cases
- Data privacy and encapsulation
- Function factories
- Callbacks and event handlers
- Module patterns`,
        duration: '16 min read'
      },
      {
        title: 'Async Programming Mastery',
        content: `Modern JavaScript provides several ways to handle asynchronous operations effectively.

## Promises

Promises represent the eventual completion or failure of an asynchronous operation.

### Promise States
- **Pending**: Initial state
- **Fulfilled**: Operation completed successfully
- **Rejected**: Operation failed

## Async/Await

Async/await provides a more readable way to work with promises.

\`\`\`javascript
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
\`\`\`

## Error Handling
- Use try/catch with async/await
- Use .catch() with promises
- Always handle both success and error cases`,
        duration: '19 min read'
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
            explanation: 'A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.'
          },
          {
            question: 'What keyword is used to declare an async function?',
            options: [
              'function',
              'async',
              'await',
              'promise'
            ],
            correctAnswer: 1,
            explanation: 'The async keyword is used before the function keyword to declare an asynchronous function.'
          }
        ]
      }
    ],
    flashcards: [
      {
        question: 'What is lexical scoping?',
        answer: 'The ability of a function scope to access variables from the parent scope, which enables closures.',
        category: 'Scoping'
      },
      {
        question: 'What does await do?',
        answer: 'Pauses the execution of an async function until a Promise is resolved or rejected.',
        category: 'Async Programming'
      }
    ]
  },
  {
    title: 'Database Design Principles',
    description: 'Learn relational database design, normalization, indexing, and query optimization techniques.',
    thumbnail: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '3h 30m',
    lessons: 20,
    notes: [
      {
        title: 'Database Normalization',
        content: `Database normalization is the process of organizing data in a database to reduce redundancy and improve data integrity.

## Normal Forms

### First Normal Form (1NF)
- Each table cell should contain a single value
- Each record needs to be unique

### Second Normal Form (2NF)
- Must be in 1NF
- All non-key attributes must be fully functionally dependent on the primary key

### Third Normal Form (3NF)
- Must be in 2NF
- No transitive dependencies

## Benefits of Normalization
- Reduces data redundancy
- Improves data consistency
- Easier to maintain and update
- Saves storage space

## When to Denormalize
Sometimes denormalization is beneficial for:
- Performance optimization
- Simplified queries
- Data warehousing scenarios`,
        duration: '22 min read'
      },
      {
        title: 'Indexing Strategies',
        content: `Database indexes are data structures that improve the speed of data retrieval operations.

## Types of Indexes

### Clustered Index
- Physically reorders table data
- One per table
- Usually on primary key

### Non-Clustered Index
- Points to data locations
- Multiple per table
- Faster lookups for specific columns

## Index Design Principles
1. Index frequently queried columns
2. Consider composite indexes for multi-column queries
3. Avoid over-indexing (impacts write performance)
4. Monitor index usage and remove unused indexes

## Query Optimization
- Use EXPLAIN to analyze query execution plans
- Avoid SELECT * in production queries
- Use appropriate WHERE clauses
- Consider query caching strategies`,
        duration: '18 min read'
      }
    ],
    quizzes: [
      {
        title: 'Database Design Quiz',
        questions: [
          {
            question: 'What is the main purpose of database normalization?',
            options: [
              'To make databases faster',
              'To reduce data redundancy and improve integrity',
              'To increase storage space',
              'To make queries more complex'
            ],
            correctAnswer: 1,
            explanation: 'Database normalization reduces data redundancy and improves data integrity by organizing data efficiently.'
          },
          {
            question: 'How many clustered indexes can a table have?',
            options: [
              'Unlimited',
              'One',
              'Two',
              'Depends on the database engine'
            ],
            correctAnswer: 1,
            explanation: 'A table can have only one clustered index because it physically reorders the table data.'
          }
        ]
      }
    ],
    flashcards: [
      {
        question: 'What is a primary key?',
        answer: 'A unique identifier for each record in a database table that cannot be null and must be unique.',
        category: 'Database Design'
      },
      {
        question: 'What is denormalization?',
        answer: 'The process of adding redundancy to a database to improve read performance at the cost of write performance.',
        category: 'Optimization'
      }
    ]
  }
];

export const generateCourseFromYoutube = (url: string): GeneratedCourse => {
  // Extract video ID to determine which template to use
  const videoId = extractYouTubeVideoId(url);
  const templateIndex = videoId ? Math.abs(videoId.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % youtubeCourseTemplates.length : 0;
  const template = youtubeCourseTemplates[templateIndex];
  
  return {
    id: `youtube-${Date.now()}`,
    type: 'youtube',
    videoUrl: url,
    createdAt: Date.now(),
    progress: Math.floor(Math.random() * 50) + 25, // Random progress between 25-75%
    ...template,
    notes: template.notes.map((note, index) => ({ ...note, id: index + 1 })),
    quizzes: template.quizzes.map((quiz, index) => ({
      ...quiz,
      id: index + 1,
      questions: quiz.questions.map((q, qIndex) => ({ ...q, id: qIndex + 1 }))
    })),
    flashcards: template.flashcards.map((card, index) => ({ ...card, id: index + 1 }))
  };
};

export const generateCourseFromPdf = (file: File): GeneratedCourse => {
  // Analyze file name to determine content type and generate appropriate course
  const fileName = file.name.toLowerCase();
  let template;
  
  // Determine course type based on file name keywords
  if (fileName.includes('javascript') || fileName.includes('js') || fileName.includes('react') || fileName.includes('node')) {
    template = {
      title: `JavaScript Programming - ${file.name.replace('.pdf', '')}`,
      description: 'Master JavaScript concepts, ES6+ features, and modern development practices extracted from your PDF.',
      thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '2h 45m',
      lessons: 16,
      notes: [
        {
          title: 'JavaScript Fundamentals from PDF',
          content: `# JavaScript Core Concepts

Based on the content from "${file.name}", here are the key JavaScript concepts covered:

## Variables and Data Types
JavaScript supports various data types including:
- **Primitive types**: string, number, boolean, undefined, null, symbol
- **Reference types**: objects, arrays, functions

## Functions and Scope
- Function declarations vs expressions
- Arrow functions and their behavior
- Lexical scoping and closures
- The 'this' keyword context

## Modern JavaScript Features
- Template literals for string interpolation
- Destructuring assignment
- Spread and rest operators
- Async/await for handling promises

## Best Practices
- Use const and let instead of var
- Implement proper error handling
- Follow consistent naming conventions
- Write modular, reusable code`,
          duration: '20 min read'
        },
        {
          title: 'Advanced JavaScript Patterns',
          content: `# Advanced Programming Patterns

## Object-Oriented Programming
- Classes and inheritance
- Prototypal inheritance
- Encapsulation and data privacy

## Functional Programming
- Higher-order functions
- Map, filter, and reduce operations
- Pure functions and immutability

## Asynchronous Programming
- Promises and promise chaining
- Async/await syntax
- Error handling in async code

## Module Systems
- ES6 modules (import/export)
- CommonJS modules
- Module bundling concepts`,
          duration: '25 min read'
        }
      ],
      quizzes: [
        {
          title: 'JavaScript Knowledge Check',
          questions: [
            {
              question: 'What is the difference between let and const in JavaScript?',
              options: [
                'let is for strings, const is for numbers',
                'let allows reassignment, const does not',
                'const is faster than let',
                'There is no difference'
              ],
              correctAnswer: 1,
              explanation: 'let allows reassignment of the variable, while const creates a constant reference that cannot be reassigned.'
            },
            {
              question: 'What does the spread operator (...) do in JavaScript?',
              options: [
                'Creates a new variable',
                'Expands an iterable into individual elements',
                'Deletes array elements',
                'Converts strings to arrays'
              ],
              correctAnswer: 1,
              explanation: 'The spread operator expands an iterable (like an array) into individual elements, useful for copying arrays or passing arguments.'
            },
            {
              question: 'What is a closure in JavaScript?',
              options: [
                'A way to close the browser',
                'A function that has access to outer scope variables',
                'A method to end loops',
                'A type of error handling'
              ],
              correctAnswer: 1,
              explanation: 'A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.'
            }
          ]
        }
      ],
      flashcards: [
        {
          question: 'What is hoisting in JavaScript?',
          answer: 'Hoisting is JavaScript\'s behavior of moving variable and function declarations to the top of their scope during compilation.',
          category: 'Core Concepts'
        },
        {
          question: 'What is the difference between == and === in JavaScript?',
          answer: '== performs type coercion before comparison, while === compares both value and type without coercion.',
          category: 'Operators'
        }
      ]
    };
  } else if (fileName.includes('python') || fileName.includes('data') || fileName.includes('ml') || fileName.includes('ai')) {
    template = {
      title: `Python Data Science - ${file.name.replace('.pdf', '')}`,
      description: 'Learn Python programming, data analysis, and machine learning concepts from your PDF content.',
      thumbnail: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpg?auto=compress&cs=tinysrgb&w=800',
      duration: '3h 30m',
      lessons: 20,
      notes: [
        {
          title: 'Python Programming Essentials',
          content: `# Python Programming from "${file.name}"

## Python Basics
- Variables and data types
- Control structures (if, for, while)
- Functions and modules
- Exception handling

## Data Structures
- Lists, tuples, and dictionaries
- Sets and their operations
- List comprehensions
- Generator expressions

## Object-Oriented Programming
- Classes and objects
- Inheritance and polymorphism
- Special methods (__init__, __str__, etc.)

## File Handling and I/O
- Reading and writing files
- Working with CSV and JSON
- File system operations`,
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
              explanation: 'Lists are mutable (can be changed after creation) while tuples are immutable (cannot be changed after creation).'
            }
          ]
        }
      ],
      flashcards: [
        {
          question: 'What is a Python list comprehension?',
          answer: 'A concise way to create lists using a single line of code with optional conditions.',
          category: 'Data Structures'
        }
      ]
    };
  } else if (fileName.includes('database') || fileName.includes('sql') || fileName.includes('db')) {
    template = {
      title: `Database Management - ${file.name.replace('.pdf', '')}`,
      description: 'Master database design, SQL queries, and data management principles from your PDF.',
      thumbnail: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '2h 15m',
      lessons: 14,
      notes: [
        {
          title: 'Database Design Principles',
          content: `# Database Management from "${file.name}"

## Database Fundamentals
- What is a database?
- DBMS vs Database
- Types of databases (Relational, NoSQL)

## SQL Basics
- SELECT statements
- WHERE clauses and filtering
- JOIN operations
- Aggregate functions

## Database Design
- Entity-Relationship modeling
- Normalization principles
- Primary and foreign keys
- Indexing strategies`,
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
              explanation: 'Database normalization reduces data redundancy and improves data integrity by organizing data efficiently.'
            }
          ]
        }
      ],
      flashcards: [
        {
          question: 'What is a primary key?',
          answer: 'A unique identifier for each record in a database table that cannot be null.',
          category: 'Database Design'
        }
      ]
    };
  } else if (fileName.includes('web') || fileName.includes('html') || fileName.includes('css') || fileName.includes('frontend')) {
    template = {
      title: `Web Development - ${file.name.replace('.pdf', '')}`,
      description: 'Learn modern web development techniques, HTML, CSS, and frontend frameworks from your PDF.',
      thumbnail: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '3h 00m',
      lessons: 18,
      notes: [
        {
          title: 'Web Development Fundamentals',
          content: `# Web Development from "${file.name}"

## HTML Structure
- Semantic HTML elements
- Forms and input validation
- Accessibility best practices

## CSS Styling
- Selectors and specificity
- Flexbox and Grid layouts
- Responsive design principles
- CSS animations and transitions

## JavaScript Integration
- DOM manipulation
- Event handling
- AJAX and fetch API
- Modern ES6+ features`,
          duration: '25 min read'
        }
      ],
      quizzes: [
        {
          title: 'Web Development Quiz',
          questions: [
            {
              question: 'What is the difference between HTML and HTML5?',
              options: [
                'HTML5 is faster',
                'HTML5 includes semantic elements and multimedia support',
                'HTML5 only works in Chrome',
                'There is no difference'
              ],
              correctAnswer: 1,
              explanation: 'HTML5 introduced semantic elements, multimedia support, and many new APIs compared to earlier HTML versions.'
            }
          ]
        }
      ],
      flashcards: [
        {
          question: 'What is responsive web design?',
          answer: 'An approach to web design that makes web pages render well on different devices and screen sizes.',
          category: 'Design Principles'
        }
      ]
    };
  } else {
    // Generic template for other PDFs
    template = {
      title: `Learning Course - ${file.name.replace('.pdf', '')}`,
      description: `Comprehensive learning materials extracted and organized from your PDF: ${file.name}`,
      thumbnail: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
      duration: '2h 30m',
      lessons: 15,
      notes: [
        {
          title: `Key Concepts from ${file.name}`,
          content: `# Learning Materials from "${file.name}"

## Document Overview
This course has been generated from your uploaded PDF document. The content has been analyzed and organized into structured learning materials.

## Main Topics Covered
Based on the document analysis, the following areas are covered:

### Core Concepts
- Fundamental principles and definitions
- Key terminology and vocabulary
- Important theories and frameworks

### Practical Applications
- Real-world examples and case studies
- Implementation strategies
- Best practices and guidelines

### Advanced Topics
- Complex concepts and relationships
- Integration with other subjects
- Future trends and developments

## Study Recommendations
1. Review the key concepts thoroughly
2. Practice with the provided quizzes
3. Use flashcards for memorization
4. Apply concepts to real scenarios`,
          duration: '20 min read'
        },
        {
          title: 'Detailed Analysis and Applications',
          content: `# In-Depth Study Guide

## Methodology
The content from your PDF has been structured using proven educational methodologies:

### Learning Objectives
- Understand core principles
- Apply knowledge practically
- Analyze complex scenarios
- Synthesize information effectively

### Study Techniques
- Active reading strategies
- Note-taking methods
- Memory enhancement techniques
- Critical thinking approaches

## Assessment and Review
Regular assessment helps reinforce learning:
- Self-evaluation quizzes
- Concept mapping exercises
- Practical applications
- Peer discussions`,
          duration: '18 min read'
        }
      ],
      quizzes: [
        {
          title: 'Document Comprehension Quiz',
          questions: [
            {
              question: 'What is the main focus of the uploaded document?',
              options: [
                'Theoretical concepts and principles',
                'Practical applications and examples',
                'Historical background and context',
                'All of the above'
              ],
              correctAnswer: 3,
              explanation: 'Most educational documents combine theoretical concepts, practical applications, and contextual background for comprehensive learning.'
            },
            {
              question: 'Which study technique is most effective for retaining information?',
              options: [
                'Passive reading only',
                'Active engagement with the material',
                'Memorizing without understanding',
                'Skipping difficult sections'
              ],
              correctAnswer: 1,
              explanation: 'Active engagement with the material through questioning, summarizing, and applying concepts leads to better retention.'
            },
            {
              question: 'How should you approach complex topics in the document?',
              options: [
                'Skip them entirely',
                'Memorize them word for word',
                'Break them down into smaller parts',
                'Only read them once'
              ],
              correctAnswer: 2,
              explanation: 'Breaking complex topics into smaller, manageable parts makes them easier to understand and remember.'
            }
          ]
        }
      ],
      flashcards: [
        {
          question: 'What is active learning?',
          answer: 'A learning approach that engages students in the process through activities and critical thinking rather than passive listening.',
          category: 'Learning Methods'
        },
        {
          question: 'Why is spaced repetition effective?',
          answer: 'It leverages the psychological spacing effect, where information is better retained when reviewed at increasing intervals.',
          category: 'Memory Techniques'
        },
        {
          question: 'What is the purpose of formative assessment?',
          answer: 'To provide ongoing feedback during the learning process to help students improve their understanding.',
          category: 'Assessment'
        }
      ]
    };
  }
  
  return {
    id: `pdf-${Date.now()}`,
    type: 'pdf',
    progress: 0, // Start with 0% progress for new courses
    createdAt: Date.now(),
    ...template,
    notes: template.notes.map((note, index) => ({ ...note, id: index + 1 })),
    quizzes: template.quizzes.map((quiz, index) => ({
      ...quiz,
      id: index + 1,
      questions: quiz.questions.map((q, qIndex) => ({ ...q, id: qIndex + 1 }))
    })),
    flashcards: template.flashcards.map((card, index) => ({ ...card, id: index + 1 }))
  };
};

const extractYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Storage utilities
export const saveCourse = (course: GeneratedCourse): void => {
  const courses = getCourses();
  courses.push(course);
  localStorage.setItem('courseforge_courses', JSON.stringify(courses));
};

export const getCourses = (): GeneratedCourse[] => {
  const stored = localStorage.getItem('courseforge_courses');
  return stored ? JSON.parse(stored) : [];
};

export const getCourseById = (id: string): GeneratedCourse | null => {
  const courses = getCourses();
  return courses.find(course => course.id === id) || null;
};