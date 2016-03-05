Feature: Home Page
  As a fucking user
  I want to be able to browse BTG's home page
  So that I can do shit.

Scenario: User visits the home page
  Given I visit "/" page
  Then it should have a title "Buanga This Guy!"
  And should see some "BTG"
  And some "Copyright © 2016, Buanga This Guy. All rights reserved."
