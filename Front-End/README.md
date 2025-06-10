# Restaurant Reservation Notification System

This project implements a notification system UI for a restaurant reservation system. It allows users to view, manage, and interact with notifications related to their restaurant reservations.

## Features

- View all notifications with pagination
- Mark notifications as read/unread
- Delete notifications
- View detailed notification information
- Filter notifications by type
- Real-time notification badge showing unread count

## Installation

1. Clone the repository:
```
git clone <repository-url>
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm start
```

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx        # App header with notification badge
│   │   └── Layout.jsx        # Layout wrapper for consistent UI
│   ├── notifications/
│   │   ├── NotificationBadge.jsx       # Notification bell icon with count
│   │   ├── NotificationDetailModal.jsx # Modal for detailed notification view
│   │   ├── NotificationItem.jsx        # Individual notification component
│   │   └── NotificationList.jsx        # List of notifications with pagination
│   └── pages/
│       ├── HomePage.jsx                # Home page
│       └── NotificationsPage.jsx       # Notifications page
├── hooks/
│   └── useNotifications.js             # Custom hook for notification data
├── services/
│   ├── api.js                          # Base API service
│   ├── mockNotificationService.js      # Mock service for development
│   └── notificationService.js          # Real notification service
└── utils/
    └── dateFormatter.js                # Date formatting utilities
```

## API Integration

The notification system integrates with the following API endpoints:

- `GET /api/notifications` - Fetch user's notifications (paginated)
- `GET /api/notifications/{id}` - Fetch a single notification
- `PATCH /api/notifications/{id}` - Mark a notification as read
- `PATCH /api/notifications/mark-all-read` - Mark all notifications as read
- `DELETE /api/notifications/{id}` - Delete a notification

## Component Usage

### NotificationBadge

```jsx
import NotificationBadge from './components/notifications/NotificationBadge';

// In your component:
<NotificationBadge />
```

### NotificationList

```jsx
import NotificationList from './components/notifications/NotificationList';

// In your component:
<NotificationList />
```

### NotificationDetailModal

```jsx
import NotificationDetailModal from './components/notifications/NotificationDetailModal';

// In your component:
const [open, setOpen] = useState(false);
const [notification, setNotification] = useState(null);

<NotificationDetailModal
  open={open}
  onClose={() => setOpen(false)}
  notification={notification}
  isLoading={false}
/>
```

## Development

During development, the app uses a mock notification service that simulates API calls with sample data. In production, it will connect to the real API endpoints.

## Technologies Used

- React
- Material UI
- React Query for data fetching
- React Router for navigation
- Axios for API requests
- Moment.js for date formatting
