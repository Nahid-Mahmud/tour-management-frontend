# Making a Reusable DataTable Component in React

## What Was Done

1. **Extracted Table Logic**: The table rendering and pagination logic were moved from the `AddTourType` page into a new, reusable `DataTable` component (`src/components/ui/DataTable.tsx`).
2. **Generic Columns**: The `DataTable` accepts a `columns` prop, which is an array of objects describing each column (header, how to render the cell, and optional className).
3. **Pagination Inside DataTable**: The `DataTable` manages its own pagination state (current page, items per page, navigation) and slices the data accordingly. The parent only passes the full data array.
4. **Usage in AddTourType**: The `AddTourType` page now just passes the columns and data to `DataTable`, making the table logic reusable for any data set.

## What is `accessor`?

- The `accessor` is a function defined for each column in the `columns` array.
- It receives two arguments: the current row's data and the row's index (relative to the full data array).
- It returns the React node (JSX) to render in that cell.
- This allows you to customize what is displayed in each cell, including formatting, custom components, or action buttons.

**Example:**

```js
{
  header: "Name",
  accessor: (row) => row.name,
}
```

**For an action column:**

```js
{
  header: "Action",
  accessor: (row) => <button onClick={...}>Edit</button>,
}
```

## Benefits

- **Reusability**: You can use `DataTable` for any data set by just changing the columns and data props.
- **Separation of Concerns**: The parent component doesn't need to handle pagination or table rendering logic.
- **Flexibility**: The `accessor` function allows for custom rendering in any cell.

---

Feel free to use and extend this pattern for other tables in your project!
