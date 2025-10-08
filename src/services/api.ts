interface User {
  _id: string;
  email: string;
  name: string;
  preferences?: any;
  notifications?: any;
  privacy?: any;
  stats?: any;
}

interface Course {
  _id: string;
  userId: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl?: string;
  duration: string;
  lessons: number;
  progress: number;
  type: 'youtube' | 'pdf';
  notes?: any[];
  quizzes?: any[];
  flashcards?: any[];
  category?: string;
  difficulty?: string;
  tags?: string[];
  createdAt?: string;
}

class ApiService {
  private generateId() {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  }

  private getStorageKey(key: string) {
    return `mindsphere_${key}`;
  }

  private getUsers(): User[] {
    const users = localStorage.getItem(this.getStorageKey('users'));
    return users ? JSON.parse(users) : [];
  }

  private saveUsers(users: User[]) {
    localStorage.setItem(this.getStorageKey('users'), JSON.stringify(users));
  }

  private getCoursesFromStorage(): Course[] {
    const courses = localStorage.getItem(this.getStorageKey('courses'));
    return courses ? JSON.parse(courses) : [];
  }

  private saveCoursesToStorage(courses: Course[]) {
    localStorage.setItem(this.getStorageKey('courses'), JSON.stringify(courses));
  }

  async login(email: string, password: string) {
    await new Promise(resolve => setTimeout(resolve, 500));

    const users = this.getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const storedPassword = localStorage.getItem(this.getStorageKey(`pwd_${user._id}`));
    if (storedPassword !== password) {
      throw new Error('Invalid email or password');
    }

    const token = this.generateId();
    localStorage.setItem('auth_token', token);
    localStorage.setItem(this.getStorageKey(`token_${token}`), user._id);

    return { user, token };
  }

  async register(name: string, email: string, password: string) {
    await new Promise(resolve => setTimeout(resolve, 500));

    const users = this.getUsers();

    if (users.find(u => u.email === email)) {
      throw new Error('Email already exists');
    }

    const newUser: User = {
      _id: this.generateId(),
      name,
      email,
      preferences: {
        theme: 'dark',
        language: 'en',
        emailDigest: 'weekly',
        autoplay: true
      },
      notifications: {
        courseComplete: true,
        quizResults: true,
        weeklyProgress: false,
        newFeatures: true
      },
      privacy: {
        profileVisible: true,
        progressVisible: false,
        achievementsVisible: true
      },
      stats: {
        totalCourses: 0,
        completedCourses: 0,
        totalHours: 0,
        averageProgress: 0
      }
    };

    users.push(newUser);
    this.saveUsers(users);
    localStorage.setItem(this.getStorageKey(`pwd_${newUser._id}`), password);

    const token = this.generateId();
    localStorage.setItem('auth_token', token);
    localStorage.setItem(this.getStorageKey(`token_${token}`), newUser._id);

    return { user: newUser, token };
  }

  async getCurrentUser() {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('Not authenticated');
    }

    const userId = localStorage.getItem(this.getStorageKey(`token_${token}`));
    if (!userId) {
      throw new Error('Invalid token');
    }

    const users = this.getUsers();
    const user = users.find(u => u._id === userId);

    if (!user) {
      throw new Error('User not found');
    }

    return { user };
  }

  async updateProfile(name: string, email: string) {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('Not authenticated');

    const userId = localStorage.getItem(this.getStorageKey(`token_${token}`));
    if (!userId) throw new Error('Invalid token');

    const users = this.getUsers();
    const userIndex = users.findIndex(u => u._id === userId);

    if (userIndex === -1) throw new Error('User not found');

    users[userIndex] = { ...users[userIndex], name, email };
    this.saveUsers(users);

    return { user: users[userIndex] };
  }

  async getCourses() {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('Not authenticated');

    const userId = localStorage.getItem(this.getStorageKey(`token_${token}`));
    if (!userId) throw new Error('Invalid token');

    const allCourses = this.getCoursesFromStorage();
    return allCourses.filter(c => c.userId === userId);
  }

  async getCourse(id: string) {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('Not authenticated');

    const userId = localStorage.getItem(this.getStorageKey(`token_${token}`));
    if (!userId) throw new Error('Invalid token');

    const allCourses = this.getCoursesFromStorage();
    const course = allCourses.find(c => c._id === id && c.userId === userId);

    if (!course) throw new Error('Course not found');
    return course;
  }

  async createYoutubeCourse(url: string) {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('Not authenticated');

    const userId = localStorage.getItem(this.getStorageKey(`token_${token}`));
    if (!userId) throw new Error('Invalid token');

    await new Promise(resolve => setTimeout(resolve, 1000));

    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)?.[1];
    if (!videoId) throw new Error('Invalid YouTube URL');

    const newCourse: Course = {
      _id: this.generateId(),
      userId,
      title: 'YouTube Course',
      description: 'Course generated from YouTube video',
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      videoUrl: url,
      duration: '45 min',
      lessons: 8,
      progress: 0,
      type: 'youtube',
      notes: [
        {
          title: 'Introduction to the Topic',
          content: 'This comprehensive course covers all the essential concepts you need to master this subject.\n\nKey Learning Objectives:\n• Understanding core principles\n• Practical application of concepts\n• Best practices and common pitfalls\n• Real-world examples and case studies\n\nThis lesson provides a solid foundation for the topics covered in this course.',
          duration: '10 min'
        },
        {
          title: 'Core Concepts',
          content: 'In this section, we dive deep into the fundamental concepts that form the basis of this subject.\n\nTopics Covered:\n1. Foundational principles\n2. Key terminology and definitions\n3. Important frameworks and methodologies\n4. Practical examples\n\nBy the end of this lesson, you will have a solid understanding of the core concepts.',
          duration: '15 min'
        },
        {
          title: 'Advanced Topics',
          content: 'Now that you have mastered the basics, let\'s explore more advanced topics and techniques.\n\nAdvanced Concepts:\n• Complex problem-solving strategies\n• Optimization techniques\n• Integration with other systems\n• Performance considerations\n\nThis lesson will help you take your skills to the next level.',
          duration: '20 min'
        }
      ],
      quizzes: [
        {
          title: 'Knowledge Assessment',
          questions: [
            {
              question: 'What is the primary focus of this course?',
              options: [
                'Learning the fundamentals',
                'Advanced techniques only',
                'Theory without practice',
                'Unrelated topics'
              ],
              correctAnswer: 0,
              explanation: 'This course focuses on learning the fundamentals first before moving to advanced topics.'
            },
            {
              question: 'Which of the following is a key learning objective?',
              options: [
                'Memorizing facts',
                'Understanding core principles',
                'Avoiding practice',
                'Ignoring best practices'
              ],
              correctAnswer: 1,
              explanation: 'Understanding core principles is essential for mastering any subject.'
            },
            {
              question: 'What should you do after completing each lesson?',
              options: [
                'Skip to the end',
                'Practice and review',
                'Forget everything',
                'Start a new course'
              ],
              correctAnswer: 1,
              explanation: 'Practice and review help reinforce learning and improve retention.'
            }
          ]
        }
      ],
      flashcards: [
        {
          question: 'What are the core principles covered in this course?',
          answer: 'Foundational concepts, practical application, best practices, and real-world examples.',
          category: 'Fundamentals'
        },
        {
          question: 'Why is understanding terminology important?',
          answer: 'It helps communicate effectively and understand advanced concepts more easily.',
          category: 'Concepts'
        },
        {
          question: 'What is the benefit of learning best practices?',
          answer: 'It helps avoid common mistakes and implement solutions more efficiently.',
          category: 'Best Practices'
        }
      ],
      category: 'general',
      difficulty: 'beginner',
      tags: [],
      createdAt: new Date().toISOString()
    };

    const courses = this.getCoursesFromStorage();
    courses.push(newCourse);
    this.saveCoursesToStorage(courses);

    return newCourse;
  }

  async createPdfCourse(file: File) {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('Not authenticated');

    const userId = localStorage.getItem(this.getStorageKey(`token_${token}`));
    if (!userId) throw new Error('Invalid token');

    await new Promise(resolve => setTimeout(resolve, 1000));

    const newCourse: Course = {
      _id: this.generateId(),
      userId,
      title: file.name.replace('.pdf', ''),
      description: 'Course generated from PDF document',
      thumbnail: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg',
      duration: '60 min',
      lessons: 12,
      progress: 0,
      type: 'pdf',
      notes: [
        {
          title: 'Chapter 1: Introduction',
          content: 'Welcome to this comprehensive course based on your uploaded PDF document.\n\nThis chapter introduces the main topics and provides an overview of what you will learn throughout this course.\n\nKey Points:\n• Overview of the subject matter\n• Learning objectives\n• Course structure and timeline\n• Prerequisites and requirements\n\nTake your time to read through this material and make notes as needed.',
          duration: '15 min'
        },
        {
          title: 'Chapter 2: Main Content',
          content: 'This section contains the core content extracted from your PDF document.\n\nWe will cover:\n1. Primary concepts and theories\n2. Detailed explanations with examples\n3. Practical applications\n4. Case studies and real-world scenarios\n\nMake sure to understand each concept before moving forward.',
          duration: '25 min'
        },
        {
          title: 'Chapter 3: Summary and Conclusion',
          content: 'Let\'s review what we have learned throughout this course.\n\nKey Takeaways:\n• Summary of main concepts\n• Important formulas or frameworks\n• Next steps and further learning\n• Additional resources\n\nCongratulations on completing this course!',
          duration: '20 min'
        }
      ],
      quizzes: [
        {
          title: 'Final Assessment',
          questions: [
            {
              question: 'What is the main topic covered in this document?',
              options: [
                'Introduction to key concepts',
                'Unrelated content',
                'Only theoretical information',
                'No specific focus'
              ],
              correctAnswer: 0,
              explanation: 'The document focuses on introducing and explaining key concepts in detail.'
            },
            {
              question: 'Why are practical applications important?',
              options: [
                'They are not important',
                'They help understand theory better',
                'They make learning harder',
                'They are optional'
              ],
              correctAnswer: 1,
              explanation: 'Practical applications help bridge the gap between theory and real-world use.'
            },
            {
              question: 'What should you do after completing this course?',
              options: [
                'Nothing',
                'Review key concepts and practice',
                'Delete all materials',
                'Forget what you learned'
              ],
              correctAnswer: 1,
              explanation: 'Reviewing and practicing helps solidify your understanding and retention.'
            }
          ]
        }
      ],
      flashcards: [
        {
          question: 'What is the purpose of this course?',
          answer: 'To provide a comprehensive understanding of the topics covered in the PDF document.',
          category: 'Overview'
        },
        {
          question: 'How can you apply what you learned?',
          answer: 'By practicing with real-world examples and case studies presented in the course.',
          category: 'Application'
        },
        {
          question: 'What is the next step after completion?',
          answer: 'Review the material, practice the concepts, and explore additional resources for deeper learning.',
          category: 'Next Steps'
        }
      ],
      category: 'general',
      difficulty: 'beginner',
      tags: [],
      createdAt: new Date().toISOString()
    };

    const courses = this.getCoursesFromStorage();
    courses.push(newCourse);
    this.saveCoursesToStorage(courses);

    return newCourse;
  }

  async updateCourseProgress(id: string, progress: number) {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('Not authenticated');

    const userId = localStorage.getItem(this.getStorageKey(`token_${token}`));
    if (!userId) throw new Error('Invalid token');

    const courses = this.getCoursesFromStorage();
    const courseIndex = courses.findIndex(c => c._id === id && c.userId === userId);

    if (courseIndex === -1) throw new Error('Course not found');

    courses[courseIndex].progress = progress;
    this.saveCoursesToStorage(courses);

    return courses[courseIndex];
  }

  async deleteCourse(id: string) {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('Not authenticated');

    const userId = localStorage.getItem(this.getStorageKey(`token_${token}`));
    if (!userId) throw new Error('Invalid token');

    const courses = this.getCoursesFromStorage();
    const filteredCourses = courses.filter(c => !(c._id === id && c.userId === userId));

    if (courses.length === filteredCourses.length) {
      throw new Error('Course not found');
    }

    this.saveCoursesToStorage(filteredCourses);
    return { message: 'Course deleted successfully' };
  }

  async getUserStats() {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('Not authenticated');

    const userId = localStorage.getItem(this.getStorageKey(`token_${token}`));
    if (!userId) throw new Error('Invalid token');

    const users = this.getUsers();
    const user = users.find(u => u._id === userId);

    if (!user) throw new Error('User not found');
    return user.stats || {};
  }

  async updatePreferences(preferences: any) {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('Not authenticated');

    const userId = localStorage.getItem(this.getStorageKey(`token_${token}`));
    if (!userId) throw new Error('Invalid token');

    const users = this.getUsers();
    const userIndex = users.findIndex(u => u._id === userId);

    if (userIndex === -1) throw new Error('User not found');

    users[userIndex].preferences = preferences;
    this.saveUsers(users);

    return { user: users[userIndex] };
  }

  async updateNotifications(notifications: any) {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('Not authenticated');

    const userId = localStorage.getItem(this.getStorageKey(`token_${token}`));
    if (!userId) throw new Error('Invalid token');

    const users = this.getUsers();
    const userIndex = users.findIndex(u => u._id === userId);

    if (userIndex === -1) throw new Error('User not found');

    users[userIndex].notifications = notifications;
    this.saveUsers(users);

    return { user: users[userIndex] };
  }

  async updatePrivacy(privacy: any) {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('Not authenticated');

    const userId = localStorage.getItem(this.getStorageKey(`token_${token}`));
    if (!userId) throw new Error('Invalid token');

    const users = this.getUsers();
    const userIndex = users.findIndex(u => u._id === userId);

    if (userIndex === -1) throw new Error('User not found');

    users[userIndex].privacy = privacy;
    this.saveUsers(users);

    return { user: users[userIndex] };
  }

  logout() {
    localStorage.removeItem('auth_token');
  }
}

export const apiService = new ApiService();