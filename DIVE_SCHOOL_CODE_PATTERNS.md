# Dive School Code Patterns - Complete Reference

## Pattern 1: Fetching Dive Schools (DiveSchoolLiabilityForm)

```typescript
import { useFetchDiveSchools } from '../../api/bookings/fetchDivingSchools'

// In component
const { data: diveSchoolsData, isLoading: isLoadingSchools } = useFetchDiveSchools()

// Rendering dropdown
<select {...register('dive_school_id')} disabled={isLoadingSchools}>
  <option value="">Select a dive school</option>
  {diveSchoolsData?.pages?.[0]?.results?.map((school: any) => (
    <option key={school.id} value={school.id}>
      {school.name}
    </option>
  ))}
</select>
```

**Key Points**:
- Uses `useInfiniteQuery` internally
- Access data via `pages[0].results`
- School object has: `id`, `name`, `address`, `dive_instructors`, `photos`
- Disable dropdown while loading

## Pattern 2: Getting School from Event (DiveEventCalendar)

```typescript
import { useFetchDiveEvent } from '../../api/bookings/fetchDiveEvent'

// In component
const { data: diveEventData, isLoading } = useFetchDiveEvent()

// Extract school data
const allEventDates = useMemo(() => {
  return allEvents.flatMap((event: any) =>
    event.event_dates.map((date: any) => ({
      ...date,
      diveSchool: event.dive_school,           // ID
      diveSchoolName: event.dive_school_name,  // Name
    }))
  )
}, [allEvents])

// Pass to callback
const payload = {
  div_school: selectedEvent?.diveSchool?.toString() || "",
}
onEventSelect(payload)
```

**Key Points**:
- Uses `useQuery` (not infinite)
- School data embedded in event object
- Has both ID (`dive_school`) and name (`dive_school_name`)
- Pass as string in payload

## Pattern 3: Displaying School (SchoolBookingInfo)

```typescript
// Receives as prop
interface Props {
  schoolBookingData?: {
    div_school: string;  // School name/ID
  };
}

// Display as read-only
<div className="w-full px-3 py-2 text-sm border rounded-lg bg-blue-100">
  {bookingData.div_school || "—"}
</div>
```

**Key Points**:
- Receives school as string from parent
- Display only (read-only)
- No API call needed
- Shows "—" if empty

## When to Use Each Pattern

| Scenario | Pattern | Hook |
|----------|---------|------|
| User selecting from event calendar | Pattern 2 | `useFetchDiveEvent()` |
| User selecting from dropdown list | Pattern 1 | `useFetchDiveSchools()` |
| Displaying selected school | Pattern 3 | None (prop-based) |

## API Endpoints

- **Events**: `/dive/dive-event?no_paginate=yes`
- **Schools**: `/dive/dive-schools` (paginated, supports address filter)

## Data Flow Summary

```
useFetchDiveEvent()
    ↓
DiveEventCalendar extracts school data
    ↓
Passes div_school to CreateSchoolPlan
    ↓
SchoolBookingInfo displays as read-only
    ↓
For liability form: useFetchDiveSchools()
    ↓
DiveSchoolLiabilityForm shows dropdown
```

