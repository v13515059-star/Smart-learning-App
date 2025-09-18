const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private getAuthHeaders() {
    const token = localStorage.getItem('auth_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ 
        error: response.status === 0 ? 'Cannot connect to server. Please make sure the backend is running.' : 'Network error' 
      }));
      throw new Error(error.error || 'Request failed');
    }
    return response.json();
  }

  // Auth endpoints
  async login(email: string, password: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await this.handleResponse(response);
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
      }
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async register(name: string, email: string, password: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      
      const data = await this.handleResponse(response);
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
      }
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async getCurrentUser() {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async updateProfile(name: string, email: string) {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ name, email })
    });
    return this.handleResponse(response);
  }

  // Course endpoints
  async getCourses() {
    const response = await fetch(`${API_BASE_URL}/courses`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async getCourse(id: string) {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async createYoutubeCourse(url: string) {
    const response = await fetch(`${API_BASE_URL}/courses/youtube`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ url })
    });
    return this.handleResponse(response);
  }

  async createPdfCourse(file: File) {
    const formData = new FormData();
    formData.append('pdf', file);

    const token = localStorage.getItem('auth_token');
    const response = await fetch(`${API_BASE_URL}/courses/pdf`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: formData
    });
    return this.handleResponse(response);
  }

  async updateCourseProgress(id: string, progress: number) {
    const response = await fetch(`${API_BASE_URL}/courses/${id}/progress`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ progress })
    });
    return this.handleResponse(response);
  }

  async deleteCourse(id: string) {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  // User endpoints
  async getUserStats() {
    const response = await fetch(`${API_BASE_URL}/users/stats`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async updatePreferences(preferences: any) {
    const response = await fetch(`${API_BASE_URL}/users/preferences`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ preferences })
    });
    return this.handleResponse(response);
  }

  async updateNotifications(notifications: any) {
    const response = await fetch(`${API_BASE_URL}/users/notifications`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ notifications })
    });
    return this.handleResponse(response);
  }

  async updatePrivacy(privacy: any) {
    const response = await fetch(`${API_BASE_URL}/users/privacy`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ privacy })
    });
    return this.handleResponse(response);
  }

  logout() {
    localStorage.removeItem('auth_token');
  }
}

export const apiService = new ApiService();