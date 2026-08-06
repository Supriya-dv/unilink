// Centralized API client for UniLink backend
const API_BASE = '/api/v1';

interface ApiOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  isFormData?: boolean;
}

interface ApiResponse<T = unknown> {
  data: T;
  ok: boolean;
  status: number;
}

class ApiError extends Error {
  status: number;
  data: unknown;
  
  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

async function request<T = unknown>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {}, isFormData = false } = options;
  
  const token = localStorage.getItem('unilink_token');
  
  const config: RequestInit = {
    method,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(!isFormData ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
  };

  if (body) {
    config.body = isFormData ? (body as FormData) : JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  
  // Handle 401 - redirect to login
  if (response.status === 401) {
    localStorage.removeItem('unilink_token');
    localStorage.removeItem('unilink_user');
    window.location.href = '/login';
    throw new ApiError('Unauthorized', 401);
  }

  const data = await response.json();
  
  if (!response.ok) {
    throw new ApiError(
      data.message || data.error || 'Something went wrong',
      response.status,
      data
    );
  }

  return data as T;
}

// Convenience methods
export const api = {
  get: <T = unknown>(endpoint: string) => request<T>(endpoint),
  
  post: <T = unknown>(endpoint: string, body?: unknown) => 
    request<T>(endpoint, { method: 'POST', body }),
  
  put: <T = unknown>(endpoint: string, body?: unknown) => 
    request<T>(endpoint, { method: 'PUT', body }),
  
  delete: <T = unknown>(endpoint: string) => 
    request<T>(endpoint, { method: 'DELETE' }),
  
  upload: <T = unknown>(endpoint: string, formData: FormData) =>
    request<T>(endpoint, { method: 'POST', body: formData, isFormData: true }),
};

// Auth-specific API calls
export const authApi = {
  register: (data: {
    email: string;
    password: string;
    fullName: string;
    age?: string;
    role: string;
    department?: string;
    interests?: string;
    bio?: string;
  }) => api.post<{ token: string; user: UserProfile }>('/auth/register', data),
  
  login: (data: { email: string; password: string }) =>
    api.post<{ token: string; user: UserProfile }>('/auth/login', data),
  
  googleAuth: (data: { email: string; fullName?: string; avatarUrl?: string }) =>
    api.post<{ token: string; user: UserProfile }>('/auth/google', data),

  githubAuth: (data: { email: string; fullName?: string; avatarUrl?: string; githubUsername?: string }) =>
    api.post<{ token: string; user: UserProfile }>('/auth/github', data),

  getMe: () => api.get<{ user: UserProfile }>('/auth/me'),
};

// User-specific API calls
export const userApi = {
  getProfile: () => api.get<{ user: UserProfile }>('/users/me'),
  
  updateProfile: (data: Partial<UserProfile>) =>
    api.put<{ user: UserProfile }>('/users/me', data),
  
  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.upload<{ user: UserProfile }>('/users/me/avatar', formData);
  },
  
  uploadCover: (file: File) => {
    const formData = new FormData();
    formData.append('cover', file);
    return api.upload<{ user: UserProfile }>('/users/me/cover', formData);
  },
  
  addSkill: (skill: string) =>
    api.post<{ user: UserProfile }>('/users/me/skills', { skill }),
  
  removeSkill: (skill: string) =>
    api.delete<{ user: UserProfile }>(`/users/me/skills/${encodeURIComponent(skill)}`),
  
  getUserById: (id: string) =>
    api.get<{ user: UserProfile }>(`/users/${id}`),
};

// Discovery API calls
export const discoveryApi = {
  getCards: () => api.get<{ cards: DiscoveryCardType[] }>('/discovery/cards'),
  swipe: (targetUserId: string, action: 'like' | 'pass') => 
    api.post<{ isMatch: boolean }>('/discovery/swipe', { targetUserId, action }),
};

// Connections API calls
export const connectionsApi = {
  getConnections: () => api.get<{
    matches: ConnectionItem[];
    requests: ConnectionItem[];
    sent: ConnectionItem[];
  }>('/connections'),
  
  acceptRequest: (connectionId: string) => 
    api.post<{ message: string }>(`/connections/accept/${connectionId}`),
  
  declineRequest: (connectionId: string) => 
    api.post<{ message: string }>(`/connections/decline/${connectionId}`),
};

// Messaging API calls
export const messagesApi = {
  getMessages: (recipientId: string) => 
    api.get<{ messages: MessageType[] }>(`/messages/${recipientId}`),
  
  sendMessage: (recipientId: string, text: string) => 
    api.post<{ message: MessageType }>('/messages', { recipientId, text }),
};

// Type definitions matching the backend User model
export interface UserProfile {
  _id: string;
  email: string;
  fullName: string;
  age?: number;
  role: 'student' | 'alumni';
  department?: string;
  university?: string;
  location?: string;
  occupationTitle?: string;
  company?: string;
  bio?: string;
  interests: string[];
  skills: string[];
  avatarUrl: string;
  coverUrl: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  isOnline: boolean;
  lastActiveAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface DiscoveryCardType {
  _id: string;
  fullName: string;
  age?: number;
  location?: string;
  occupationTitle?: string;
  university?: string;
  bio?: string;
  avatarUrl?: string;
  interests: string[];
  skills: string[];
  role: 'student' | 'alumni';
  department?: string;
}

export interface ConnectionItem {
  _id: string; // Connection ID
  user: UserProfile; // The other user in the connection
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
  lastMessage?: {
    text: string;
    createdAt: string;
    sender: string;
  } | null;
  unreadCount?: number;
}

export interface MessageType {
  _id: string;
  sender: string; // User ID
  recipient: string; // User ID
  text: string;
  isRead: boolean;
  createdAt: string;
}

export { ApiError };
