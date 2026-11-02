# Chef's Menu Manager - MAST5112

**Student:** Israa Williams  
**Student Number:** ST10501763  
**Module:** MAST5112 - Mobile Application Scripting  
**Year:** 2026  
**Submission:** POE Part 3 Final - 100 Marks

## About The App

This is a mobile app for Christoffel's Restaurant. It helps chefs to manage their restaurant menu. Chef can add new dishes, edit dishes, delete dishes, search for dishes and filter by course type.

The app was built using React Native with Expo.

## What The App Can Do

### Part 2 Features (Carried Over)
- Add new dish with name, description, course and price
- Validation for all fields
- Display list of all menu items
- Calculate total value and average price

### Part 3 Final Features (New)

1. **Manage Menu Items (25 Marks)**
      - Edit existing menu item - tap Edit button, form fills with old data, update it
      - Update menu item information - when editing, price and details change
      - Delete a menu item - tap Remove with confirmation popup
      - Changes show immediately after edit/delete

2. **Search and Filter Menu Items (20 Marks)**
      - Search by name - type in search box, it filters as you type (e.g. type "salmon")
      - Filter by course - buttons for All, Starter, Main Course, Dessert
      - Clear search/filter - Clear button resets search and filter to show all items
      - Displayed list updates correctly when searching/filtering

3. **Display Menu Statistics (20 Marks)**
      - Total number of menu items
      - Average price of all items
      - Number of items per course (how many starters, mains, desserts)
      - Shows in header - easy to read and updates when items change

4. **Enhance The Application (20 Marks)**
      - Improved layout - cards with orange border, better spacing, rounded corners
      - Reusable components - renderCourseButton() function used for course buttons
      - Reusable functions - formatPrice() to format price as R XX.XX and getCourseCount() to count courses
      - Better code organisation - grouped states, grouped functions by requirement
      - Meaningful names - searchName, filteredItems, calculateStats, editDish
      - Better validation - checks for empty, min length, price must be number and > 0
      - Consistent and user friendly - same colors and buttons everywhere

5. **User Experience (10 Marks)**
      - Easy to use - single screen, clear buttons
      - Clear navigation - form on top, search/filter middle, list bottom
      - Meaningful messages - Success when added, Updated when edited, Confirm Delete popup
      - Validates input - shows error under each field
      - Consistent look - same card design and colors

## How To Install And Run

1. Clone the repo:
https://github.com/IsraaWilliams/Chefs_Menu

2. Install dependencies:
npm install
npx expo install

3. Run the app:
npx expo start
Then scan QR code with Expo Go app on your phone.

## App Screenshots

- Header shows stats: total dishes, total value, avg price
- Form to add/edit dishes with validation
- Search bar + filter buttons
- Menu list with edit/remove buttons
- Confirmation dialogs

## Links For Submission

**GitHub Repository:** https://github.com/IsraaWilliams/Chefs_Menu

**YouTube Video Demo (Unlisted):** https://youtu.be/VtiqRcWFBWQ?si=RzKbfuva7UGVGak7 

Video shows:
- adding menu items
- editing menu items
- deleting menu items
- searching for menu items
- filtering menu items
- displaying menu statistics
- overall functionality

## Student Declaration

I, Israa Williams ST10501763, declare that this is my own work for MAST5112 POE Final 2026. All code was written by me with reference to class notes and React Native documentation.

## Contact

ST10501763 - Israa Williams - IIE Rosebank International Cape Town Campus 
