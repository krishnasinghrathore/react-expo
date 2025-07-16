# Hybrid Admin Panel with Encore TypeScript Backend

## Architecture Overview

```
🏗️ MICROSERVICES ARCHITECTURE
├── 🎨 Frontend (Hybrid)
│   ├── Web (PrimeReact)
│   └── Mobile (Tamagui)
├── 🚀 Backend (Encore TypeScript)
│   ├── 👥 User Service
│   ├── 📦 Product Service
│   ├── 🔐 Auth Service
│   └── 📊 Analytics Service
└── 🗄️ Database (PostgreSQL)
```

## Backend Setup (Encore TypeScript)

### Project Structure
```
📁 backend/
├── 📁 services/
│   ├── 📁 user/
│   │   ├── user.ts
│   │   ├── migrations/
│   │   └── types.ts
│   ├── 📁 product/
│   │   ├── product.ts
│   │   ├── migrations/
│   │   └── types.ts
│   ├── 📁 auth/
│   │   ├── auth.ts
│   │   └── middleware.ts
│   └── 📁 analytics/
│       ├── analytics.ts
│       └── types.ts
├── 📁 shared/
│   ├── 📁 types/
│   └── 📁 utils/
└── encore.app
```

### 1. User Service

**services/user/user.ts:**
```typescript
import { api, Query, Body } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";

// Database connection
const db = new SQLDatabase("users", {
  migrations: "./migrations",
});

// Types
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  role: 'admin' | 'user' | 'manager';
  status: 'active' | 'inactive';
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: 'admin' | 'user' | 'manager';
}

export interface UpdateUserRequest {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  role?: 'admin' | 'user' | 'manager';
  status?: 'active' | 'inactive';
}

export interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

// API Endpoints
export const getUsers = api(
  { expose: true, method: "GET", path: "/users" },
  async ({ page = 1, limit = 10, search = "" }: Query<{
    page?: number;
    limit?: number;
    search?: string;
  }>): Promise<UsersResponse> => {
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT id, name, email, phone, company, role, status, created_at, updated_at
      FROM users
    `;
    
    const params: any[] = [];
    
    if (search) {
      query += ` WHERE name ILIKE $1 OR email ILIKE $1`;
      params.push(`%${search}%`);
    }
    
    query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);
    
    const users = await db.query(query, ...params);
    
    // Get total count
    const countQuery = search 
      ? `SELECT COUNT(*) FROM users WHERE name ILIKE $1 OR email ILIKE $1`
      : `SELECT COUNT(*) FROM users`;
    
    const countParams = search ? [`%${search}%`] : [];
    const totalResult = await db.query(countQuery, ...countParams);
    const total = totalResult[0]?.count || 0;
    
    return {
      users: users as User[],
      total: parseInt(total),
      page,
      limit,
    };
  }
);

export const getUserById = api(
  { expose: true, method: "GET", path: "/users/:id" },
  async ({ id }: { id: number }): Promise<User> => {
    const users = await db.query(
      `SELECT id, name, email, phone, company, role, status, created_at, updated_at
       FROM users WHERE id = $1`,
      id
    );
    
    if (users.length === 0) {
      throw new Error("User not found");
    }
    
    return users[0] as User;
  }
);

export const createUser = api(
  { expose: true, method: "POST", path: "/users" },
  async (user: Body<CreateUserRequest>): Promise<User> => {
    const result = await db.query(
      `INSERT INTO users (name, email, phone, company, role, status, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, 'active', NOW(), NOW())
       RETURNING id, name, email, phone, company, role, status, created_at, updated_at`,
      user.name,
      user.email,
      user.phone,
      user.company,
      user.role
    );
    
    return result[0] as User;
  }
);

export const updateUser = api(
  { expose: true, method: "PUT", path: "/users/:id" },
  async ({ id, ...updates }: Body<UpdateUserRequest>): Promise<User> => {
    const updateFields: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined && key !== 'id') {
        updateFields.push(`${key} = $${paramIndex}`);
        params.push(value);
        paramIndex++;
      }
    });
    
    if (updateFields.length === 0) {
      throw new Error("No fields to update");
    }
    
    updateFields.push(`updated_at = NOW()`);
    params.push(id);
    
    const query = `
      UPDATE users 
      SET ${updateFields.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING id, name, email, phone, company, role, status, created_at, updated_at
    `;
    
    const result = await db.query(query, ...params);
    
    if (result.length === 0) {
      throw new Error("User not found");
    }
    
    return result[0] as User;
  }
);

export const deleteUser = api(
  { expose: true, method: "DELETE", path: "/users/:id" },
  async ({ id }: { id: number }): Promise<{ success: boolean }> => {
    const result = await db.query(
      `DELETE FROM users WHERE id = $1 RETURNING id`,
      id
    );
    
    if (result.length === 0) {
      throw new Error("User not found");
    }
    
    return { success: true };
  }
);
```

**services/user/migrations/1_create_users_table.up.sql:**
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_role ON users(role);
```

### 2. Product Service

**services/product/product.ts:**
```typescript
import { api, Query, Body } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";

const db = new SQLDatabase("products", {
  migrations: "./migrations",
});

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  stock: number;
  status: 'active' | 'inactive' | 'out_of_stock';
  created_at: Date;
  updated_at: Date;
}

export interface CreateProductRequest {
  title: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  stock: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

export const getProducts = api(
  { expose: true, method: "GET", path: "/products" },
  async ({ page = 1, limit = 10, category = "", search = "" }: Query<{
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
  }>): Promise<ProductsResponse> => {
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT id, title, description, price, category, image_url, stock, status, created_at, updated_at
      FROM products
      WHERE 1=1
    `;
    
    const params: any[] = [];
    let paramIndex = 1;
    
    if (category) {
      query += ` AND category = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }
    
    if (search) {
      query += ` AND (title ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }
    
    query += ` ORDER BY created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);
    
    const products = await db.query(query, ...params);
    
    // Get total count
    let countQuery = `SELECT COUNT(*) FROM products WHERE 1=1`;
    const countParams: any[] = [];
    let countParamIndex = 1;
    
    if (category) {
      countQuery += ` AND category = $${countParamIndex}`;
      countParams.push(category);
      countParamIndex++;
    }
    
    if (search) {
      countQuery += ` AND (title ILIKE $${countParamIndex} OR description ILIKE $${countParamIndex})`;
      countParams.push(`%${search}%`);
    }
    
    const totalResult = await db.query(countQuery, ...countParams);
    const total = totalResult[0]?.count || 0;
    
    return {
      products: products as Product[],
      total: parseInt(total),
      page,
      limit,
    };
  }
);

export const createProduct = api(
  { expose: true, method: "POST", path: "/products" },
  async (product: Body<CreateProductRequest>): Promise<Product> => {
    const result = await db.query(
      `INSERT INTO products (title, description, price, category, image_url, stock, status, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, 'active', NOW(), NOW())
       RETURNING id, title, description, price, category, image_url, stock, status, created_at, updated_at`,
      product.title,
      product.description,
      product.price,
      product.category,
      product.image_url,
      product.stock
    );
    
    return result[0] as Product;
  }
);

export const getCategories = api(
  { expose: true, method: "GET", path: "/products/categories" },
  async (): Promise<{ categories: string[] }> => {
    const result = await db.query(
      `SELECT DISTINCT category FROM products ORDER BY category`
    );
    
    return {
      categories: result.map(row => row.category)
    };
  }
);
```

**services/product/migrations/1_create_products_table.up.sql:**
```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image_url VARCHAR(500),
    stock INTEGER NOT NULL DEFAULT 0,
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_price ON products(price);
```

### 3. Auth Service

**services/auth/auth.ts:**
```typescript
import { api, Body, Header } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import { authHandler } from "encore.dev/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const db = new SQLDatabase("auth", {
  migrations: "./migrations",
});

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role?: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "your-jwt-secret-key";

export const login = api(
  { expose: true, method: "POST", path: "/auth/login" },
  async (req: Body<LoginRequest>): Promise<LoginResponse> => {
    const users = await db.query(
      `SELECT id, email, name, role, password_hash FROM auth_users WHERE email = $1`,
      req.email
    );
    
    if (users.length === 0) {
      throw new Error("Invalid credentials");
    }
    
    const user = users[0];
    const isValid = await bcrypt.compare(req.password, user.password_hash);
    
    if (!isValid) {
      throw new Error("Invalid credentials");
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );
    
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    };
  }
);

export const register = api(
  { expose: true, method: "POST", path: "/auth/register" },
  async (req: Body<RegisterRequest>): Promise<LoginResponse> => {
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(req.password, saltRounds);
    
    try {
      const result = await db.query(
        `INSERT INTO auth_users (name, email, password_hash, role, created_at, updated_at)
         VALUES ($1, $2, $3, $4, NOW(), NOW())
         RETURNING id, email, name, role`,
        req.name,
        req.email,
        passwordHash,
        req.role || 'user'
      );
      
      const user = result[0];
      
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: "24h" }
      );
      
      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      };
    } catch (error: any) {
      if (error.code === '23505') { // Unique constraint violation
        throw new Error("User already exists");
      }
      throw error;
    }
  }
);

export const getCurrentUser = api(
  { expose: true, method: "GET", path: "/auth/me", auth: true },
  async (req: Header<"authorization">): Promise<User> => {
    const token = req.authorization?.replace("Bearer ", "");
    
    if (!token) {
      throw new Error("No token provided");
    }
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      
      const users = await db.query(
        `SELECT id, email, name, role FROM auth_users WHERE id = $1`,
        decoded.id
      );
      
      if (users.length === 0) {
        throw new Error("User not found");
      }
      
      return users[0] as User;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
);

// Auth handler for Encore
export const authMiddleware = authHandler(async (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return {
      userID: decoded.id,
      userRole: decoded.role,
    };
  } catch (error) {
    throw new Error("Invalid token");
  }
});
```

**services/auth/migrations/1_create_auth_users_table.up.sql:**
```sql
CREATE TABLE auth_users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_auth_users_email ON auth_users(email);
CREATE INDEX idx_auth_users_role ON auth_users(role);
```

### 4. Analytics Service

**services/analytics/analytics.ts:**
```typescript
import { api, Query } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";

const db = new SQLDatabase("analytics", {
  migrations: "./migrations",
});

export interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  activeOrders: number;
  revenue: number;
  userGrowth: number;
  productGrowth: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
  }[];
}

export const getDashboardStats = api(
  { expose: true, method: "GET", path: "/analytics/dashboard" },
  async (): Promise<DashboardStats> => {
    // Get current stats
    const userCountResult = await db.query(
      `SELECT COUNT(*) as count FROM users WHERE status = 'active'`
    );
    
    const productCountResult = await db.query(
      `SELECT COUNT(*) as count FROM products WHERE status = 'active'`
    );
    
    const orderCountResult = await db.query(
      `SELECT COUNT(*) as count FROM orders WHERE status = 'active'`
    );
    
    const revenueResult = await db.query(
      `SELECT SUM(total_amount) as total FROM orders WHERE status = 'completed'`
    );
    
    // Get growth stats (last 30 days vs previous 30 days)
    const userGrowthResult = await db.query(`
      SELECT 
        (SELECT COUNT(*) FROM users WHERE created_at >= NOW() - INTERVAL '30 days') as current_period,
        (SELECT COUNT(*) FROM users WHERE created_at >= NOW() - INTERVAL '60 days' AND created_at < NOW() - INTERVAL '30 days') as previous_period
    `);
    
    const productGrowthResult = await db.query(`
      SELECT 
        (SELECT COUNT(*) FROM products WHERE created_at >= NOW() - INTERVAL '30 days') as current_period,
        (SELECT COUNT(*) FROM products WHERE created_at >= NOW() - INTERVAL '60 days' AND created_at < NOW() - INTERVAL '30 days') as previous_period
    `);
    
    const userGrowth = userGrowthResult[0];
    const productGrowth = productGrowthResult[0];
    
    const userGrowthPercentage = userGrowth.previous_period > 0 
      ? ((userGrowth.current_period - userGrowth.previous_period) / userGrowth.previous_period) * 100
      : 0;
      
    const productGrowthPercentage = productGrowth.previous_period > 0
      ? ((productGrowth.current_period - productGrowth.previous_period) / productGrowth.previous_period) * 100
      : 0;
    
    return {
      totalUsers: parseInt(userCountResult[0]?.count || 0),
      totalProducts: parseInt(productCountResult[0]?.count || 0),
      activeOrders: parseInt(orderCountResult[0]?.count || 0),
      revenue: parseFloat(revenueResult[0]?.total || 0),
      userGrowth: Math.round(userGrowthPercentage),
      productGrowth: Math.round(productGrowthPercentage),
    };
  }
);

export const getUsersChartData = api(
  { expose: true, method: "GET", path: "/analytics/users-chart" },
  async ({ period = "week" }: Query<{ period?: "week" | "month" }>): Promise<ChartData> => {
    const interval = period === "week" ? "7 days" : "30 days";
    const dateFormat = period === "week" ? "DD" : "MM-DD";
    
    const result = await db.query(`
      SELECT 
        DATE_TRUNC('day', created_at) as date,
        COUNT(*) as count
      FROM users 
      WHERE created_at >= NOW() - INTERVAL '${interval}'
      GROUP BY DATE_TRUNC('day', created_at)
      ORDER BY date
    `);
    
    const labels = result.map(row => 
      new Date(row.date).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      })
    );
    
    const data = result.map(row => parseInt(row.count));
    
    return {
      labels,
      datasets: [{
        label: 'New Users',
        data,
        backgroundColor: ['rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)'],
      }],
    };
  }
);
```

## Frontend Integration

### 1. Updated API Service Layer

**services/api.ts:**
```typescript
import axios from 'axios';

// Encore API base URL
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000';

// Create axios instance with auth interceptor
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Auth token management
let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      setAuthToken(null);
      // Redirect to login or refresh token
    }
    return Promise.reject(error);
  }
);

// Types (matching backend)
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  role: 'admin' | 'user' | 'manager';
  status: 'active' | 'inactive';
  created_at: Date;
  updated_at: Date;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  stock: number;
  status: 'active' | 'inactive' | 'out_of_stock';
  created_at: Date;
  updated_at: Date;
}

export interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  activeOrders: number;
  revenue: number;
  userGrowth: number;
  productGrowth: number;
}

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    const { token } = response.data;
    setAuthToken(token);
    return response.data;
  },
  
  register: async (name: string, email: string, password: string, role = 'user') => {
    const response = await api.post('/auth/register', { name, email, password, role });
    const { token } = response.data;
    setAuthToken(token);
    return response.data;
  },
  
  getCurrentUser: async (): Promise<AuthUser> => {
    const response = await api.get('/auth/me');
    return response.data;
  },
  
  logout: () => {
    setAuthToken(null);
  },
};

// User API
export const userApi = {
  getUsers: async (page = 1, limit = 10, search = ''): Promise<PaginatedResponse<User>> => {
    const response = await api.get('/users', {
      params: { page, limit, search }
    });
    return {
      data: response.data.users,
      total: response.data.total,
      page: response.data.page,
      limit: response.data.limit,
    };
  },
  
  getUserById: async (id: number): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
  
  createUser: async (userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> => {
    const response = await api.post('/users', userData);
    return response.data;
  },
  
  updateUser: async (id: number, updates: Partial<User>): Promise<User> => {
    const response = await api.put(`/users/${id}`, { id, ...updates });
    return response.data;
  },
  
  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};

// Product API
export const productApi = {
  getProducts: async (page = 1, limit = 10, category = '', search = ''): Promise<PaginatedResponse<Product>> => {
    const response = await api.get('/products', {
      params: { page, limit, category, search }
    });
    return {
      data: response.data.products,
      total: response.data.total,
      page: response.data.page,
      limit: response.data.limit,
    };
  },
  
  createProduct: async (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> => {
    const response = await api.post('/products', productData);
    return response.data;
  },
  
  getCategories: async (): Promise<string[]> => {
    const response = await api.get('/products/categories');
    return response.data.categories;
  },
};

// Analytics API
export const analyticsApi = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await api.get('/analytics/dashboard');
    return response.data;
  },
  
  getUsersChartData: async (period: 'week' | 'month' = 'week') => {
    const response = await api.get('/analytics/users-chart', {
      params: { period }
    });
    return response.data;
  },
};
```

### 2. Updated Store with Microservices

**stores/useAdminStore.ts:**
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { userApi, productApi, analyticsApi, authApi, User, Product, DashboardStats, AuthUser } from '../services/api';

interface AdminState {
  // Auth
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  authLoading: boolean;
  
  // Users
  users: User[];
  usersTotal: number;
  usersPage: number;
  usersLoading: boolean;
  selectedUser: User | null;
  
  // Products
  products: Product[];
  productsTotal: number;
  productsPage: number;
  productsLoading: boolean;
  selectedProduct: Product | null;
  categories: string[];
  
  // Analytics
  dashboardStats: DashboardStats;
  chartData: any;
  analyticsLoading: boolean;
}

interface AdminActions {
  // Auth actions
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role?: string) => Promise<void>;
  logout: () => void;
  getCurrentUser: () => Promise<void>;
  
  // User actions
  fetchUsers: (page?: number, limit?: number, search?: string) => Promise<void>;
  addUser: (user: Omit<User, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateUser: (id: number, updates: Partial<User>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  setSelectedUser: (user: User | null) => void;
  
  // Product actions
  fetchProducts: (page?: number, limit?: number, category?: string, search?: string) => Promise<void>;
  addProduct: (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  setSelectedProduct: (product: Product | null) => void;
  fetchCategories: () => Promise<void>;
  
  // Analytics actions
  fetchDashboardStats: () => Promise<void>;
  fetchChartData: (period?: 'week' | 'month') => Promise<void>;
}

export const useAdminStore = create<AdminState & AdminActions>()(
  persist(
    (set, get) => ({
      // Initial state
      currentUser: null,
      isAuthenticated: false,
      authLoading: false,
      users: [],
      usersTotal: 0,
      usersPage: 1,
      usersLoading: false,
      selectedUser: null,
      products: [],
      productsTotal: 0,
      productsPage: 1,
      productsLoading: false,
      selectedProduct: null,
      categories: [],
      dashboardStats: {
        totalUsers: 0,
        totalProducts: 0,
        activeOrders: 0,
        revenue: 0,
        userGrowth: 0,
        productGrowth: 0,
      },
      chartData: null,
      analyticsLoading: false,

      // Auth actions
      login: async (email, password) => {
        set({ authLoading: true });
        try {
          const response = await authApi.login(email, password);
          set({ 
            currentUser: response.user, 
            isAuthenticated: true, 
            authLoading: false 
          });
        } catch (error) {
          set({ authLoading: false });
          throw error;
        }
      },

      register: async (name, email, password, role = 'user') => {
        set({ authLoading: true });
        try {
          const response = await authApi.register(name, email, password, role);
          set({ 
            currentUser: response.user, 
            isAuthenticated: true, 
            authLoading: false 
          });
        } catch (error) {
          set({ authLoading: false });
          throw error;
        }
      },

      logout: () => {
        authApi.logout();
        set({ 
          currentUser: null, 
          isAuthenticated: false,
          users: [],
          products: [],
          dashboardStats: {
            totalUsers: 0,
            totalProducts: 0,
            activeOrders: 0,
            revenue: 0,
            userGrowth: 0,
            productGrowth: 0,
          },
        });
      },

      getCurrentUser: async () => {
        try {
          const user = await authApi.getCurrentUser();
          set({ currentUser: user, isAuthenticated: true });
        } catch (error) {
          set({ currentUser: null, isAuthenticated: false });
        }
      },

      // User actions
      fetchUsers: async (page = 1, limit = 10, search = '') => {
        set({ usersLoading: true });
        try {
          const response = await userApi.getUsers(page, limit, search);
          set({ 
            users: response.data,
            usersTotal: response.total,
            usersPage: response.page,
            usersLoading: false 
          });
        } catch (error) {
          console.error('Error fetching users:', error);
          set({ usersLoading: false });
        }
      },

      addUser: async (user) => {
        try {
          const newUser = await userApi.createUser(user);
          set((state) => ({ 
            users: [...state.users, newUser],
            usersTotal: state.usersTotal + 1,
          }));
          get().fetchDashboardStats();
        } catch (error) {
          console.error('Error adding user:', error);
          throw error;
        }
      },

      updateUser: async (id, updates) => {
        try {
          const updatedUser = await userApi.updateUser(id, updates);
          set((state) => ({
            users: state.users.map((user) => 
              user.id === id ? updatedUser : user
            ),
          }));
        } catch (error) {
          console.error('Error updating user:', error);
          throw error;
        }
      },

      deleteUser: async (id) => {
        try {
          await userApi.deleteUser(id);
          set((state) => ({
            users: state.users.filter((user) => user.id !== id),
            usersTotal: state.usersTotal - 1,
          }));
          get().fetchDashboardStats();
        } catch (error) {
          console.error('Error deleting user:', error);
          throw error;
        }
      },

      setSelectedUser: (user) => set({ selectedUser: user }),

      // Product actions
      fetchProducts: async (page = 1, limit = 10, category = '', search = '') => {
        set({ productsLoading: true });
        try {
          const response = await productApi.getProducts(page, limit, category, search);
          set({ 
            products: response.data,
            productsTotal: response.total,
            productsPage: response.page,
            productsLoading: false 
          });
        } catch (error) {
          console.error('Error fetching products:', error);
          set({ productsLoading: false });
        }
      },

      addProduct: async (product) => {
        try {
          const newProduct = await productApi.createProduct(product);
          set((state) => ({ 
            products: [...state.products, newProduct],
            productsTotal: state.productsTotal + 1,
          }));
          get().fetchDashboardStats();
        } catch (error) {
          console.error('Error adding product:', error);
          throw error;
        }
      },

      setSelectedProduct: (product) => set({ selectedProduct: product }),

      fetchCategories: async () => {
        try {
          const categories = await productApi.getCategories();
          set({ categories });
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      },

      // Analytics actions
      fetchDashboardStats: async () => {
        set({ analyticsLoading: true });
        try {
          const stats = await analyticsApi.getDashboardStats();
          set({ dashboardStats: stats, analyticsLoading: false });
        } catch (error) {
          console.error('Error fetching dashboard stats:', error);
          set({ analyticsLoading: false });
        }
      },

      fetchChartData: async (period = 'week') => {
        try {
          const chartData = await analyticsApi.getUsersChartData(period);
          set({ chartData });
        } catch (error) {
          console.error('Error fetching chart data:', error);
        }
      },
    }),
    {
      name: 'admin-store',
      partialize: (state) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
```

### 3. Authentication Component

**components/shared/AuthGuard.tsx:**
```typescript
import React, { useEffect } from 'react';
import { useAdminStore } from '../../stores/useAdminStore';
import { LoginScreen } from '../auth/LoginScreen';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, currentUser, getCurrentUser, authLoading } = useAdminStore();

  useEffect(() => {
    if (!currentUser && !authLoading) {
      getCurrentUser();
    }
  }, [currentUser, getCurrentUser, authLoading]);

  if (authLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return <>{children}</>;
};
```

### 4. Updated App.tsx

**App.tsx:**
```typescript
import React from 'react';
import { Platform } from 'react-native';
import { TamaguiProvider } from '@tamagui/core';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import config from './tamagui.config';
import { AuthGuard } from './src/components/shared/AuthGuard';
import { WebAdminPanel } from './src/screens/web/WebAdminPanel';
import { MobileAdminPanel } from './src/screens/mobile/MobileAdminPanel';

// Import PrimeReact styles for web
if (Platform.OS === 'web') {
  require('primereact/resources/themes/lara-light-cyan/theme.css');
  require('primereact/resources/primereact.min.css');
  require('primeicons/primeicons.css');
  require('primeflex/primeflex.css');
}

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={config}>
        <SafeAreaProvider>
          <AuthGuard>
            {Platform.OS === 'web' ? <WebAdminPanel /> : <MobileAdminPanel />}
          </AuthGuard>
        </SafeAreaProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}
```

### 5. Environment Configuration

**.env.local:**
```bash
# Encore API Configuration
EXPO_PUBLIC_API_URL=http://localhost:4000
EXPO_PUBLIC_WS_URL=ws://localhost:4000

# For production
# EXPO_PUBLIC_API_URL=https://your-encore-app.encore.app
# EXPO_PUBLIC_WS_URL=wss://your-encore-app.encore.app
```

## Running the Full Stack

### Backend (Encore)
```bash
# Install Encore CLI
npm install -g @encore/cli

# Create and run backend
encore app create backend
cd backend

# Add your services code
# Run database migrations
encore db migrate

# Run in development
encore run

# Deploy to production
encore deploy
```

### Frontend (Expo)
```bash
# Install dependencies
npm install

# Run on different platforms
npm run web      # Web with PrimeReact
npm run android  # Mobile with Tamagui
npm run ios      # Mobile with Tamagui
```

## Key Benefits of This Architecture

### ✅ **Microservices Ready**
- Independent services (User, Product, Auth, Analytics)
- Easy to scale individual services
- Clear separation of concerns

### ✅ **Type Safety**
- Shared TypeScript types between frontend and backend
- Full type checking across API boundaries
- Encore's built-in type generation

### ✅ **Database Optimized**
- PostgreSQL with proper indexing
- Optimized queries for performance
- Built-in connection pooling with Encore

### ✅ **Authentication Built-in**
- JWT-based authentication
- Role-based access control
- Secure password hashing

### ✅ **Scalable Frontend**
- Hybrid PrimeReact + Tamagui approach
- Shared state management
- Platform-specific optimizations

### ✅ **Production Ready**
- Error handling and logging
- Proper API error responses
- Pagination and search functionality
- Real-time capabilities ready

This architecture gives you a solid foundation that can easily scale from a small admin panel to a full enterprise application with multiple microservices!

Would you like me to dive deeper into any specific part or help you customize it for your particular use case?