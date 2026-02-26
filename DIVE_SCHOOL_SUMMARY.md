# Dive School Implementation Summary

## Quick Reference

### Three Ways Dive Schools Are Handled in Your Project

#### 1. **DiveEventCalendar** - Gets school from dive events
- **File**: `src/app/(main)/(dashboard)/manage-certifications/components/DiveEventCalendar.tsx`
- **Hook**: `useFetchDiveEvent()`
- **Data**: School embedded in event object
- **Fields**: `dive_school` (ID), `dive_school_name` (name)
- **Purpose**: User selects event, school is extracted automatically

#### 2. **SchoolBookingInfo** - Displays selected school
- **File**: `src/app/(main)/(dashboard)/bookings/components/modals/school-booking/SchoolBookingInfo.tsx`
- **Hook**: None (receives via props)
- **Data**: School name as string
- **Field**: `div_school`
- **Purpose**: Show selected school in read-only format

#### 3. **DiveSchoolLiabilityForm** - User selects from dropdown
- **File**: `src/app/(main)/(dashboard)/insurance/components/DiveSchoolLiabilityForm.tsx`
- **Hook**: `useFetchDiveSchools()`
- **Data**: Full list of all schools
- **Access**: `diveSchoolsData?.pages?.[0]?.results`
- **Purpose**: User selects school for liability form

## Data Flow

```
User selects event in calendar
    ↓
DiveEventCalendar extracts dive_school & dive_school_name
    ↓
Passes div_school to CreateSchoolPlan
    ↓
SchoolBookingInfo displays school name (read-only)
    ↓
User proceeds to booking
    ↓
For liability: DiveSchoolLiabilityForm fetches all schools
    ↓
User selects school from dropdown
    ↓
Form submits with dive_school_id
```

## API Endpoints

| Endpoint | Hook | Purpose |
|----------|------|---------|
| `/dive/dive-event?no_paginate=yes` | `useFetchDiveEvent()` | Get events with school data |
| `/dive/dive-schools` | `useFetchDiveSchools()` | Get all schools for selection |

## Implementation Patterns

### Pattern A: Extract from Event
```typescript
const { data: diveEventData } = useFetchDiveEvent()
const diveSchool = event.dive_school  // ID
const diveSchoolName = event.dive_school_name  // Name
```

### Pattern B: Display from Props
```typescript
<div>{bookingData.div_school || "—"}</div>
```

### Pattern C: Fetch and Map
```typescript
const { data: diveSchoolsData } = useFetchDiveSchools()
{diveSchoolsData?.pages?.[0]?.results?.map(school => (
  <option value={school.id}>{school.name}</option>
))}
```

## Current Status

✅ **DiveEventCalendar**: Properly extracts school from events  
✅ **SchoolBookingInfo**: Displays school as read-only  
✅ **DiveSchoolLiabilityForm**: Fetches and displays schools in dropdown  

All three components work together seamlessly!

