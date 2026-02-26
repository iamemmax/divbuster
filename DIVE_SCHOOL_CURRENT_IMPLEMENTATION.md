# Current Dive School Implementation in Your Project

## 1. DiveEventCalendar.tsx
**File**: `src/app/(main)/(dashboard)/manage-certifications/components/DiveEventCalendar.tsx`

**Lines 24-46**: Fetches and extracts school data
```typescript
const { data: diveEventData, isLoading } = useFetchDiveEvent()

const allEventDates = useMemo(() => {
  return allEvents.flatMap((event: any) =>
    event.event_dates.map((date: any) => ({
      ...date,
      eventId: event.id,
      diveSchool: event.dive_school,           // ← School ID
      diveSchoolName: event.dive_school_name,  // ← School Name
      diveInstructors: event.dive_instructors,
      diveSiteName: event.dive_site_name,
    }))
  )
}, [allEvents])
```

**Lines 125-137**: Passes school data in payload
```typescript
const payload = {
  dive_level: "beginner",
  instructor_id: selectedInstructor,
  event_date_id: selectedEvent?.id?.toString() || "",
  dive_event_id: selectedEvent?.eventId?.toString() || "",
  div_school: selectedEvent?.diveSchool?.toString() || "",  // ← School ID
  location: selectedEvent?.diveSiteName?.toString() || "",
}
onEventSelect(payload)
```

## 2. SchoolBookingInfo.tsx
**File**: `src/app/(main)/(dashboard)/bookings/components/modals/school-booking/SchoolBookingInfo.tsx`

**Lines 10-17**: Props interface
```typescript
interface Props {
  schoolBookingData?: {
    dive_level: string;
    instructor_id: string;
    event_date_id: string;
    dive_event_id: string;
    div_school: string;      // ← Receives school as string
    location: string;
  };
}
```

**Lines 37-43**: Display as read-only
```typescript
<div>
  <label>Dive School</label>
  <div className="bg-blue-100 dark:bg-blue-900/40">
    {bookingData.div_school || "—"}  // ← Displays school name
  </div>
</div>
```

## 3. DiveSchoolLiabilityForm.tsx
**File**: `src/app/(main)/(dashboard)/insurance/components/DiveSchoolLiabilityForm.tsx`

**Line 43**: Fetches all dive schools
```typescript
const { data: diveSchoolsData, isLoading: isLoadingSchools } = useFetchDiveSchools()
```

**Lines 149-160**: Dropdown with dynamic options
```typescript
<select {...register('dive_school_id')} disabled={isLoadingSchools}>
  <option value="">Select a dive school</option>
  {diveSchoolsData?.pages?.[0]?.results?.map((school: any) => (
    <option key={school.id} value={school.id}>
      {school.name}
    </option>
  ))}
</select>
```

## Summary Table

| Component | Hook | Data Source | Display Type |
|-----------|------|-------------|--------------|
| DiveEventCalendar | `useFetchDiveEvent()` | Event object | Extracted |
| SchoolBookingInfo | None | Props | Read-only |
| DiveSchoolLiabilityForm | `useFetchDiveSchools()` | API | Dropdown |

## Key Takeaways

1. **DiveEventCalendar** gets school from dive events API
2. **SchoolBookingInfo** receives school name as string from calendar
3. **DiveSchoolLiabilityForm** fetches all schools for user selection
4. All three approaches work together seamlessly
5. School data flows: Event → Calendar → SchoolBookingInfo → Participant Form

