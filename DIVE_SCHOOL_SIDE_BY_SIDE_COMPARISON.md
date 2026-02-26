# Dive School Implementation - Side by Side Comparison

## How Each Component Handles Dive Schools

### DiveEventCalendar (Gets school from events)
```typescript
// FETCH
const { data: diveEventData } = useFetchDiveEvent()

// EXTRACT
const allEventDates = useMemo(() => {
  return allEvents.flatMap((event: any) =>
    event.event_dates.map((date: any) => ({
      diveSchool: event.dive_school,           // ID
      diveSchoolName: event.dive_school_name,  // Name
    }))
  )
}, [allEvents])

// PASS
const payload = {
  div_school: selectedEvent?.diveSchool?.toString() || "",
}
onEventSelect(payload)
```

### SchoolBookingInfo (Receives school from props)
```typescript
// RECEIVE
interface Props {
  schoolBookingData?: {
    div_school: string;  // School name/ID
  };
}

// DISPLAY
<div className="bg-blue-100">
  {bookingData.div_school || "—"}
</div>
```

### DiveSchoolLiabilityForm (Fetches all schools)
```typescript
// FETCH
const { data: diveSchoolsData, isLoading: isLoadingSchools } 
  = useFetchDiveSchools()

// MAP TO OPTIONS
<select {...register('dive_school_id')} disabled={isLoadingSchools}>
  <option value="">Select a dive school</option>
  {diveSchoolsData?.pages?.[0]?.results?.map((school: any) => (
    <option key={school.id} value={school.id}>
      {school.name}
    </option>
  ))}
</select>

// SUBMIT
const payload = {
  dive_school_id: parseInt(data.dive_school_id),
  // ... other fields
}
```

## Data Flow Comparison

| Step | DiveEventCalendar | SchoolBookingInfo | DiveSchoolLiabilityForm |
|------|------------------|------------------|------------------------|
| 1. Fetch | `useFetchDiveEvent()` | None (props) | `useFetchDiveSchools()` |
| 2. Extract | From event object | From props | From API results |
| 3. Transform | Extract school ID | Pass through | Map to options |
| 4. Display | Pass in payload | Read-only div | Dropdown select |
| 5. Use | Calendar selection | Info display | Form submission |

## API Response Structures

### useFetchDiveEvent() Response
```typescript
{
  data: [{
    id: 1,
    dive_school: 5,              // ← School ID
    dive_school_name: "Ocean Academy",  // ← School Name
    event_dates: [{id, event_date, ...}],
    dive_instructors: [{id, name}],
    dive_site_name: "Blue Reef"
  }]
}
```

### useFetchDiveSchools() Response
```typescript
{
  pages: [{
    results: [{
      id: 5,
      name: "Ocean Academy",
      address: "123 Beach St",
      dive_instructors: [{...}],
      photos: [{...}]
    }]
  }]
}
```

## Key Differences

1. **DiveEventCalendar**: Gets school from event, extracts ID
2. **SchoolBookingInfo**: Receives school name as string, displays only
3. **DiveSchoolLiabilityForm**: Fetches all schools, user selects one

## When to Use Each

- **Pattern 1** (DiveEventCalendar): When school is part of event data
- **Pattern 2** (SchoolBookingInfo): When displaying selected school
- **Pattern 3** (DiveSchoolLiabilityForm): When user needs to select school

