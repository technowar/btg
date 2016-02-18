Feature: Registration Page
  As a fucking user
  I want to be able to access BTG's registration page
  So that I can register myself.

Scenario: User wants to register
  Given I visit "/register" page
  Then it should have a title "Sign Up"
