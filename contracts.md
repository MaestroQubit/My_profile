# Portfolio Website API Contracts

## Overview
This document outlines the API contracts for Chirag Kumar's portfolio website backend integration.

## Current Mock Data Location
- **File**: `/app/frontend/src/data/mock.js`
- **Content**: Personal information, skills, projects, education, achievements, contact details

## Backend Models Required

### 1. Contact Message Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  subject: String (required),
  message: String (required),
  timestamp: Date (default: now),
  status: String (enum: ['new', 'read', 'replied'], default: 'new')
}
```

### 2. Portfolio Data Model (Optional - for dynamic content)
```javascript
{
  _id: ObjectId,
  name: String,
  title: String,
  tagline: String,
  about: Object,
  skills: Object,
  projects: Array,
  education: Array,
  achievements: Array,
  contact: Object,
  lastUpdated: Date
}
```

## API Endpoints to Implement

### Contact Form Endpoints

#### POST /api/contact
- **Purpose**: Submit contact form message
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string", 
    "subject": "string",
    "message": "string"
  }
  ```
- **Response**: 
  ```json
  {
    "success": true,
    "message": "Message sent successfully",
    "data": { contactMessage }
  }
  ```
- **Error Response**:
  ```json
  {
    "success": false,
    "message": "Error message",
    "errors": ["validation errors"]
  }
  ```

#### GET /api/contact/messages (Admin only - future)
- **Purpose**: Retrieve all contact messages
- **Response**: Array of contact messages

### Portfolio Data Endpoints (Optional)

#### GET /api/portfolio
- **Purpose**: Get portfolio data (if we want dynamic content)
- **Response**: Portfolio data object

## Frontend Integration Plan

### Files to Update:
1. `/app/frontend/src/components/Contact.jsx`
   - Replace mock toast with actual API call
   - Add proper error handling
   - Show loading states

### Integration Steps:

#### 1. Contact Form Integration
- Remove mock data handling from Contact component
- Add API call to `/api/contact` endpoint
- Handle success/error responses properly
- Add loading spinner during submission

#### 2. Error Handling
- Add proper form validation
- Display backend error messages
- Handle network errors gracefully

## Current Mock Implementation to Replace

### In Contact.jsx:
```javascript
// CURRENT MOCK CODE (to be replaced):
const handleSubmit = (e) => {
  e.preventDefault();
  // Mock form submission
  toast({
    title: "Message Sent!",
    description: "Thanks for reaching out! I'll get back to you soon.",
  });
  setFormData({ name: '', email: '', subject: '', message: '' });
};
```

### Will be replaced with:
```javascript
// NEW BACKEND INTEGRATION:
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    const response = await axios.post(`${API}/contact`, formData);
    toast({
      title: "Message Sent!",
      description: response.data.message,
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  } catch (error) {
    toast({
      title: "Error",
      description: error.response?.data?.message || "Failed to send message",
      variant: "destructive"
    });
  } finally {
    setIsSubmitting(false);
  }
};
```

## Database Collections

### 1. contact_messages
- Stores all contact form submissions
- Used for tracking inquiries and follow-ups

### 2. portfolio_data (Optional)
- Stores dynamic portfolio content
- Allows for future admin panel to update content

## Validation Rules

### Contact Form:
- **name**: Required, min 2 characters, max 100 characters
- **email**: Required, valid email format
- **subject**: Required, min 5 characters, max 200 characters  
- **message**: Required, min 10 characters, max 2000 characters

## Security Considerations
- Input validation and sanitization
- Rate limiting for contact form (prevent spam)
- CORS configuration for frontend domain
- Basic error handling without exposing sensitive information

## Testing Plan
1. Test contact form submission with valid data
2. Test validation errors with invalid data
3. Test error handling for network issues
4. Verify database storage of messages
5. Test API response formats match frontend expectations