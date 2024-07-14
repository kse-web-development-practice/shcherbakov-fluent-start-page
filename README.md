# Fluent Start Page

## Background

I want to create an application for storing bookmarks that will look like the start menu from Windows 10. Windows 10 uses Microsoft’s Fluent Design, so this is where the name of this project comes from - Fluent Start Page.

On desktop, the application should be available as a browser extension to make it easy to install.

## Technical requirements

1. Work as a browser extension for popular desktop browsers
2. Host the app on the domain to make it available on mobile devices (because browser extensions on mobile can’t change the new tab page)
3. Be able to import, export, and locally store user’s bookmarks and settings

## Stories

### Story1

As a browser user, I want to add bookmarks and organize them in groups so I can be more productive by quickly accessing the websites I need.

### Story2

As a browser user, I want to edit my bookmarks so I can change my new tab page according to my new preferences.

### Story3

As a browser user, I want to delete my bookmarks so I can free the space on my new tab page from the bookmarks I don’t visit anymore.

### Story4

As a browser user, I want to be able to export and import my new tab page’s bookmarks to easily move to another browser or share my configuration with someone.

### Story5

As a browser user, I want to customize the appearance and functions of the new tab page to make it look better.

## UI

See [draw.io](https://drive.google.com/file/d/10v3QcEAvQOjWphO6h3XzgWVWlb_bbT1j/view?usp=sharing)

## Plan of attack

- [x] Setup the project
- [x] Create a Windows 10 start menu-like grid system
- [x] Create a Bookmark Item component
- [x] Create a Bookmark Group component
- [ ] Implement drag and drop system for Bookmark Item and Bookmark Group components
- [x] Create an Add Bookmark Form
- [ ] Create an Edit Bookmark Form
- [ ] Create Settings Form
- [x] Implement saving and loading data
- [ ] Implement support of light and dark color themes, including detecting the system’s color theme
- [ ] Implement importing and exporting existing configurations (JSON files)
