# Araboon Project

<<<<<<< HEAD
## Table of Contents

- [Overview](#overview)  
- [Key Features](#key-features)  
- [Folder Structure](#folder-structure)  
- [Scripts](#scripts)  
- [Getting Started](#getting-started)  
- [Author](#author)  



---
## Overview

Our platform is a premium online manga and manhwa reader, designed to deliver a seamless and engaging experience for fans worldwide. Users can browse, search, and read a curated collection of manga and manhwa with high-quality images and organized chapters. The platform offers a responsive interface compatible across devices, combining intuitive navigation with advanced filtering to help readers discover their next favorite series effortlessly.

### Technologies Used

* **React 19** – functional components and hooks for building the UI  
* **Material UI (MUI)** – UI components and icons  
* **React Context API** – state management and persistence
* **Formik & Yup** – form handling and validation  
* **JWT** – authentication token decoding  
* **Axios** – HTTP requests  
* **React Router DOM** – routing  
* **Cropper (react-easy-crop)** – cropping cover images  
* **AvatarEditor (react-avatar-editor)** – cropping and editing profile images  
* **Swiper** – interactive and responsive carousels/sliders for content display  

---

## Key Features

### Guest

* Browse the platform without logging in
* View manga categories and popular series on the home page
* Access manga ranking page and view all hottest manga
* Filter mangas in manga list page according to status [ongoing, completed, one shot], category, and sort
* Read manga information, including ratings, categories, status, type, publication date, and description
* View chapters in Arabic and English (read-only)
* See user comments and ratings for each manga
* Light & Dark Mode: switch between light and dark themes

### User

* All guest features
* Create and manage a personal profile:
  * Upload and edit profile and cover images (reposition and zoom)
  * Update personal information: first name, last name, username, email, and bio
* Manage a personal manga library with multiple lists:
  * Notification list
  * Favorites
  * Currently reading
  * Completed reading
  * Reading later
* Search for manga by title or author
* Rate manga with ease and precision
* Comment on manga:
  * Reply to comments and replies
  * Like comments and replies
  * Post new comments and replies seamlessly
* Access chapter pages with full manga reading experience:
  * Switch between Arabic and English chapters
  * Navigate between chapters seamlessly

### Admin

* Light & Dark Mode: switch between light and dark themes
* Category Management
  * Category Overview
    * View summary statistics:
      * Total number of categories
      * Number of active categories
      * Number of inactive categories
  * Search & Filter
    * Search categories by name in English or Arabic
  * Add Category
    * Specify category name in both English and Arabic
  * Edit Category
    * Update category name in English and Arabic
    * Update category status (active/inactive)
  * Activate/Deactivate Category
    * Switch category status between active and inactive
  * Delete Category
    * Remove any category from the list
  * Category Details
    * View number of manga associated with each category
    * View creation date
    * View current status (active/inactive)
  * Actions per Category
    * Edit (pencil icon)
    * Delete (trash icon)
    * Activate/Deactivate (status buttons)

* Manga Management
  * Add New Manga
    * Enter manga title in English and Arabic
    * Enter author name in English and Arabic
    * Enter description in English and Arabic
    * Set status (Ongoing, Completed, etc.)
    * Set type (Manga, Manhwa, etc.)
    * Select multiple categories (English/Arabic)
  * Edit Existing Manga
    * Update title, author, description
    * Update status and type
    * Update categories
  * Manage Chapter Languages
    * Specify which chapter languages are available (Arabic and/or English)
  * Search Manga
    * Search by title or author
  * View All Mangas
    * Cover image
    * Title and author
    * Categories displayed as tags
    * Status (Active/Inactive) with toggle option
    * Quick actions:
      * Edit
      * Activate/Deactivate
      * Delete

---

## Folder Structure
```
araboon/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── categoryManagment/
│   │   │   ├── mangaManagment/
│   │   │   │   └── mangaDialog/
│   │   │   └── shared/
│   │   ├── auth/
│   │   │   └── shared/
│   │   ├── common/
│   │   ├── layouts/
│   │   │   ├── admin/
│   │   │   │   └── layoutParts/
│   │   │   └── user/
│   │   │       └── layoutParts/
│   │   │           └── navbar/
│   │   ├── shared/
│   │   └── user/
│   │       ├── chapter/
│   │       ├── commentsAndReplies/
│   │       │   ├── comments/
│   │       │   └── replies/
│   │       ├── dialog/
│   │       ├── editUserInformation/
│   │       ├── hottestHomePage/
│   │       ├── library/
│   │       ├── mangaInformation/
│   │       ├── mangaList/
│   │       ├── mediaCardSwiper/
│   │       ├── mySkeletons/
│   │       ├── profile/
│   │       │   ├── coverImage/
│   │       │   └── profileImage/
│   │       ├── promoBannerSwiper/
│   │       ├── rankingManga/
│   │       └── search/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   │   ├── admin/
│   │   ├── auth/
│   │   └── user/
│   ├── routes/
│   ├── services/
│   ├── styles/
│   └── utils/
├── index.js
└── package.json
```


---
## Scripts

| Command           | Description                              |
| ----------------- | -------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build the project for production |
| `npm run lint`    | Run ESLint to check code style and errors |
| `npm run preview` | Preview the production build locally   |

---

## Getting Started

1. **Clone the Frontend Repository:**  
   ```bash
   git clone https://github.com/abdullah-s-noor/ARABOON.git
   cd ARABOON

2. **Install Frontend Dependencies:**  
   ```bash
   npm install
   
3. **Run the Frontend Development Server:**  
   ```bash
   npm run dev

4. **The application connects to an online backend API, so no local backend setup is required.**
---
##  Author

Built by `Abdullah Noor - abdullah-s-noor`  
email: abdullah.s.noor04@gmail.com  
[Abdullah Noor - linkedin](https://www.linkedin.com/in/abdullah-s-noor)  
[Abdullah Noor - github](https://github.com/abdullah-s-noor)

---

<p align="center">© 2025 ARABOON. All rights reserved.</p>
<p align="center">Built with ☯︎ by Abdullah Noor & Mahmoud Darawsheh</p>
=======
>>>>>>> 5b54a9d47394a30ebd0583bb8ab81d35126e29c2
