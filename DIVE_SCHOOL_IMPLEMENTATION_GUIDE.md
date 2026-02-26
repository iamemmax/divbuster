# Dive School Implementation Guide

## How Dive Schools Are Fetched and Displayed

### 1. DiveEventCalendar Component
**Location**: `src/app/(main)/(dashboard)/manage-certifications/components/DiveEventCalendar.tsx`

**How it works**:
```typescript
// Fetches dive events with embedded school data
const { data: diveEventData, isLoading } = useFetchDiveEvent()

// Extracts school info from events
const allEventDates = useMemo(() => {
  return allEvents.flatMap((event: any) =>
    event.event_dates.map((date: any) => ({
      ...date,
      diveSchool: event.dive_school,           // School ID
      diveSchoolName: event.dive_school_name,  // School Name
      // ... other fields
    }))
  )
}, [allEvents])

// Passes to parent when event selected
const payload = {
  div_school: selectedEvent?.diveSchool?.toString() || "",
  // ... other fields
}
onEventSelect(payload)
```

### 2. SchoolBookingInfo Component
**Location**: `src/app/(main)/(dashboard)/bookings/components/modals/school-booking/SchoolBookingInfo.tsx`

**How it displays**:
```typescript
// Receives school data from DiveEventCalendar
interface Props {
  schoolBookingData?: {
    div_school: string;  // School name/ID as string
    // ... other fields
  };
}

// Displays as read-only field
<div className="w-full px-3 py-2 text-sm border rounded-lg bg-blue-100">
  {bookingData.div_school || "—"}
</div>
```

### 3. DiveSchoolLiabilityForm Component
**Location**: `src/app/(main)/(dashboard)/insurance/components/DiveSchoolLiabilityForm.tsx`

**How it fetches and displays**:
```typescript
// Fetches all available dive schools
const { data: diveSchoolsData, isLoading: isLoadingSchools } = useFetchDiveSchools()

// Maps to dropdown options
<select {...register('dive_school_id')} disabled={isLoadingSchools}>
  <option value="">Select a dive school</option>
  {diveSchoolsData?.pages?.[0]?.results?.map((school: any) => (
    <option key={school.id} value={school.id}>
      {school.name}
    </option>
  ))}
</select>
```

## Key Differences in Data Handling

| Component | Data Source | Data Type | Display Method |
|-----------|------------|-----------|-----------------|
| DiveEventCalendar | Event object | Embedded in event | Extracted during event selection |
| SchoolBookingInfo | Passed via props | String (name) | Read-only display |
| DiveSchoolLiabilityForm | API call | Full object array | Dropdown select |

## API Response Structures

### useFetchDiveEvent()
```typescript
{
  data: [{
    id: number;
    dive_school: number;           // School ID
    dive_school_name: string;      // School Name
    dive_site_name: string;
    event_dates: [...];
    dive_instructors: [...];
  }]
}
```

### useFetchDiveSchools()
```typescript
{
  pages: [{
    results: [{
      id: number;
      name: string;
      address: string;
      dive_instructors: [...];
      photos: [...];
    }]
  }]
}
```

## Summary

- **DiveEventCalendar**: Gets school data from dive events API
- **SchoolBookingInfo**: Receives school name as string from calendar
- **DiveSchoolLiabilityForm**: Fetches all schools for dropdown selection
- Both approaches are correct for their respective use cases

