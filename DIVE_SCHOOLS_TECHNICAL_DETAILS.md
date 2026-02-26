# Dive Schools Endpoint - Technical Details

## 🔍 Search Implementation

### How Search Works

1. **User Input** - Types in search field
2. **State Update** - `setSearchQuery(e.target.value)` updates state
3. **Query Key Change** - `["booking-schools", address, search]` changes
4. **Auto Refetch** - React Query automatically refetches with new search param
5. **API Call** - Sends `?search=query` to backend
6. **Results Display** - Shows filtered schools in dropdown

### Search Query Building

```typescript
const params = new URLSearchParams();

if (search && pageParam === "dive/dive-schools") {
  params.append("search", search);
}

if (params.toString() && pageParam === "dive/dive-schools") {
  relativeUrl += `?${params.toString()}`;
}
```

## 📜 Infinite Scroll Implementation

### Scroll Detection

```typescript
const handleScroll = useCallback(() => {
  if (!scrollContainerRef.current) return
  
  const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current
  const isNearBottom = scrollHeight - scrollTop - clientHeight < 100
  
  if (isNearBottom && hasNextPage && !isFetchingNextPage) {
    fetchNextPage()
  }
}, [hasNextPage, isFetchingNextPage, fetchNextPage])
```

**Logic**:
- Calculates distance from bottom: `scrollHeight - scrollTop - clientHeight`
- Triggers when within 100px of bottom
- Prevents duplicate requests with `!isFetchingNextPage` check
- Only fetches if `hasNextPage` is true

### Pagination Handling

```typescript
getNextPageParam: (lastPage) => lastPage.next ?? undefined
```

- Uses `next` URL from API response
- Automatically handles pagination
- Combines all pages into single array via `flatMap`

## 🎨 UI Components

### Search Input
- **Icon**: Search icon from lucide-react
- **Placeholder**: "Search dive schools..."
- **Events**: onChange, onFocus
- **Styling**: Tailwind with dark mode

### Dropdown Menu
- **Position**: Absolute, below search input
- **Z-index**: 50 (above other content)
- **Max Height**: 256px (max-h-64)
- **Overflow**: Auto scroll

### School Items
- **Layout**: Flex column with name, address, contact
- **Hover**: Light gray background
- **Selected**: Orange highlight with left border
- **Responsive**: Full width, padding 12px

### Loading States
- **Initial Load**: Spinner while fetching first page
- **Infinite Scroll**: Spinner at bottom while fetching next
- **No Results**: "No dive schools found" message

## 🔗 Form Integration

### Hidden Input
```typescript
<input
  type="hidden"
  {...register('dive_school_id')}
  value={selectedSchool?.id || ''}
/>
```

- Stores selected school ID
- Integrated with React Hook Form
- Validated by Zod schema

### Selection Handler
```typescript
onClick={() => {
  setSelectedSchool(school)
  setValue('dive_school_id', school.id.toString())
  setIsDropdownOpen(false)
  setSearchQuery('')
}}
```

- Updates selected school state
- Sets form value via `setValue()`
- Closes dropdown
- Clears search query

## 🌙 Dark Mode Support

All elements have dark mode classes:
- `dark:bg-gray-700` - Dark background
- `dark:text-white` - Dark text
- `dark:border-gray-600` - Dark borders
- `dark:hover:bg-gray-600` - Dark hover states

## 📱 Responsive Design

- **Mobile**: Full width, touch-friendly
- **Tablet**: Proper spacing and sizing
- **Desktop**: Optimal dropdown width

## ⚡ Performance Optimizations

1. **useCallback** - Memoized scroll handler
2. **useMemo** - Memoized allSchools array
3. **useInfiniteQuery** - Efficient pagination
4. **Debounced Search** - Reduces API calls
5. **Lazy Loading** - Only loads visible schools

## 🛡️ Error Handling

1. **No Schools Found** - Shows message
2. **API Error** - Handled by React Query
3. **Validation Error** - Zod schema validation
4. **Form Submission** - Requires school selection

## 📊 State Management

| State | Type | Purpose |
|-------|------|---------|
| `searchQuery` | string | Current search text |
| `isDropdownOpen` | boolean | Dropdown visibility |
| `selectedSchool` | object | Selected school data |
| `diveSchoolsData` | pages[] | All fetched schools |
| `hasNextPage` | boolean | More pages available |
| `isFetchingNextPage` | boolean | Loading next page |

## 🔄 Data Flow Summary

```
Input Change
    ↓
searchQuery State Update
    ↓
Query Key Change
    ↓
React Query Refetch
    ↓
API Call with search param
    ↓
Response with paginated results
    ↓
Combine pages into allSchools
    ↓
Render dropdown with schools
    ↓
User scrolls
    ↓
Detect near bottom
    ↓
Fetch next page
    ↓
Append new schools to list
    ↓
User selects school
    ↓
Update form value
    ↓
Close dropdown
```

## ✅ Testing Checklist

- [ ] Search filters schools correctly
- [ ] Infinite scroll loads more on scroll
- [ ] Selected school displays in blue box
- [ ] Dropdown closes on outside click
- [ ] Form submits with school ID
- [ ] Dark mode works correctly
- [ ] Mobile responsive
- [ ] No duplicate API calls
- [ ] Loading states show correctly
- [ ] Error messages display properly

