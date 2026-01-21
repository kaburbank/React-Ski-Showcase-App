# React Ski Showcase App

A modern, fully-featured React e-commerce application for browsing, managing, and purchasing ski equipment. Built with functional components, custom hooks, and Context API to demonstrate advanced React patterns and best practices.

## 🎯 Overview

The Ski Showcase App is a complete CRUD application that allows users to:
- Browse ski products with detailed specifications
- Search and filter skis by type and specifications
- Add new ski products to the catalog
- Edit existing product information
- Delete products with confirmation
- Persistent data storage via browser localStorage

The application showcases professional React development patterns including custom hooks, memoization, Context API, and comprehensive testing with React Testing Library.

## ✨ Key Features

### Product Management (CRUD)
- **Create**: Add new ski products with comprehensive details (name, price, specifications, image)
- **Read**: Display products on home page and dedicated products page
- **Update**: Edit ski information including price, specifications, and descriptions
- **Delete**: Remove products with confirmation modal to prevent accidental deletions

### Search & Filtering
- Real-time search across multiple fields (name, type, description)
- Case-insensitive search functionality
- Filter by ski type (All-Mountain, Powder, Racing, etc.)
- Combined search and filter operations
- Dynamic results display

### Advanced React Patterns
- **Custom Hooks**: useSkisData, useForm, useSearchAndFilter, useLocalStorage
- **Context API**: Global state management with SkisContext
- **Memoization**: useCallback for optimized callbacks, useMemo for filtered results
- **Hook Composition**: Multiple hooks working together seamlessly
- **Functional Components**: 100% functional component architecture

### Responsive Design
- Mobile-first responsive layout
- Breakpoints at 480px and 768px
- Touch-friendly interface
- Optimized for all device sizes

### Data Persistence
- Browser localStorage integration for cart/preferences
- Automatic data synchronization
- Graceful fallback to default data
- Error handling for quota exceeded scenarios

### Comprehensive Testing
- 63 test cases using React Testing Library and Jest
- Unit tests for components
- Hook tests in isolation
- User interaction testing
- Edge case coverage

## 🚀 Getting Started

### Prerequisites
- Node.js 14+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ski-showcase
```

2. Install dependencies:
```bash
npm install
```

3. Verify the setup by running:
```bash
npm start
```

The application should open at [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Running the Application

**Development Mode** - Auto-reload on file changes:
```bash
npm start
```

**Production Build** - Optimized bundle:
```bash
npm run build
```

**Run Tests** - Execute all 63 test cases:
```bash
npm test
```

**Watch Mode Tests** - Re-run tests on file changes:
```bash
npm test -- --watch
```

**Coverage Report** - Generate test coverage metrics:
```bash
npm test -- --coverage --watchAll=false
```

### Application Navigation

**Home Page**
- Welcome message and site description
- Featured ski products
- Links to browse full catalog or add products

**Products Page**
- Complete ski product listing
- Search bar for real-time filtering
- Type filter dropdown
- Edit and delete buttons for each product
- Grid layout with product cards

**Add Product Page**
- Form with sections for Basic Info, Technical Specs, and Image
- Field validation before submission
- Image preview
- Success confirmation message
- Automatic form clearing after submission

### Core Workflows

**Adding a Ski Product**
1. Navigate to "Add Product" page
2. Fill in all required fields
3. Add image URL (or leave default)
4. Click "Add Ski"
5. Confirmation message appears

**Editing a Product**
1. Go to Products page
2. Find the ski you want to edit
3. Click the edit (✎) button
4. Modal form appears with current data
5. Update desired fields
6. Click "Save Changes"
7. Changes reflected immediately

**Deleting a Product**
1. Go to Products page
2. Click the delete (🗑️) button on a ski card
3. Confirmation dialog appears
4. Click "Confirm" to delete
5. Product removed from list

**Searching Products**
1. Go to Products page
2. Type in the search box to filter by name, type, or description
3. Results update in real-time
4. Combine with type filter for refined results

## 📁 Project Structure

```
src/
├── App.js                          # Root component, page routing
├── App.css                         # Global styles
├── index.js                        # Entry point
├── components/
│   ├── SkiCard.js                  # Individual product card
│   ├── SkiCard.css
│   ├── SkiList.js                  # Product listing (home)
│   ├── SkiList.css
│   ├── ProductsPage.js             # Products with search/filter
│   ├── ProductsPage.css
│   ├── AddSkiForm.js               # Create product form
│   ├── AddSkiForm.css
│   ├── EditSkiForm.js              # Edit product modal
│   ├── EditSkiForm.css
│   ├── Navigation.js               # Navigation bar
│   ├── Navigation.css
│   ├── __tests__/
│   │   ├── SkiCard.test.js         # 10 tests
│   │   ├── AddSkiForm.test.js      # 8 tests
│   │   ├── EditSkiForm.test.js     # 9 tests
│   │   └── Navigation.test.js      # 6 tests
├── hooks/
│   ├── useSkisData.js              # Data fetching hook
│   ├── useForm.js                  # Form state management
│   ├── useSearchAndFilter.js       # Search/filter with memoization
│   ├── useLocalStorage.js          # Persistent storage hook
│   └── __tests__/
│       ├── useForm.test.js         # 9 tests
│       ├── useSearchAndFilter.test.js  # 11 tests
│       └── useLocalStorage.test.js     # 10 tests
├── context/
│   └── SkisContext.js              # Global state management
└── index.css                       # Base styling

public/
├── db.json                         # Product database (5 skis)
├── index.html
└── manifest.json
```

## 🧪 Testing

The application includes comprehensive test coverage with **63 test cases**:

### Component Tests
- **SkiCard**: Rendering, edit functionality, delete confirmation (10 tests)
- **AddSkiForm**: Form submission, validation, reset (8 tests)
- **EditSkiForm**: Modal editing, field updates, save/cancel (9 tests)
- **Navigation**: Page navigation, active states (6 tests)

### Hook Tests
- **useForm**: State management, validation, error handling (9 tests)
- **useSearchAndFilter**: Search logic, memoization, filtering (11 tests)
- **useLocalStorage**: Persistence, error handling, multiple keys (10 tests)

**Run all tests:**
```bash
npm test
```


## 🔧 Technology Stack

- **React 18**: UI framework with hooks
- **React Testing Library**: Component testing
- **Jest**: Test runner and assertions
- **CSS3**: Responsive styling
- **Context API**: State management
- **localStorage**: Data persistence

## ⚙️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run development server on port 3000 |
| `npm test` | Run test suites in watch mode |
| `npm run build` | Create production-optimized build |
| `npm run eject` | Expose webpack configuration (irreversible) |

## 🎨 Design Highlights

- **Mobile-First Approach**: Optimized for mobile, enhanced for desktop
- **Responsive Grid**: Product grid adapts to screen size
- **Sticky Navigation**: Header remains accessible while scrolling
- **Modal Dialogs**: Edit and delete operations in overlays
- **Loading States**: Feedback for async operations
- **Form Validation**: Real-time field validation
- **Confirmation Dialogs**: Prevent accidental data loss

## ⚠️ Known Limitations

### Data Persistence
- **Limitation**: No backend database; data persists only in browser localStorage
- **Impact**: Data lost if browser cache is cleared
- **Workaround**: Implement backend API integration for persistent cloud storage

### Search Functionality
- **Limitation**: Search is case-insensitive only; no advanced query syntax (AND, OR operators)
- **Impact**: Cannot perform complex multi-condition searches
- **Workaround**: Use type filter alongside search for refined results

### Image Handling
- **Limitation**: Image URLs must be externally hosted; no built-in image upload feature
- **Impact**: Must provide valid image URLs from external sources
- **Workaround**: Use placeholder services or self-hosted image servers

### Authentication & Authorization
- **Limitation**: No user authentication or role-based access control
- **Impact**: All users have full admin access (add/edit/delete)
- **Workaround**: Implement authentication middleware for production deployments

### Scalability
- **Limitation**: Client-side rendering only; no server-side optimization
- **Impact**: Performance may degrade with 1000+ products
- **Workaround**: Implement pagination or infinite scroll, move to backend

### Browser Compatibility
- **Limitation**: Requires modern browser with ES6+ support
- **Impact**: May not work on IE11 or older browsers
- **Workaround**: Use transpilation tools for legacy browser support

### Real-time Collaboration
- **Limitation**: No real-time synchronization between users
- **Impact**: Changes only visible to the current user's session
- **Workaround**: Implement WebSocket or polling for multi-user environments

## 🚧 Future Enhancements

- Backend API integration with Node.js/Express
- User authentication and role-based access
- Shopping cart functionality
- Order management system
- Product categories and advanced filtering
- Image upload capability
- User reviews and ratings
- Wishlist feature
- Inventory management
- Payment integration (Stripe/PayPal)

## 📝 Notes

- Product data is stored in `/public/db.json` and loaded via fetch at runtime
- All state management uses React hooks and Context API (no Redux)
- Tests use React Testing Library for component-focused testing
- Memoization patterns prevent unnecessary re-renders
- Error handling includes fallback UI and user feedback

## 📄 License

This project is provided as-is for educational purposes.

## 🤝 Support

For issues or questions, refer to:
- [React Documentation](https://react.dev)
- [React Testing Library Docs](https://testing-library.com/react)
- [Jest Documentation](https://jestjs.io)
