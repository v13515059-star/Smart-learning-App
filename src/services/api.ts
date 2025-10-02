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
      notes: [],
      quizzes: [],
      flashcards: [],
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
      notes: [],
      quizzes: [],
      flashcards: [],
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