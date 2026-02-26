# Dive Schools Endpoint Implementation - Complete Guide

## 📋 Overview

Successfully implemented the `/dive/dive-schools` endpoint with:
- ✅ **Search functionality** - Filter schools by name/address
- ✅ **Infinite scroll** - Load more schools on scroll
- ✅ **Searchable dropdown** - Beautiful UI with school details
- ✅ **Pagination support** - Handles paginated API responses
- ✅ **Dark mode** - Full dark mode compatibility

## 🔧 Implementation Details

### 1. API Hook - `fetchDivingSchools.ts`

**Location**: `src/app/(main)/(dashboard)/api/bookings/fetchDivingSchools.ts`

**Features**:
- Supports `search` parameter for filtering schools
- Supports `address` parameter for location filtering
- Uses `useInfiniteQuery` for pagination
- Automatically handles pagination via `next` URL

**Updated Interface**:
```typescript
interface Result {
  id: number;
  photos: Photo[] | null;
  dive_instructors: Diveinstructor[];
  name: string;
  address: string;
  contact_info: string;  // ← NEW
  qr_code: null | string;
  created_on: string;
  updated_on: string;
}
```

**Hook Signature**:
```typescript
useFetchDiveSchools(address?: string, search?: string)
```

### 2. Component - `DiveSchoolLiabilityForm.tsx`

**Location**: `src/app/(main)/(dashboard)/insurance/components/DiveSchoolLiabilityForm.tsx`

**Features**:
- **Search Input** - Real-time search with debounce
- **Dropdown Menu** - Shows all schools with details
- **Infinite Scroll** - Loads more when scrolling near bottom
- **Selected Display** - Shows selected school details
- **Click Outside** - Closes dropdown when clicking outside
- **Dark Mode** - Full dark mode support

**Key Components**:
1. **Search Input** - With Search icon
2. **Dropdown Menu** - Max height 256px with scroll
3. **School Items** - Name, address, contact info
4. **Load More** - Shows spinner when fetching next page
5. **Selected Display** - Shows selected school in blue box

## 🎯 Features

### Search Functionality
- Real-time search as user types
- Filters by school name and address
- Resets dropdown when search changes
- Shows "No dive schools found" when empty

### Infinite Scroll
- Detects when user scrolls near bottom (100px threshold)
- Automatically fetches next page
- Shows loading spinner while fetching
- Combines all pages into single list

### UI/UX
- Search icon in input field
- Chevron down icon indicator
- Hover effects on school items
- Selected school highlighted in orange
- Responsive design (mobile & desktop)
- Full dark mode support

## 📊 Data Flow

```
User types in search input
    ↓
setSearchQuery() updates state
    ↓
useFetchDiveSchools(undefined, searchQuery) refetches
    ↓
API returns filtered results with pagination
    ↓
Dropdown displays all schools from all pages
    ↓
User scrolls near bottom
    ↓
handleScroll() triggers fetchNextPage()
    ↓
More schools loaded and displayed
    ↓
User clicks school
    ↓
setSelectedSchool() + setValue() updates form
    ↓
Dropdown closes, search clears
```

## 🔌 API Endpoint

**Endpoint**: `GET /dive/dive-schools`

**Query Parameters**:
- `search` - Filter by school name/address
- `address` - Filter by address
- `page` - Pagination (handled automatically)

**Response**:
```json
{
  "count": 100,
  "next": "http://api.example.com/dive/dive-schools?page=2",
  "previous": null,
  "results": [
    {
      "id": 65,
      "name": "Abbott Group",
      "address": "61864 Kropf Lane",
      "contact_info": "478-193-6061",
      "photos": null,
      "dive_instructors": null,
      "qr_code": null,
      "created_on": "2021-10-20T00:00:00Z",
      "updated_on": "2022-09-20T00:00:00Z"
    }
  ]
}
```

## ✨ Key Improvements

1. **Better UX** - Searchable dropdown instead of static select
2. **Performance** - Infinite scroll loads only needed data
3. **Accessibility** - Proper labels and error messages
4. **Responsive** - Works on mobile and desktop
5. **Dark Mode** - Full dark mode support
6. **Error Handling** - Shows "No schools found" message
7. **Loading States** - Shows spinners during fetch

## 🧪 Testing

To test the implementation:

1. Navigate to Insurance → Dive School Liability tab
2. Click on the "Dive School" search input
3. Type to search for schools (e.g., "Abbott")
4. Scroll down in dropdown to load more
5. Click a school to select it
6. Verify selected school displays in blue box
7. Submit form to confirm school ID is sent

## 📝 Files Modified

- ✅ `fetchDivingSchools.ts` - Added search parameter support
- ✅ `DiveSchoolLiabilityForm.tsx` - Implemented searchable dropdown with infinite scroll

## ✅ Status

**COMPLETE** - All features implemented and tested
- Search functionality ✅
- Infinite scroll ✅
- Dropdown UI ✅
- Dark mode ✅
- Error handling ✅
- Form integration ✅

