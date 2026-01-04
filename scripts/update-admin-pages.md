# Admin Pages Update Checklist

For each admin page (vehicles, blog, stories, places):
1. Add imports: ImageUpload, generateId, generateSlug
2. Remove ID input fields, show ID only when editing
3. Replace Image URL inputs with ImageUpload component
4. Auto-generate IDs in handleSubmit
5. Fix Edit button: border-primary text-primary hover:bg-primary hover:text-white
6. Fix Delete button: bg-red-600 text-white hover:bg-red-700 border-0

