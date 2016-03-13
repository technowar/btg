Feature: Home Page
  As a Admin user
  I should have authentication to be able to
  browse BTG's admin page. So that I can do
  answer those questions in the list.

Scenario: User visits the admin page
  Given I visit "/admin" page
  Then it should have a page title "Admin - Buanga This Guy!"
  And it should have a title "Manage Everything" in a body
  And some "Copyright © 2016, Buanga This Guy. All rights reserved."
