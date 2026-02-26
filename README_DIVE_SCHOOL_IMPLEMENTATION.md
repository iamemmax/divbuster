# Dive School Implementation - Complete Reference

## 📋 Quick Summary

Your project implements dive schools in **3 distinct patterns**:

| Pattern | Component | Hook | Purpose |
|---------|-----------|------|---------|
| **Extract** | DiveEventCalendar | `useFetchDiveEvent()` | Get school from event |
| **Display** | SchoolBookingInfo | None | Show selected school |
| **Select** | DiveSchoolLiabilityForm | `useFetchDiveSchools()` | User picks school |

## 🔍 Where to Find Each Implementation

### Pattern 1: Extract School from Event
**File**: `src/app/(main)/(dashboard)/manage-certifications/components/DiveEventCalendar.tsx`
- **Lines 24**: Fetch events
- **Lines 37-38**: Extract `dive_school` (ID) and `dive_school_name` (name)
- **Line 132**: Pass `div_school` in payload

### Pattern 2: Display Selected School
**File**: `src/app/(main)/(dashboard)/bookings/components/modals/school-booking/SchoolBookingInfo.tsx`
- **Lines 10-17**: Props interface with `div_school`
- **Lines 37-43**: Read-only display of school

### Pattern 3: Fetch and Select School
**File**: `src/app/(main)/(dashboard)/insurance/components/DiveSchoolLiabilityForm.tsx`
- **Line 43**: Fetch all schools
- **Lines 149-160**: Dropdown with school options
- **Line 87**: Submit with `dive_school_id`

## 🔗 Data Flow

```
API: /dive/dive-event
    ↓
useFetchDiveEvent()
    ↓
DiveEventCalendar (extract school)
    ↓
CreateSchoolPlan (handle selection)
    ↓
SchoolBookingInfo (display school)
    ↓
SchoolParticipant (submit booking)

API: /dive/dive-schools
    ↓
useFetchDiveSchools()
    ↓
DiveSchoolLiabilityForm (dropdown)
    ↓
submitDiveSchoolLiabilityForm (submit)
```

## 📚 Documentation Files Created

1. **DIVE_SCHOOL_DATA_FLOW.md** - Overview of data flow
2. **DIVE_SCHOOL_IMPLEMENTATION_GUIDE.md** - How each component works
3. **DIVE_SCHOOL_CODE_PATTERNS.md** - Code patterns reference
4. **DIVE_SCHOOL_CURRENT_IMPLEMENTATION.md** - Current code snippets
5. **DIVE_SCHOOL_SIDE_BY_SIDE_COMPARISON.md** - Side-by-side comparison
6. **DIVE_SCHOOL_FILE_LOCATIONS.md** - File paths and line numbers
7. **COMPLETE_DIVE_SCHOOL_GUIDE.md** - Comprehensive guide
8. **README_DIVE_SCHOOL_IMPLEMENTATION.md** - This file

## ✅ Current Status

- ✅ DiveEventCalendar properly extracts school from events
- ✅ SchoolBookingInfo displays school as read-only
- ✅ DiveSchoolLiabilityForm fetches and displays schools in dropdown
- ✅ All components work together seamlessly

## 🎯 Key Takeaways

1. **Events contain school data** - Use `useFetchDiveEvent()`
2. **Schools are fetched separately** - Use `useFetchDiveSchools()`
3. **Three different use cases** - Extract, Display, Select
4. **Data flows through components** - Calendar → Booking → Liability
5. **All patterns are correct** - Each serves its purpose

## 📖 How to Use This Guide

- **Quick lookup**: Check the table at the top
- **Find code**: See "Where to Find Each Implementation"
- **Understand flow**: Follow the "Data Flow" diagram
- **Deep dive**: Read the detailed documentation files
- **See examples**: Check DIVE_SCHOOL_CODE_PATTERNS.md

---

**Last Updated**: 2026-02-26  
**Status**: Complete and Documented ✅

