# Review&RATE - Full Stack Application Plan

## 📋 Project Overview
A full-stack MERN application for reviewing and rating companies with location-based search and filtering capabilities.

## 🎯 Core Features

### 1. Company Listing Page (Home)
- **Search Bar**: Global search across companies
- **City Selector**: Dropdown/input for location filtering with map pin icon
- **Find Company Button**: Triggers search based on filters
- **Add Company Button**: Opens modal to add new company
- **Sort Dropdown**: Sort by Name, Average Rating, or Location
- **Company Cards Display**:
  - Company logo/avatar with colored background
  - Company name
  - Full address
  - Star rating (4.5 with half stars)
  - Review count (e.g., "41 Reviews")
  - Founded/Registration date
  - "Detail Review" button

### 2. Company Detail Page
- **Company Header**:
  - Logo, name, address
  - Average rating and total reviews
  - Founded date
  - "+ Add Review" button (purple)
- **Reviews List**:
  - User avatar
  - User name
  - Review date and time
  - Star rating (1-5 stars)
  - Review text content
  - Results count display

### 3. Add Review Modal
- **Decorative gradient blob** (purple/blue) in top-left
- **Form Fields**:
  - Full Name (text input)
  - Subject (text input)
  - Enter your Review (textarea with placeholder "Description")
  - Star rating selector (1-5 stars, interactive)
  - Rating label ("Satisfied" shown for 4 stars)
- **Save button** (purple)
- **Close button** (X in top-right)

### 4. Add Company Modal
- **Decorative gradient blob** (purple/blue) in top-left
- **Form Fields**:
  - Company name (text input)
  - Location (dropdown with map pin icon, "Select Location")
  - Founded on (date picker with calendar icon, "DD/MM/YYYY")
  - City (text input)
- **Save button** (purple)
- **Close button** (X in top-right)

## 🎨 Design System

### Color Palette
- **Primary Purple**: `#8B00FF` (buttons, branding)
- **Dark Navy**: `#1A1F3D` (company logo backgrounds)
- **Dark Gray**: `#2D2D2D` (Detail Review buttons)
- **Light Gray**: `#F5F5F5` (backgrounds)
- **White**: `#FFFFFF` (cards, modals)
- **Green**: `#4CAF50` (Code Tech Company logo)
- **Orange**: `#FF8C00` (Innogent logo)
- **Star Gold**: `#FFB400` (ratings)

### Typography
- **Logo Font**: Bold, mixed case ("Review&RATE" with RATE in bold)
- **Headings**: Bold, clean sans-serif
- **Body**: Regular weight, readable font
- **Buttons**: Bold text

### UI Elements
- **Buttons**: Rounded corners, purple primary color, white text
- **Input Fields**: Light border, rounded corners, placeholder text
- **Cards**: White background, subtle shadow, rounded corners
- **Modal Backdrop**: Semi-transparent gray overlay
- **Dropdowns**: Custom styled with icons

## 🏗️ Technical Architecture

### Frontend (React + Vite)
```
client/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Header.jsx
│   │   │   └── Navbar.jsx
│   │   ├── Company/
│   │   │   ├── CompanyCard.jsx
│   │   │   ├── CompanyList.jsx
│   │   │   └── CompanyDetail.jsx
│   │   ├── Review/
│   │   │   ├── ReviewCard.jsx
│   │   │   ├── ReviewList.jsx
│   │   │   └── StarRating.jsx
│   │   ├── Modal/
│   │   │   ├── AddCompanyModal.jsx
│   │   │   └── AddReviewModal.jsx
│   │   └── Common/
│   │       ├── SearchBar.jsx
│   │       ├── CitySelector.jsx
│   │       ├── SortDropdown.jsx
│   │       └── Button.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   └── CompanyDetailPage.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── companyService.js
│   │   └── reviewService.js
│   ├── context/
│   │   └── AppContext.jsx
│   ├── hooks/
│   │   ├── useCompanies.js
│   │   └── useReviews.js
│   ├── utils/
│   │   ├── dateFormatter.js
│   │   └── validators.js
│   ├── styles/
│   │   ├── index.css
│   │   └── components/
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── index.html
```

### Backend (Node.js + Express)
```
server/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── env.js
│   ├── models/
│   │   ├── Company.js
│   │   └── Review.js
│   ├── controllers/
│   │   ├── companyController.js
│   │   └── reviewController.js
│   ├── routes/
│   │   ├── companyRoutes.js
│   │   └── reviewRoutes.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── validator.js
│   ├── utils/
│   │   └── helpers.js
│   └── server.js
├── package.json
└── .env
```

## 📊 Data Models

### Company Schema
```javascript
{
  name: String (required),
  logo: String (URL or color code),
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  location: String (formatted address),
  city: String,
  foundedDate: Date,
  averageRating: Number (calculated),
  reviewCount: Number (calculated),
  createdAt: Date,
  updatedAt: Date
}
```

### Review Schema
```javascript
{
  companyId: ObjectId (ref: Company),
  userName: String (required),
  subject: String (required),
  reviewText: String (required),
  rating: Number (1-5, required),
  date: Date (default: now),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔌 API Endpoints

### Companies
- `GET /api/companies` - Get all companies (with filters, sort, search)
  - Query params: `city`, `search`, `sortBy` (name|rating|location)
- `GET /api/companies/:id` - Get single company with details
- `POST /api/companies` - Create new company
- `PUT /api/companies/:id` - Update company
- `DELETE /api/companies/:id` - Delete company

### Reviews
- `GET /api/reviews?companyId=xxx` - Get reviews for a company
- `GET /api/reviews/:id` - Get single review
- `POST /api/reviews` - Create new review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

## 🚀 Implementation Steps

### Phase 1: Project Setup (Current)
1. ✅ Analyze requirements and create plan
2. Initialize frontend (Vite + React + TypeScript)
3. Initialize backend (Express + MongoDB)
4. Set up folder structure
5. Install dependencies

### Phase 2: Backend Development
1. Configure MongoDB connection
2. Create Mongoose models (Company, Review)
3. Build REST API endpoints
4. Add validation middleware
5. Implement error handling
6. Test APIs with Postman/Thunder Client

### Phase 3: Frontend Core
1. Set up routing (React Router)
2. Create layout components (Header, Navbar)
3. Build reusable components (Button, Input, Modal)
4. Implement Star Rating component
5. Set up API service layer
6. Configure Axios/Fetch

### Phase 4: Features Implementation
1. **Home Page**:
   - Company list with cards
   - Search functionality
   - City filter
   - Sort dropdown
   - Add Company modal
2. **Detail Page**:
   - Company information display
   - Review list
   - Add Review modal
3. **State Management**: Context API or Zustand

### Phase 5: Styling & Polish
1. Implement design system
2. Add responsive design
3. Implement loading states
4. Add error messages & validation
5. Polish animations and transitions

### Phase 6: Testing & Deployment
1. Test all features end-to-end
2. Fix bugs and edge cases
3. Optimize performance
4. Prepare deployment documentation
5. Deploy (Frontend: Vercel/Netlify, Backend: Render/Railway)

## 📦 Dependencies

### Frontend
- `react` - UI library
- `react-dom` - React DOM renderer
- `react-router-dom` - Routing
- `axios` - HTTP client
- `date-fns` - Date formatting
- `react-icons` - Icon library

### Backend
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `cors` - CORS middleware
- `dotenv` - Environment variables
- `express-validator` - Request validation
- `nodemon` (dev) - Auto-restart server

## 🎯 Key Features to Highlight
- ✨ Real-time search and filtering
- 🎨 Modern, clean UI design
- ⭐ Interactive star rating system
- 📱 Responsive design
- 🔄 Dynamic sorting
- 🗂️ RESTful API architecture
- 💾 MongoDB data persistence
- 🎭 Modal-based interactions

---

**Ready to start implementation!** 🚀
