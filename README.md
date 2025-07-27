# EventSphere - Event Management System

A modern, responsive event management system built with HTML, CSS, and JavaScript. EventSphere provides a comprehensive platform for creating, managing, and organizing events with an intuitive user interface and beautiful design.

## 🌟 Features

### 🔐 User Authentication
- Secure login and registration system
- Session management with remember me option
- Password visibility toggle
- Input validation and error handling
- Social authentication placeholders (Google, GitHub)

### 📊 Dashboard
- Clean, modern dashboard interface
- Statistics overview (total events, attendees, success rate)
- Quick action buttons for common tasks
- Recent events display with status indicators
- Real-time notifications system

### 📅 Event Management
- Create events with detailed information
- Event types: Conference, Workshop, Webinar, Party, Meeting
- Date and time scheduling with validation
- Attendee management and capacity limits
- Pricing and ticketing support
- Draft saving functionality
- Event filtering (All, Upcoming, Past, Drafts)

### 🎨 Modern Design
- Responsive design for all screen sizes
- Gradient backgrounds and modern color scheme
- Smooth animations and transitions
- Interactive hover effects
- Card-based layouts
- Glass morphism effects

### 🔍 Additional Features
- Search functionality across events
- Modal dialogs for notifications
- Loading states and progress indicators
- Toast notifications for user feedback
- Mobile-friendly navigation
- Accessibility considerations

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required - runs entirely in the browser

### Installation

1. **Clone or download the repository**
   ```bash
   git clone <repository-url>
   cd eventsphere
   ```

2. **Open the project**
   Simply open `index.html` in your web browser, or serve it using a local server:
   
   ```bash
   # Using Python (if installed)
   python -m http.server 8000
   
   # Using Node.js live-server (if installed)
   npx live-server
   
   # Using PHP (if installed)
   php -S localhost:8000
   ```

3. **Access the application**
   Open your browser and navigate to:
   - Direct file: `file:///path/to/index.html`
   - Local server: `http://localhost:8000`

## 🔑 Demo Credentials

Use these credentials to test the authentication system:

| Email | Password | Role |
|-------|----------|------|
| admin@eventsphere.com | admin123 | Admin User |
| demo@eventsphere.com | demo123 | Demo User |

## 📁 Project Structure

```
eventsphere/
├── index.html              # Main landing page
├── login.html              # Authentication page
├── dashboard.html          # Main dashboard
├── styles.css              # Landing page styles
├── auth.css               # Authentication styles
├── dashboard.css          # Dashboard styles
├── script.js              # Landing page functionality
├── auth.js                # Authentication logic
├── dashboard.js           # Dashboard functionality
├── login.css              # Original login styles (legacy)
└── README.md              # Project documentation
```

## 🖥️ Pages Overview

### 1. Landing Page (`index.html`)
- **Hero Section**: Eye-catching introduction with call-to-action
- **Features Section**: Showcase of key platform capabilities
- **About Section**: Information about EventSphere
- **Footer**: Contact information and links

### 2. Authentication (`login.html`)
- **Login Form**: Email and password authentication
- **Registration Form**: New user account creation
- **Social Login**: Google and GitHub integration placeholders
- **Password Recovery**: Forgot password functionality

### 3. Dashboard (`dashboard.html`)
- **Overview**: Statistics and quick actions
- **Events Management**: Create, view, and manage events
- **Guest Management**: Attendee handling (placeholder)
- **Analytics**: Event insights and reporting (placeholder)
- **Templates**: Pre-built event templates (placeholder)

## 🎨 Design System

### Color Palette
- **Primary**: `#6366f1` (Indigo)
- **Secondary**: `#8b5cf6` (Purple)
- **Success**: `#10b981` (Emerald)
- **Error**: `#ef4444` (Red)
- **Warning**: `#f59e0b` (Amber)
- **Neutral**: `#64748b` (Slate)

### Typography
- **Font Family**: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Headers**: Bold weights with proper hierarchy
- **Body Text**: Regular weight with good readability

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Clean inputs with focus states
- **Navigation**: Fixed header with smooth scrolling

## 💻 Browser Support

- ✅ Chrome 70+
- ✅ Firefox 65+
- ✅ Safari 12+
- ✅ Edge 79+
- ⚠️ Internet Explorer 11 (limited support)

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🛠️ Customization

### Styling
Modify the CSS variables in each stylesheet to customize colors and spacing:

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --success-color: #10b981;
  /* Add your custom variables */
}
```

### Functionality
Extend the JavaScript files to add new features:
- Add real API integration
- Implement backend authentication
- Add more event types
- Integrate with calendar systems

## 🔮 Future Enhancements

### Planned Features
- [ ] Real-time collaboration
- [ ] Calendar integration
- [ ] Email notifications
- [ ] Payment processing
- [ ] QR code generation
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Progressive Web App (PWA)
- [ ] API integration

### Technical Improvements
- [ ] Build system (Webpack/Vite)
- [ ] CSS preprocessor (Sass/Less)
- [ ] JavaScript framework (React/Vue)
- [ ] Backend integration
- [ ] Database storage
- [ ] Unit testing
- [ ] Performance optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Font Awesome** for the beautiful icons
- **Google Fonts** for typography inspiration
- **Unsplash** for placeholder images (if used)
- **CSS Gradient** generators for color schemes

## 📞 Support

For support, email support@eventsphere.com or create an issue in the repository.

---

**Built with ❤️ for event organizers everywhere**
