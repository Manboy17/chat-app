# Full Stack Real Time Chat Application

### Tech stack: MERN, Socket.io, TailwindCSS, Shadcn

## Features

- Authentication with JWT
- Real time sending messages and images
- Online user status
- User profile updating

## Installation - setup .env file

```
MONGODB_URI=
JWT_SECRET=
PORT=3000

CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Start frontend and backend
```
npm run dev
```

### Notes

In order to implement image uploading, I have used cloudinary for this purpose. However, the free plan has certain limitations in image size,
that leads to potential error. In order to fix this, try to use smaller images. 