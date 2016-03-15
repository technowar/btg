Feature: Home Page
  As a fucking user
  I want to be able to browse BTG's home page
  So that I can do shit.

Scenario: User visits the home page
  Given I visit "/" page
  Then it should have a page title "Buanga This Guy!"
  And it should have a title "I am back, bitches!" in a body
  And should see some "Buanga This Guy"
  And some "Copyright © 2016, Buanga This Guy. All rights reserved."
