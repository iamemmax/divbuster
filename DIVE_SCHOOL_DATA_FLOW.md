# Dive School Data Flow in the Application

## Overview
The application has two main ways to handle dive schools:

### 1. **School Booking Flow** (DiveEventCalendar → SchoolBookingInfo)
- **Source**: `useFetchDiveEvent()` hook
- **Data**: Returns `dive_school` (ID) and `dive_school_name` (name)
- **Flow**:
  1. DiveEventCalendar fetches events with `useFetchDiveEvent()`
  2. When user selects an event, it extracts `dive_school` and `dive_school_name`
  3. Passes payload to `CreateSchoolPlan.handleEventSelect()`
  4. SchoolBookingInfo receives `div_school` as a read-only field
  5. Currently displays the school name as a string

### 2. **Dive School Liability Form** (DiveSchoolLiabilityForm)
- **Source**: `useFetchDiveSchools()` hook
- **Data**: Returns paginated list of dive schools with full details
- **Structure**:
  ```typescript
  {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<{
      id: number;
      name: string;
      address: string;
      dive_instructors: Array<{...}>;
      photos: Array<{...}>;
      qr_code: string | null;
      created_on: string;
      updated_on: string;
    }>;
  }
  ```
- **Access Pattern**: `diveSchoolsData?.pages?.[0]?.results?.map(...)`

## Key Differences

| Aspect | DiveEventCalendar | DiveSchoolLiabilityForm |
|--------|------------------|------------------------|
| **Hook** | `useFetchDiveEvent()` | `useFetchDiveSchools()` |
| **Data Type** | Single school per event | List of all schools |
| **Query Type** | useQuery | useInfiniteQuery |
| **Use Case** | Display selected school | Allow user to select school |
| **Field Name** | `dive_school_name` | `name` |

## Implementation Notes

1. **SchoolBookingInfo** currently receives `div_school` as a string (school name)
2. **DiveSchoolLiabilityForm** uses `useFetchDiveSchools()` to populate dropdown
3. Both components handle dive school data differently based on their use case
4. The dive school ID is passed in the payload as `dive_school_id`

## API Endpoints

- **Dive Events**: `GET /dive/dive-event?no_paginate=yes`
- **Dive Schools**: `GET /dive/dive-schools` (supports pagination and address filter)

