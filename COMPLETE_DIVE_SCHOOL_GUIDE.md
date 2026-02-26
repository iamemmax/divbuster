# Complete Dive School Implementation Guide

## Overview
Your project handles dive schools in **3 distinct ways** depending on the use case:

## 1️⃣ DIVE EVENT CALENDAR (Automatic School Selection)

**File**: `DiveEventCalendar.tsx`  
**Hook**: `useFetchDiveEvent()`  
**Purpose**: User selects event → school is automatically extracted

```typescript
// Fetches events with embedded school data
const { data: diveEventData } = useFetchDiveEvent()

// Extracts school from selected event
const allEventDates = useMemo(() => {
  return allEvents.flatMap((event) =>
    event.event_dates.map((date) => ({
      diveSchool: event.dive_school,           // ID
      diveSchoolName: event.dive_school_name,  // Name
    }))
  )
}, [allEvents])

// Passes to parent component
const payload = {
  div_school: selectedEvent?.diveSchool?.toString() || "",
}
onEventSelect(payload)
```

## 2️⃣ SCHOOL BOOKING INFO (Display Selected School)

**File**: `SchoolBookingInfo.tsx`  
**Hook**: None (receives via props)  
**Purpose**: Show selected school in read-only format

```typescript
// Receives school from parent
interface Props {
  schoolBookingData?: {
    div_school: string;  // School name/ID
  };
}

// Displays as read-only
<div className="bg-blue-100">
  {bookingData.div_school || "—"}
</div>
```

## 3️⃣ DIVE SCHOOL LIABILITY FORM (User Selection)

**File**: `DiveSchoolLiabilityForm.tsx`  
**Hook**: `useFetchDiveSchools()`  
**Purpose**: User selects school from dropdown list

```typescript
// Fetches all available schools
const { data: diveSchoolsData, isLoading: isLoadingSchools } 
  = useFetchDiveSchools()

// Maps to dropdown options
<select {...register('dive_school_id')} disabled={isLoadingSchools}>
  <option value="">Select a dive school</option>
  {diveSchoolsData?.pages?.[0]?.results?.map((school) => (
    <option key={school.id} value={school.id}>
      {school.name}
    </option>
  ))}
</select>

// Submits with school ID
const payload = {
  dive_school_id: parseInt(data.dive_school_id),
}
```

## API Endpoints

| Endpoint | Hook | Returns |
|----------|------|---------|
| `/dive/dive-event?no_paginate=yes` | `useFetchDiveEvent()` | Events with `dive_school` & `dive_school_name` |
| `/dive/dive-schools` | `useFetchDiveSchools()` | Paginated list of schools |

## Data Structures

### Event School Data
```typescript
{
  dive_school: 5,              // ID
  dive_school_name: "Ocean Academy"  // Name
}
```

### School List Data
```typescript
{
  pages: [{
    results: [{
      id: 5,
      name: "Ocean Academy",
      address: "123 Beach St",
      dive_instructors: [...],
      photos: [...]
    }]
  }]
}
```

## Complete Data Flow

```
1. User opens booking modal
2. DiveEventCalendar displays events
3. User selects event
4. DiveEventCalendar extracts dive_school & dive_school_name
5. Passes to CreateSchoolPlan.handleEventSelect()
6. SchoolBookingInfo displays school (read-only)
7. User proceeds to liability form
8. DiveSchoolLiabilityForm fetches all schools
9. User selects school from dropdown
10. Form submits with dive_school_id
```

## Key Takeaways

✅ **Pattern 1**: Extract school from event data  
✅ **Pattern 2**: Display school from props  
✅ **Pattern 3**: Fetch and let user select school  

All three patterns work together seamlessly in your application!

