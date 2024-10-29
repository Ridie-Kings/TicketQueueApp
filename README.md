# Ticket App
The Ticket App is a React-based application that allows users to create, manage, and view tickets for a customer support system.
## Features

- Join: Users can join the application and enter their name and desk number.
- Queue: Users can view the queue of tickets and their current position in the queue.
- Create Ticket: Users can create new tickets by providing a title, description, and priority.
- Desktop: The desktop view allows users to manage the queue of tickets and update their status.

## Technologies Used

- React
- React Router
- Ant Design
- Socket.IO
- Dotenv

## Installation and Setup

1. Clone the repository:

```Copy
git clone https://github.com/your-username/ticket-app.git
```
2. Navigate to the project directory:
```Copy
cd ticket-app
```
3. Install the dependencies:
```Copy
npm install
```
4. Create a .env file in the root directory of the project and add the following environment variable:
```Copy
REACT_APP_SOCKET_SERVER_URL=<your-socket-server-url>
Replace <your-socket-server-url> with the URL of your Socket.IO server.
```
5. Start the development server:
```Copy
npm start
```

The application should now be available at http://localhost:3000.

## Folder Structure
The project's folder structure is as follows:
```
Copyticket-app/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── TicketItem.jsx
│   │   └── ...
│   ├── context/
│   │   ├── SocketContext.jsx
│   │   └── UIContext.jsx
│   ├── pages/
│   │   ├── CreateTicketPage.jsx
│   │   ├── DesktopPage.jsx
│   │   ├── Join.jsx
│   │   ├── Queue.jsx
│   │   └── RouterPage.jsx
│   ├── styles/
│   │   ├── desktop.css
│   │   └── queue.css
│   ├── utils/
│   │   ├── useHideMenu.js
│   │   ├── useSocket.js
│   │   ├── getLasts.js
│   │   └── getUserStorage.js
│   ├── index.css
│   ├── index.jsx
│   └── TicketApp.jsx
├── .env
├── .gitignore
├── package.json
└── README.md
```
## Pages

### CreateTicketPage.jsx

This page allows users to create a new ticket. It displays a button that, when clicked, emits a "request-ticket" event to the Socket.IO server and receives a new ticket object, which is then displayed to the user.

### DesktopPage.jsx

This page is the desktop view of the application. It displays the current user's information, the next ticket to be attended, and the ability to call the next ticket. It also includes a button to log out of the desktop view.

### Join.jsx

This page is the entry point of the application. Users can enter their name and desk number to join the application. The user's information is stored in the browser's local storage.

## Utility Files
-  SocketContext.jsx: This file sets up the context for managing the Socket.IO connection in the application.
- UIContext.jsx: This file sets up the context for managing the visibility of the menu in the application.
- useHideMenu.js: This custom hook is used to show or hide the menu based on the current page.
- useSocket.js
This custom hook is used to connect to the Socket.IO server and manage the connection state.
- getLasts.js: This utility function fetches the last tickets from the server.
- getUserStorage.js: This utility function retrieves the user's information from the browser's local storage.

## Contributing

If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License.