# Changelog - Chef's Menu Manager

All changes made to the project for MAST5112 are listed here.

## [Part 3 Final - 2026-11-02] - Final Submission - 100 Marks

### Added - New Features For Final POE

#### 1. Manage Menu Items
- Added `editingId` state to track which item is being edited
- Added `editDish(item)` function - when user taps Edit, it fills the form with that item's name, description, course and price
- Changed `addDish()` to handle both add and update - if `editingId` exists it updates using `map()` else it adds new dish
- Added `clearForm()` now also clears `editingId`
- Added confirmation before delete - if user deletes item that is being edited, form clears
- Added Edit button in each dish card next to Remove button
- Changes now reflect immediately because of `setMenuItems`

#### 2. Search and Filter
- Added `searchName` state for search input
- Added search TextInput "Search by dish name..." above filter buttons
- Added `clearFilters()` function - resets `searchName` to '' and `selectedFilter` to 'All'
- Added Clear button in filter row
- Added result count text "{filteredItems.length} items found"
- Changed `filteredItems` useMemo - now does TWO filters:
    - First filter by searchName using `toLowerCase().includes()`
    - Second filter by course using `selectedFilter !== 'All'`
- Before it only filtered by course, now it filters by both search and course

#### 3. Display Menu Statistics
- Added `getCourseCount(courseName)` reusable function - counts how many items for a course
- Changed `calculateStats` - now uses `getCourseCount()` for starters, mains, desserts instead of repeating filter code
- Added course stats line in header - shows "X Starters - X Mains - X Desserts"
- Stats now update automatically when menuItems changes

#### 4. Enhance Application
- Created reusable function `formatPrice(value)` - formats price as "R XX.XX" used everywhere instead of repeating `R ${price}`
- Created reusable function `getCourseCount()` - avoids repeating same filter logic 3 times
- Created reusable component function `renderCourseButton(c)` - returns TouchableOpacity for course buttons
- Improved layout - added searchInput style, clearFilterBtn style, editBtn style
- Better organisation - grouped all states together, grouped functions: validation, add/edit/delete, filters, stats
- Changed error messages - removed emoji warnings to be more professional, simple text
- Added meaningful variable names - `searchName` instead of `searchText`, `filteredItems` clear name

#### 5. User Experience
- Added Edit button with different color (orange) to distinguish from Remove (red)
- Added result count to show how many items found after search/filter
- Added Clear button to reset filters easily
- Form title now changes: shows "Edit Dish" when editing and "Add New Dish" when adding
- Button text changes: shows "UPDATE DISH" when editing and "+ ADD TO MENU" when adding

### Changed
- Changed all dates from 2025 to 2026:
    - Menu items dateAdded: 2025-11-10 to 2026-11-10
    - Footer year: 2025 to 2026
    - Comments: MAST5112 Final 2026
- Changed form header subtitle - still shows required fields
- Changed filter section label from "Filter by Course:" to "Search and Filter:"
- Changed header subtitle from "Christoffel's Restaurant • Menu Manager Pro" to "Christoffel's Restaurant - Menu Manager" (simpler)
- Changed empty state icon text - kept same

### Fixed
- Fixed bug where deleting item being edited would leave form in edit mode - now calls clearForm()
- Fixed price display - now uses formatPrice() everywhere for consistency
- Fixed validation errors - now clears specific error when user types again

## [Part 2 - 2026-11-15] - Previous Submission - 60 Marks

### Added
- Initial menu items: 5 dishes with id, name, description, course, price, dateAdded
- Form with 4 inputs: dishName, description, course, price
- Validation for all fields - checks empty, min length, price number
- Add dish functionality with Alert success
- Remove dish with confirmation
- Display menu list with FlatList
- Stats: total count, total value, average price
- Filter by course - All, Starter, Main Course, Dessert
- Basic styling with header, form card, dish cards
- Footer with student info

### Known Issues In Part 2
- No edit functionality
- No search by name
- No clear filters button
- No reusable functions - repeated code
- Filter only by course not by name

---

## Summary Of Changes Since Part 2

| Feature | Part 2 | Part 3 Final |
|---------|--------|--------------|
| Add Dish | Yes | Yes - improved |
| Edit Dish | No | Yes - NEW |
| Update Dish | No | Yes - NEW |
| Delete Dish | Yes | Yes - improved with clearForm |
| Search by Name | No | Yes - NEW with searchName state |
| Filter by Course | Yes | Yes - improved + Clear button |
| Clear Filters | No | Yes - NEW clearFilters() function |
| Total Count | Yes | Yes |
| Average Price | Yes | Yes |
| Count per Course | Yes | Yes - now using reusable getCourseCount() |
| Reusable Components | No | Yes - renderCourseButton |
| Reusable Functions | No | Yes - formatPrice() and getCourseCount() |
| Meaningful Names | Some | Yes - improved all names |
| Validation | Yes | Yes - improved |
| User Messages | Yes | Yes - Added Updated message |

Total new lines of code added in Part 3: ~120 lines
Total functions added: 4 (editDish, clearFilters, formatPrice, getCourseCount, renderCourseButton)
