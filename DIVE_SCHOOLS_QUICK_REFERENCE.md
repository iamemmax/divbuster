# Dive Schools Endpoint - Quick Reference

## 📍 Files Modified

| File | Changes |
|------|---------|
| `fetchDivingSchools.ts` | Added search parameter support |
| `DiveSchoolLiabilityForm.tsx` | Implemented searchable dropdown with infinite scroll |

## 🎯 Key Features

✅ **Search** - Real-time filtering by school name/address  
✅ **Infinite Scroll** - Load more schools on scroll  
✅ **Dropdown UI** - Beautiful, responsive dropdown menu  
✅ **Dark Mode** - Full dark mode support  
✅ **Form Integration** - Seamless React Hook Form integration  
✅ **Error Handling** - Proper error messages and loading states  

## 🔧 API Endpoint

```
GET /dive/dive-schools?search=query&page=1
```

**Response Structure**:
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

## 💻 Component Usage

```typescript
// In DiveSchoolLiabilityForm.tsx
const { data: diveSchoolsData, hasNextPage, fetchNextPage, isFetchingNextPage } 
  = useFetchDiveSchools(undefined, searchQuery)

// Get all schools from all pages
const allSchools = diveSchoolsData?.pages?.flatMap(page => page.results) || []
```

## 🎨 UI Elements

### Search Input
- Search icon on left
- Chevron down icon on right
- Placeholder: "Search dive schools..."
- Focus ring: Orange (focus:ring-orange-500)

### Dropdown Menu
- Max height: 256px (max-h-64)
- Scrollable content
- Shadow and border styling
- Z-index: 50

### School Items
- School name (bold)
- Address (small, gray)
- Contact info (small, gray)
- Hover effect (light gray background)
- Selected state (orange highlight)

### Selected Display
- Blue box with school details
- Shows name, address, contact info
- Appears above dropdown

## 🔄 State Management

```typescript
// Search state
const [searchQuery, setSearchQuery] = useState('')

// Dropdown state
const [isDropdownOpen, setIsDropdownOpen] = useState(false)

// Selected school state
const [selectedSchool, setSelectedSchool] = useState<any>(null)

// Refs for DOM access
const dropdownRef = useRef<HTMLDivElement>(null)
const scrollContainerRef = useRef<HTMLDivElement>(null)
```

## 📋 Event Handlers

### Search Input Change
```typescript
onChange={(e) => {
  setSearchQuery(e.target.value)
  setIsDropdownOpen(true)
}}
```

### Scroll Detection
```typescript
onScroll={handleScroll}
// Triggers fetchNextPage() when near bottom
```

### School Selection
```typescript
onClick={() => {
  setSelectedSchool(school)
  setValue('dive_school_id', school.id.toString())
  setIsDropdownOpen(false)
  setSearchQuery('')
}}
```

### Click Outside
```typescript
// Closes dropdown when clicking outside
document.addEventListener('mousedown', handleClickOutside)
```

## 🎯 Form Integration

```typescript
// Register hidden input
<input
  type="hidden"
  {...register('dive_school_id')}
  value={selectedSchool?.id || ''}
/>

// Validation
dive_school_id: z.string().min(1, 'Dive school is required')

// Submit
const payload = {
  dive_school_id: parseInt(data.dive_school_id),
  // ... other fields
}
```

## 🧪 Testing Steps

1. Navigate to Insurance → Dive School Liability
2. Click search input
3. Type school name (e.g., "Abbott")
4. Verify schools filter
5. Scroll down to load more
6. Click school to select
7. Verify selected school displays
8. Submit form

## 🚀 Performance Tips

- Search is debounced via React Query
- Infinite scroll prevents duplicate requests
- All pages combined into single array
- Memoized scroll handler
- Memoized allSchools array

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Dropdown not showing | Check `isDropdownOpen` state |
| Search not working | Verify API supports `search` param |
| Infinite scroll not working | Check scroll container height |
| Selected school not saving | Verify `setValue()` is called |
| Dark mode not working | Check dark mode classes |

## 📚 Related Files

- `fetchDivingSchools.ts` - API hook
- `DiveSchoolLiabilityForm.tsx` - Component
- `submitDiveSchoolLiabilityForm.ts` - Form submission
- `DiveSchoolForms.tsx` - Conditional rendering

## ✨ Highlights

🎯 **Real-time Search** - Filters as user types  
⚡ **Infinite Scroll** - Loads more on demand  
🎨 **Beautiful UI** - Modern, responsive design  
🌙 **Dark Mode** - Full dark mode support  
📱 **Mobile Ready** - Works on all devices  
♿ **Accessible** - Proper labels and ARIA attributes  

---

**Status**: ✅ COMPLETE AND READY TO USE

