# Dive School Implementation - File Locations & Line Numbers

## 1. DiveEventCalendar.tsx
**Path**: `src/app/(main)/(dashboard)/manage-certifications/components/DiveEventCalendar.tsx`

| What | Lines | Code |
|------|-------|------|
| Import hook | 5 | `import { useFetchDiveEvent }` |
| Fetch data | 24 | `const { data: diveEventData, isLoading } = useFetchDiveEvent()` |
| Extract school | 37-38 | `diveSchool: event.dive_school,` `diveSchoolName: event.dive_school_name,` |
| Create payload | 132 | `div_school: selectedEvent?.diveSchool?.toString() \|\| "",` |
| Trigger callback | 135 | `onEventSelect(payload)` |

## 2. SchoolBookingInfo.tsx
**Path**: `src/app/(main)/(dashboard)/bookings/components/modals/school-booking/SchoolBookingInfo.tsx`

| What | Lines | Code |
|------|-------|------|
| Props interface | 10-17 | `interface Props { div_school: string; }` |
| Receive data | 21 | `const { schoolBookingData } = props` |
| Display field | 37-43 | Read-only div showing `{bookingData.div_school}` |

## 3. DiveSchoolLiabilityForm.tsx
**Path**: `src/app/(main)/(dashboard)/insurance/components/DiveSchoolLiabilityForm.tsx`

| What | Lines | Code |
|------|-------|------|
| Import hook | 19 | `import { useFetchDiveSchools }` |
| Fetch data | 43 | `const { data: diveSchoolsData, isLoading: isLoadingSchools } = useFetchDiveSchools()` |
| Dropdown | 149-160 | `<select>` with mapped options |
| Map schools | 155-159 | `{diveSchoolsData?.pages?.[0]?.results?.map(...)}` |
| Submit payload | 87 | `dive_school_id: parseInt(data.dive_school_id),` |

## 4. API Hooks
**Path**: `src/app/(main)/(dashboard)/api/bookings/`

### fetchDiveEvent.ts
- **Lines 36-39**: `fetchDiveEvent()` function
- **Lines 41-46**: `useFetchDiveEvent()` hook
- **Returns**: `DiveEventProp` with events containing `dive_school` & `dive_school_name`

### fetchDivingSchools.ts
- **Lines 36-47**: `fetchDiveSchools()` function
- **Lines 50-58**: `useFetchDiveSchools()` hook
- **Returns**: `divingSchoolsProp` with paginated results

## 5. CreateSchoolPlan.tsx
**Path**: `src/app/(main)/(dashboard)/bookings/components/modals/school-booking/CreateSchoolPlan.tsx`

| What | Lines | Code |
|------|-------|------|
| Import calendar | 13 | `import { DiveEventCalendar }` |
| Handle selection | 68-73 | `handleEventSelect()` function |
| Pass to SchoolBookingInfo | 123-128 | `<SchoolBookingInfo schoolBookingData={schoolBookingDataInfo} />` |

## Data Flow Through Files

```
fetchDiveEvent.ts (API)
    ↓
DiveEventCalendar.tsx (lines 24-137)
    ↓
CreateSchoolPlan.tsx (lines 68-73)
    ↓
SchoolBookingInfo.tsx (lines 21-43)
    ↓
SchoolParticipant.tsx (submission)

fetchDivingSchools.ts (API)
    ↓
DiveSchoolLiabilityForm.tsx (lines 43, 149-160)
    ↓
submitDiveSchoolLiabilityForm.ts (submission)
```

## Quick Navigation

- **To see how schools are fetched**: `fetchDiveEvent.ts` & `fetchDivingSchools.ts`
- **To see how schools are extracted**: `DiveEventCalendar.tsx` lines 37-38
- **To see how schools are displayed**: `SchoolBookingInfo.tsx` lines 37-43
- **To see how schools are selected**: `DiveSchoolLiabilityForm.tsx` lines 149-160
- **To see the complete flow**: `CreateSchoolPlan.tsx` lines 68-128

