# MongoDB Atlas Setup Guide for iVidhyarthi Project

## Step 1: Create MongoDB Atlas Account (FREE)

1. **Go to MongoDB Atlas**: Visit [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas)
2. **Sign Up**: Click "Try Free" and create your account
3. **Choose FREE Tier**: Select "Shared" (M0 Sandbox) - **COMPLETELY FREE**
   - 512 MB Storage
   - Shared RAM
   - No time limit
   - Perfect for development and small projects

## Step 2: Create Your Database Cluster

1. **Create Cluster**: Click "Create" button
2. **Choose Provider**: Select any cloud provider (AWS, Google Cloud, or Azure)
3. **Choose Region**: Select closest region to India (e.g., Mumbai, Singapore)
4. **Cluster Name**: Keep default or name it "iVidhyarthi-Cluster"
5. **Click "Create Cluster"** (takes 3-5 minutes)

## Step 3: Configure Database Access

### Create Database User:
1. Go to **Database Access** in left sidebar
2. Click **"Add New Database User"**
3. **Authentication Method**: Password
4. **Username**: `ividhyarthi_user`
5. **Password**: Generate secure password (save it!)
6. **Database User Privileges**: Select "Read and write to any database"
7. Click **"Add User"**

### Configure Network Access:
1. Go to **Network Access** in left sidebar
2. Click **"Add IP Address"**
3. **For Development**: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. **For Production**: Add your specific IP address
5. Click **"Confirm"**

## Step 4: Get Connection String

1. Go to **Clusters** in left sidebar
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. **Driver**: Node.js
5. **Version**: 4.1 or later
6. **Copy the connection string** - it looks like:
   ```
   mongodb+srv://ividhyarthi_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 5: Update Your .env File

1. Open `backend/.env` file
2. Replace the MongoDB URI with your connection string:
   ```env
   MONGODB_URI=mongodb+srv://ividhyarthi_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ividhyarthi?retryWrites=true&w=majority
   ```
3. Replace `<password>` with your actual password
4. Replace `xxxxx` with your cluster identifier
5. Add database name `ividhyarthi` at the end

## Step 6: Start Your Backend Server

1. Open terminal in `backend` folder
2. Run: `npm start` or `npm run dev`
3. You should see:
   ```
   ✅ MongoDB Connected Successfully
   ✅ GridFS Initialized
   🚀 Server running on port 5000
   ```

## Step 7: Test Database Connection

1. Open browser and go to: `http://localhost:5000/api/health`
2. You should see:
   ```json
   {
     "status": "OK",
     "message": "iVidhyarthi Backend Server is running",
     "database": "Connected"
   }
   ```

## Database Tables (Collections) Created:

### 1. **users** (tbl_user equivalent)
- **Fields**: name, email, password, phone, dateOfBirth, gender, address, education, enrolledCourses, paymentHistory, preferences
- **Features**: Authentication, profile management, course enrollment tracking

### 2. **courses** 
- **Fields**: name, description, instructor, category, price, rating, modules, videos, images
- **Features**: Course management, video/image storage via GridFS

### 3. **uploads** (GridFS for files)
- **Purpose**: Store videos and images
- **Features**: Automatic file chunking, metadata storage, streaming support

## API Endpoints Available:

### Authentication:
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Courses:
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create course (admin)
- `GET /api/courses/:id` - Get single course
- `POST /api/courses/:id/enroll` - Enroll in course

### File Upload:
- `POST /api/upload` - Upload video/image
- `GET /api/files/:id` - Get uploaded file
- `DELETE /api/files/:id` - Delete file

## How to Add Data:

### 1. **Add Users** (via Registration):
```javascript
// Frontend registration form will send:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210"
}
```

### 2. **Add Courses** (via Admin Panel):
```javascript
{
  "name": "React for Beginners",
  "description": "Learn React from scratch",
  "instructor": { "name": "Abha Ma'am" },
  "category": "Web Development",
  "price": 799,
  "level": "Beginner"
}
```

### 3. **Upload Files**:
- Use the FileUpload component in your React app
- Files are automatically stored in GridFS
- Returns file ID for linking to courses

## Database Management:

### View Data:
1. Go to MongoDB Atlas dashboard
2. Click **"Browse Collections"**
3. Select your database `ividhyarthi`
4. View/edit data in collections

### Backup:
- Atlas automatically backs up your data
- Free tier includes point-in-time recovery

## Security Features:

✅ **Password Hashing**: bcrypt with salt rounds
✅ **JWT Authentication**: Secure token-based auth
✅ **Input Validation**: Mongoose schema validation
✅ **Rate Limiting**: Prevent abuse
✅ **CORS Protection**: Cross-origin security

## Next Steps:

1. **Test Registration**: Create a user account
2. **Upload Files**: Test video/image upload
3. **Create Courses**: Add sample courses
4. **Test Enrollment**: Enroll users in courses
5. **Monitor Usage**: Check Atlas dashboard for metrics

## Troubleshooting:

**Connection Issues**:
- Check internet connection
- Verify IP whitelist in Network Access
- Confirm username/password in connection string

**File Upload Issues**:
- Check file size (max 50MB)
- Verify file types (images/videos only)
- Ensure GridFS is initialized

**Authentication Issues**:
- Check JWT_SECRET in .env
- Verify token format in requests
- Check user permissions

## Cost Information:

- **Current Setup**: 100% FREE
- **Storage**: 512MB included
- **Bandwidth**: Generous free tier limits
- **Upgrade**: Only when you need more storage/performance

Your database is now ready for production use! 🚀
